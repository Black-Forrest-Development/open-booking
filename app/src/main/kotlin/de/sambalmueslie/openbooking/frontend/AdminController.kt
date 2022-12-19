package de.sambalmueslie.openbooking.frontend


import io.micronaut.http.annotation.Controller
import org.slf4j.Logger
import org.slf4j.LoggerFactory

@Controller("/api/frontend/user")
class AdminController {

    companion object {
        private val logger: Logger = LoggerFactory.getLogger(AdminController::class.java)
    }


}
