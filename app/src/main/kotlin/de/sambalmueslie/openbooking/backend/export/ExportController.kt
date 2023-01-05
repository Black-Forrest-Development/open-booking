package de.sambalmueslie.openbooking.backend.export


import de.sambalmueslie.openbooking.backend.export.api.ExportAPI
import de.sambalmueslie.openbooking.backend.export.api.ExportAPI.Companion.PERMISSION_EXPORT_READ
import de.sambalmueslie.openbooking.backend.offer.api.OfferAPI
import de.sambalmueslie.openbooking.common.checkPermission
import io.micronaut.http.MediaType
import io.micronaut.http.annotation.Controller
import io.micronaut.http.annotation.Get
import io.micronaut.http.annotation.PathVariable
import io.micronaut.http.annotation.Produces
import io.micronaut.http.server.types.files.SystemFile
import io.micronaut.security.authentication.Authentication
import io.swagger.v3.oas.annotations.tags.Tag
import java.time.LocalDate

@Controller("/api/backend/export")
@Tag(name = "Export API")
class ExportController(private val service: ExportService) : ExportAPI {

    @Produces(value = [MediaType.APPLICATION_OCTET_STREAM])
    @Get("/daily/{date}/pdf")
    override fun createDailyReportPdf(auth: Authentication, @PathVariable date: LocalDate) =
        auth.checkPermission(PERMISSION_EXPORT_READ) {service.createDailyReportPdf(date)}

}
