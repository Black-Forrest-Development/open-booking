package de.sambalmueslie.openbooking.backend.settings


import de.sambalmueslie.openbooking.backend.settings.api.SettingChangeRequest
import de.sambalmueslie.openbooking.backend.settings.api.SettingsAPI
import de.sambalmueslie.openbooking.backend.settings.api.SettingsAPI.Companion.PERMISSION_READ
import de.sambalmueslie.openbooking.backend.settings.api.SettingsAPI.Companion.PERMISSION_WRITE
import de.sambalmueslie.openbooking.common.PatchRequest
import de.sambalmueslie.openbooking.common.checkPermission
import io.micronaut.data.model.Pageable
import io.micronaut.http.annotation.*
import io.micronaut.security.authentication.Authentication
import io.swagger.v3.oas.annotations.tags.Tag

@Controller("/api/backend/settings")
@Tag(name = "Settings API")
class SettingsController(private val service: SettingsService) : SettingsAPI {

    @Get("/{id}")
    override fun get(auth: Authentication, @PathVariable id: Long) = auth.checkPermission(PERMISSION_READ) {
        service.get(id)
    }

    @Get()
    override fun getAll(auth: Authentication, pageable: Pageable) = auth.checkPermission(PERMISSION_READ) {
        service.getAll(pageable)
    }

    @Post()
    override fun create(auth: Authentication, @Body request: SettingChangeRequest) = auth.checkPermission(PERMISSION_WRITE) {
        service.create(request)
    }

    @Put("/{id}")
    override fun update(auth: Authentication, @PathVariable id: Long, @Body request: SettingChangeRequest) = auth.checkPermission(PERMISSION_WRITE) {
        service.update(id, request)
    }

    @Delete("/{id}")
    override fun delete(auth: Authentication, @PathVariable id: Long) = auth.checkPermission(PERMISSION_WRITE) {
        service.delete(id)
    }

    @Patch("/{id}/value")
    override fun setValue(auth: Authentication, @PathVariable id: Long, @Body value: PatchRequest<Any>) =
        auth.checkPermission(PERMISSION_WRITE) { service.setValue(id, value.value) }

    @Get("/by/key/{key}")
    override fun findByKey(auth: Authentication, key: String) = auth.checkPermission(PERMISSION_READ) { service.findByKey(key) }

}
