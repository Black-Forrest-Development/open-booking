package de.sambalmueslie.openbooking.frontend.user.logic


import de.sambalmueslie.openbooking.backend.info.InfoService
import de.sambalmueslie.openbooking.backend.info.api.DateRangeSelectionRequest
import de.sambalmueslie.openbooking.backend.info.api.DayInfo
import de.sambalmueslie.openbooking.backend.offer.OfferService
import de.sambalmueslie.openbooking.backend.request.BookingRequestService
import de.sambalmueslie.openbooking.backend.request.api.BookingRequest
import de.sambalmueslie.openbooking.backend.request.api.BookingRequestChangeRequest
import de.sambalmueslie.openbooking.error.InvalidRequestException
import de.sambalmueslie.openbooking.frontend.user.api.CreateBookingRequest
import de.sambalmueslie.openbooking.frontend.user.api.OfferInfoSelectRequest
import de.sambalmueslie.openbooking.frontend.user.api.OfferInfoSelectResultEntry
import jakarta.inject.Singleton
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import java.time.LocalDate

@Singleton
class DayInfoService(
    private val offerService: OfferService,
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


    fun getOfferInfo(request: OfferInfoSelectRequest): List<OfferInfoSelectResultEntry> {
        val dayInfos = request.dates.associateWith { infoService.getDayInfo(it) }

        return dayInfos.mapNotNull { (date, info) ->
            if (info == null) {
                null
            } else {
                val offer = info.offer.filter { o -> o.amountOfSpaceAvailable >= request.groupSize }
                OfferInfoSelectResultEntry(date, offer)
            }
        }
    }

    fun createBooking(request: CreateBookingRequest): BookingRequest {
        if (!request.termsAndConditions) throw InvalidRequestException("You must accept the termns and conditions")
        return bookingRequestService.create(BookingRequestChangeRequest(request.visitorGroupChangeRequest, request.offerIds, request.comment))
    }


}
