package de.sambalmueslie.openbooking.frontend.user.logic


import de.sambalmueslie.openbooking.backend.booking.api.BookingStatus
import de.sambalmueslie.openbooking.backend.info.InfoService
import de.sambalmueslie.openbooking.backend.info.api.DateRangeSelectionRequest
import de.sambalmueslie.openbooking.backend.info.api.DayInfo
import de.sambalmueslie.openbooking.backend.info.api.DayInfoOffer
import de.sambalmueslie.openbooking.backend.offer.OfferService
import de.sambalmueslie.openbooking.backend.request.BookingRequestService
import de.sambalmueslie.openbooking.backend.request.api.BookingRequest
import de.sambalmueslie.openbooking.backend.request.api.BookingRequestChangeRequest
import de.sambalmueslie.openbooking.backend.response.ResponseService
import de.sambalmueslie.openbooking.backend.response.api.ResolveResponseRequest
import de.sambalmueslie.openbooking.backend.response.api.ResolvedResponse
import de.sambalmueslie.openbooking.backend.settings.SettingsService
import de.sambalmueslie.openbooking.backend.settings.api.SettingsAPI
import de.sambalmueslie.openbooking.error.InvalidRequestException
import de.sambalmueslie.openbooking.frontend.user.api.CreateBookingRequest
import de.sambalmueslie.openbooking.frontend.user.api.OfferInfoSelectRequest
import de.sambalmueslie.openbooking.frontend.user.api.OfferInfoSelectResultEntry
import jakarta.inject.Singleton
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import java.time.LocalDate

@Singleton
class UserService(
    private val offerService: OfferService,
    private val bookingRequestService: BookingRequestService,
    private val infoService: InfoService,
    private val responseService: ResponseService,
    private val settingsService: SettingsService
) {
    companion object {
        private val logger: Logger = LoggerFactory.getLogger(UserService::class.java)
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
                val offer = info.offer.filter { isSpaceAvailable(it, request) }
                OfferInfoSelectResultEntry(date, offer)
            }
        }
    }

    private fun isSpaceAvailable(offer: DayInfoOffer, request: OfferInfoSelectRequest): Boolean {
        val confirmedSpace = offer.space[BookingStatus.CONFIRMED] ?: 0
        val totalSpace = offer.offer.maxPersons
        val availableSpace = totalSpace - confirmedSpace
        return availableSpace >= request.groupSize
    }

    fun createBooking(request: CreateBookingRequest): BookingRequest {
        if (!request.termsAndConditions) throw InvalidRequestException("You must accept the terms and conditions")
        return bookingRequestService.create(BookingRequestChangeRequest(request.visitorGroupChangeRequest, request.offerIds, request.comment))
    }

    fun getOffer(offerId: Long): DayInfoOffer? {
        val offer = offerService.get(offerId) ?: return null
        val date = offer.start.toLocalDate()
        val dayInfo = infoService.getDayInfo(date) ?: return null

        return dayInfo.offer.find { it.offer.id == offer.id }
    }


    fun resolveResponse(request: ResolveResponseRequest): ResolvedResponse? {
        return responseService.resolve(request)
    }

    fun getHelpUrl(): String {
        return settingsService.get(SettingsAPI.SETTINGS_URL_HELP)?.value as? String ?: ""
    }

    fun getTermsAndConditionsUrl(): String {
        return settingsService.get(SettingsAPI.SETTINGS_URL_TERMS_AND_CONDITIONS)?.value as? String ?: ""
    }

}
