package de.sambalmueslie.openbooking.backend.text


import de.sambalmueslie.openbooking.backend.role.api.RoleAPI
import de.sambalmueslie.openbooking.backend.role.api.TourRoleChangeRequest
import de.sambalmueslie.openbooking.backend.text.api.TextAPI
import de.sambalmueslie.openbooking.backend.text.api.TextAPI.Companion.PERMISSION_TEXT_READ
import de.sambalmueslie.openbooking.backend.text.api.TextAPI.Companion.PERMISSION_TEXT_WRITE
import de.sambalmueslie.openbooking.backend.text.api.TextChangeRequest
import de.sambalmueslie.openbooking.common.checkPermission
import io.micronaut.data.model.Pageable
import io.micronaut.http.annotation.*
import io.micronaut.security.authentication.Authentication
import org.slf4j.Logger
import org.slf4j.LoggerFactory

@Controller("/api/backend/text")
class TextController(private val service: TextService) : TextAPI {

    @Get("/{id}")
    override fun get(auth: Authentication, @PathVariable id: Long) = auth.checkPermission(PERMISSION_TEXT_READ) {
        service.get(id)
    }

    @Get()
    override fun getAll(auth: Authentication, pageable: Pageable) = auth.checkPermission(PERMISSION_TEXT_READ) {
        service.getAll(pageable)
    }

    @Post()
    override fun create(auth: Authentication, @Body request: TextChangeRequest) = auth.checkPermission(PERMISSION_TEXT_READ) {
        service.create(request)
    }

    @Put("/{id}")
    override fun update(auth: Authentication, @PathVariable id: Long, @Body request: TextChangeRequest) = auth.checkPermission(PERMISSION_TEXT_WRITE) {
        service.update(id, request)
    }

    @Delete("/{id}")
    override fun delete(auth: Authentication, @PathVariable id: Long) = auth.checkPermission(PERMISSION_TEXT_WRITE) {
        service.delete(id)
    }

}
