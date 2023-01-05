package de.sambalmueslie.openbooking.backend.export


import io.micronaut.http.annotation.Controller
import io.swagger.v3.oas.annotations.tags.Tag
import org.slf4j.Logger
import org.slf4j.LoggerFactory
@Controller("/api/backend/export")
@Tag(name = "Export API")
class ExportController(private val service: ExportService) {

}
