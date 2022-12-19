package de.sambalmueslie.openbooking.frontend.user


import de.sambalmueslie.openbooking.frontend.user.api.DayInfo
import de.sambalmueslie.openbooking.frontend.user.logic.DayInfoService
import io.micronaut.http.annotation.Controller
import io.micronaut.http.annotation.Get
import io.micronaut.security.annotation.Secured
import io.micronaut.security.rules.SecurityRule
import java.time.LocalDate

@Controller("/api/frontend/user")
@Secured(SecurityRule.IS_ANONYMOUS)
class UserController(private val service: DayInfoService) {

    @Get("/day/info")
    fun getDefaultDayInfo() = service.getDefaultDayInfo()


    fun getDayInfo(date: LocalDate, amount: Int) = service.getDayInfo(date, amount)


}
