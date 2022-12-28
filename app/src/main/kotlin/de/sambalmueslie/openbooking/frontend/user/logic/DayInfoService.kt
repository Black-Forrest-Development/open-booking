package de.sambalmueslie.openbooking.frontend.user.logic


import de.sambalmueslie.openbooking.backend.booking.BookingService
import de.sambalmueslie.openbooking.backend.booking.api.Booking
import de.sambalmueslie.openbooking.backend.booking.api.BookingStatus
import de.sambalmueslie.openbooking.backend.group.VisitorGroupService
import de.sambalmueslie.openbooking.backend.group.api.VisitorGroup
import de.sambalmueslie.openbooking.backend.info.InfoService
import de.sambalmueslie.openbooking.backend.info.api.DateRangeSelectionRequest
import de.sambalmueslie.openbooking.backend.info.api.DayInfo
import de.sambalmueslie.openbooking.backend.offer.OfferService
import de.sambalmueslie.openbooking.backend.offer.api.Offer
import de.sambalmueslie.openbooking.backend.request.BookingRequestService
import de.sambalmueslie.openbooking.backend.request.api.BookingRequest
import de.sambalmueslie.openbooking.backend.request.api.BookingRequestChangeRequest
import de.sambalmueslie.openbooking.error.InvalidRequestException
import de.sambalmueslie.openbooking.frontend.user.api.*
import jakarta.inject.Singleton
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import java.time.LocalDate
import java.time.temporal.ChronoUnit

@Singleton
class DayInfoService(
    private val offerService: OfferService,
    private val bookingService: BookingService,
    private val visitorGroupService: VisitorGroupService,
    private val bookingRequestService: BookingRequestService,
    private val infoService: InfoService
) {
    companion object {
        private val logger: Logger = LoggerFactory.getLogger(DayInfoService::class.java)
        private const val DEFAULT_DAY_INFO_AMOUNT = 99L
    }

    fun getDefaultDayInfo(): List<DayInfo> {
        val first = offerService.getFirstOffer(LocalDate.now()) ?: return emptyList()
        val from = first.start.toLocalDate()
        val to = from.plusDays(DEFAULT_DAY_INFO_AMOUNT)
        return infoService.getDayInfoRange(DateRangeSelectionRequest(from, to))
    }

    fun selectDayInfo(request: DateRangeSelectionRequest): List<DayInfo> {
        return infoService.getDayInfoRange(request)
    }

    fun getDayInfo(date: LocalDate): DayInfo? {
        return infoService.getDayInfo(date)
    }

    private fun isAvailable(offer: Offer, bookings: List<Booking>, visitorGroups: Map<Long, VisitorGroup>): Boolean {
        val confirmed = bookings.filter { it.status == BookingStatus.CONFIRMED }
        val visitors = confirmed.sumOf { visitorGroups[it.visitorGroupId]?.size ?: 0 }
        return visitors < offer.maxPersons
    }

    fun getOfferInfo(request: OfferInfoSelectRequest): OfferInfoSelectResult {
        val offerByDate = request.dates.associateWith { offerService.getOffer(it) }

        val offers = offerByDate.mapValues {
            val offer = it.value.filter { o -> o.active }
            val bookings = bookingService.getBookings(offer).groupBy { b -> b.offerId }

            offer.associateWith { o -> bookings[o.id] }
                .map { (o, b) ->
                    val confirmedBookings = b?.filter { it.status == BookingStatus.CONFIRMED } ?: emptyList()
                    if (confirmedBookings.isEmpty()) {
                        OfferInfo(o.id, o.start, o.end, o.maxPersons, o.maxPersons, 0)
                    } else {
                        val visitorGroups = visitorGroupService.get(confirmedBookings).associateBy { vg -> vg.id }
                        val amountOfSpaceBooked = confirmedBookings.sumOf { bk -> visitorGroups[bk.visitorGroupId]?.size ?: 0 }
                        OfferInfo(o.id, o.start, o.end, o.maxPersons, o.maxPersons - amountOfSpaceBooked, amountOfSpaceBooked)
                    }
                }.filter { o -> o.amountOfSpaceAvailable >= request.groupSize }
        }
        return OfferInfoSelectResult(offers.map { OfferInfoSelectResultEntry(it.key, it.value) })
    }

    fun createBooking(request: CreateBookingRequest): BookingRequest {
        if (!request.termsAndConditions) throw InvalidRequestException("You must accept the termns and conditions")
        return bookingRequestService.create(BookingRequestChangeRequest(request.visitorGroupChangeRequest, request.offerIds, request.comment))
    }


}
