package de.sambalmueslie.openbooking.frontend.user


import de.sambalmueslie.openbooking.backend.info.api.DateRangeSelectionRequest
import de.sambalmueslie.openbooking.frontend.user.api.CreateBookingRequest
import de.sambalmueslie.openbooking.frontend.user.api.OfferInfoSelectRequest
import de.sambalmueslie.openbooking.frontend.user.logic.DayInfoService
import io.micronaut.http.annotation.*
import io.micronaut.security.annotation.Secured
import io.micronaut.security.rules.SecurityRule
import java.time.LocalDate

@Controller("/api/frontend/user")
@Secured(SecurityRule.IS_ANONYMOUS)
class UserController(private val service: DayInfoService) {

    @Get("/day/info")
    fun getDefaultDayInfo() = service.getDefaultDayInfo()

    @Post("/day/info")
    fun selectDayInfo(@Body request: DateRangeSelectionRequest) = service.selectDayInfo(request)

    @Get("/day/info/{date}")
    fun getDayInfo(@PathVariable date: LocalDate) = service.getDayInfo(date)

    @Post("/offer/info")
    fun getOfferInfo(@Body request: OfferInfoSelectRequest) = service.getOfferInfo(request)

    @Post("/booking")
    fun createBooking(@Body request: CreateBookingRequest) = service.createBooking(request)

}
