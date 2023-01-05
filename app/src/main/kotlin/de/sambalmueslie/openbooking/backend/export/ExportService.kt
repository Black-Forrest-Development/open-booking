package de.sambalmueslie.openbooking.backend.export


import de.sambalmueslie.openbooking.backend.booking.BookingService
import de.sambalmueslie.openbooking.backend.offer.OfferService
import de.sambalmueslie.openbooking.backend.offer.api.OfferDetails
import de.sambalmueslie.openbooking.common.measureTimeMillisWithReturn
import io.micronaut.http.server.types.files.SystemFile
import jakarta.inject.Singleton
import org.apache.velocity.tools.generic.DateTool
import org.apache.velocity.tools.generic.EscapeTool
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import java.io.File
import java.time.LocalDate

@Singleton
class ExportService(
    private val pdfExporter: PdfExporter,
    private val offerService: OfferService,
    private val bookingService: BookingService
) {

    companion object {
        private val logger: Logger = LoggerFactory.getLogger(ExportService::class.java)
    }

    fun createDailyReportPdf(date: LocalDate): SystemFile? {
        val (duration, result) = measureTimeMillisWithReturn {
            val offer = offerService.getOffer(date).map {
                OfferDetails(it, bookingService.findDetailsByOffer(it.id))
            }

            val properties = mutableMapOf<String, Any>()
            properties["offer"] = offer
            properties["timestamp"] = date.toString()

            val content = pdfExporter.export(properties, "dailyReport.vm") ?: return@measureTimeMillisWithReturn null

            val file = File.createTempFile("DailyReport", ".pdf")
            file.writeBytes(content)
            val filename = "DailyReport${date.toString()}.pdf"
            SystemFile(file).attach(filename)
        }
        logger.info("Created daily report for $date within $duration ms")
        return result
    }

}
