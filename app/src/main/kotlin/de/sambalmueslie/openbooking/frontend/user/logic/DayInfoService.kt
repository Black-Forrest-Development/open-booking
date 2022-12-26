package de.sambalmueslie.openbooking.frontend.user.logic


import de.sambalmueslie.openbooking.backend.booking.BookingService
import de.sambalmueslie.openbooking.backend.booking.api.Booking
import de.sambalmueslie.openbooking.backend.booking.api.BookingStatus
import de.sambalmueslie.openbooking.backend.group.VisitorGroupService
import de.sambalmueslie.openbooking.backend.group.api.VisitorGroup
import de.sambalmueslie.openbooking.backend.offer.OfferService
import de.sambalmueslie.openbooking.backend.offer.api.Offer
import de.sambalmueslie.openbooking.frontend.user.api.*
import jakarta.inject.Singleton
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import java.time.LocalDate
import java.time.temporal.ChronoUnit

@Singleton
class DayInfoService(
    private val offerService: OfferService, private val bookingService: BookingService, private val visitorGroupService: VisitorGroupService
) {
    companion object {
        private val logger: Logger = LoggerFactory.getLogger(DayInfoService::class.java)
        private const val DEFAULT_DAY_INFO_AMOUNT = 99
    }

    fun getDefaultDayInfo(): List<DayInfo> {
        val first = offerService.getFirstOffer(LocalDate.now()) ?: return emptyList()
        return getDayInfo(first.start.toLocalDate(), DEFAULT_DAY_INFO_AMOUNT)
    }

    fun selectDayInfo(request: DayInfoSelectRequest): List<DayInfo> {
        val firstOffer = offerService.getFirstOffer(LocalDate.now()) ?: return emptyList()
        val lastOffer = offerService.getLastOffer(LocalDate.now()) ?: return emptyList()
        val from = if (firstOffer.start.toLocalDate().isAfter(request.from)) firstOffer.start.toLocalDate() else request.from
        val to = if (lastOffer.end.toLocalDate().isBefore(request.to)) lastOffer.end.toLocalDate() else request.to

        val days = ChronoUnit.DAYS.between(from, to)
        return getDayInfo(from, days.toInt())
    }

    private fun getDayInfo(date: LocalDate, amount: Int): List<DayInfo> {
        return (0 .. amount).mapNotNull { getDayInfo(date.plusDays(it.toLong())) }
    }


    private fun getDayInfo(date: LocalDate): DayInfo? {
        val offer = offerService.getOffer(date).filter { it.active }
        if (offer.isEmpty()) return null

        val first = offer.first()
        val last = offer.last()
        val bookings = bookingService.getBookings(offer)
        val visitorGroups = visitorGroupService.get(bookings).associateBy { it.id }

        val bookingByOffer = bookings.groupBy { it.offerId }

        val amountOfOfferTotal = offer.size
        val amountOfOfferAvailable = offer.filter { isAvailable(it, bookingByOffer[it.id] ?: emptyList(), visitorGroups) }.size
        val amountOfOfferBooked = amountOfOfferTotal - amountOfOfferAvailable


        val bookingByStatus = bookings.groupBy { it.status }
            .mapValues { it.value.sumOf { b -> visitorGroups[b.visitorGroupId]?.size ?: 0 } }

        val amountOfSpaceTotal = offer.sumOf { it.maxPersons }
        val amountOfSpaceBooked = bookingByStatus[BookingStatus.CONFIRMED] ?: 0
        val amountOfSpaceAvailable = amountOfSpaceTotal - amountOfSpaceBooked

        return DayInfo(date, first.start, last.end, amountOfOfferTotal, amountOfOfferAvailable, amountOfOfferBooked, amountOfSpaceTotal, amountOfSpaceAvailable, amountOfSpaceBooked)
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
                        OfferInfo(o.id, o.start, o.end, o.maxPersons, amountOfSpaceBooked, o.maxPersons - amountOfSpaceBooked)
                    }
                }
        }
        return OfferInfoSelectResult(offers.map { OfferInfoSelectResultEntry(it.key, it.value) })
    }


}
