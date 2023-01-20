package de.sambalmueslie.openbooking.backend.request


import de.sambalmueslie.openbooking.backend.request.api.BookingRequestAPI
import de.sambalmueslie.openbooking.backend.request.api.BookingRequestAPI.Companion.PERMISSION_READ
import de.sambalmueslie.openbooking.backend.request.api.BookingRequestAPI.Companion.PERMISSION_WRITE
import de.sambalmueslie.openbooking.backend.request.api.BookingRequestChangeRequest
import de.sambalmueslie.openbooking.common.checkPermission
import io.micronaut.data.model.Pageable
import io.micronaut.http.annotation.*
import io.micronaut.security.annotation.Secured
import io.micronaut.security.authentication.Authentication
import io.micronaut.security.rules.SecurityRule
import io.swagger.v3.oas.annotations.tags.Tag

@Controller("/api/backend/request")
@Tag(name = "Booking Request API")
class BookingRequestController(private val service: BookingRequestService) : BookingRequestAPI {
    @Get()
    override fun getAll(auth: Authentication, pageable: Pageable) = auth.checkPermission(PERMISSION_READ) { service.getAll(pageable) }

    @Get("/{id}")
    override fun get(auth: Authentication, @PathVariable id: Long) = auth.checkPermission(PERMISSION_READ) { service.get(id) }

    @Post()
    override fun create(auth: Authentication, @Body request: BookingRequestChangeRequest) =
        auth.checkPermission(PERMISSION_WRITE) { service.create(request) }

    @Put("/{id}")
    override fun update(auth: Authentication, @PathVariable id: Long, @Body request: BookingRequestChangeRequest) =
        auth.checkPermission(PERMISSION_WRITE) { service.update(id, request) }

    @Delete("/{id}")
    override fun delete(auth: Authentication, @PathVariable id: Long) =
        auth.checkPermission(PERMISSION_WRITE) { service.delete(id) }

    @Get("/unconfirmed")
    override fun getUnconfirmed(auth: Authentication, pageable: Pageable) =
        auth.checkPermission(PERMISSION_READ) { service.getUnconfirmed(pageable) }

    @Get("/unconfirmed/info")
    override fun getInfoUnconfirmed(auth: Authentication, pageable: Pageable) =
        auth.checkPermission(PERMISSION_READ) { service.getInfoUnconfirmed(pageable) }

    @Put("/{id}/confirm/{bookingId}")
    override fun confirm(auth: Authentication, @PathVariable id: Long, @PathVariable bookingId: Long, @QueryValue(defaultValue = "false") silent: Boolean) =
        auth.checkPermission(PERMISSION_WRITE) { service.confirm(id, bookingId, silent) }

    @Put("/{id}/denial")
    override fun denial(auth: Authentication, @PathVariable id: Long, @QueryValue(defaultValue = "false") silent: Boolean) =
        auth.checkPermission(PERMISSION_WRITE) { service.denial(id, silent) }


    @Get("/confirm/{key}")
    @Secured(SecurityRule.IS_ANONYMOUS)
    fun confirm(@PathVariable key: String) = service.confirm(key)
}
