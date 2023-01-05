package de.sambalmueslie.openbooking.backend.export.api

import io.micronaut.http.server.types.files.SystemFile
import io.micronaut.security.authentication.Authentication
import java.time.LocalDate

interface ExportAPI {
    companion object {
        const val PERMISSION_EXPORT_READ = "openbooking.export.read"
        const val PERMISSION_EXPORT_WRITE = "openbooking.export.write"
    }

    fun createDailyReportPdf(auth: Authentication, date: LocalDate): SystemFile?

}