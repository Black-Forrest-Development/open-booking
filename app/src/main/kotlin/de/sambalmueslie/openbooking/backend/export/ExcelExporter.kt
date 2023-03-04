package de.sambalmueslie.openbooking.backend.export


import builders.dsl.spreadsheet.builder.api.SheetDefinition
import builders.dsl.spreadsheet.builder.poi.PoiSpreadsheetBuilder
import de.sambalmueslie.openbooking.backend.booking.api.BookingDetails
import de.sambalmueslie.openbooking.backend.export.excel.OfferExcelStylesheet
import de.sambalmueslie.openbooking.backend.offer.api.OfferDetails
import io.micronaut.http.server.types.files.SystemFile
import jakarta.inject.Singleton
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import java.io.File
import java.time.LocalDate
import java.time.format.DateTimeFormatter
import java.time.format.FormatStyle

@Singleton
class ExcelExporter : Exporter {

    companion object {
        private val logger: Logger = LoggerFactory.getLogger(ExcelExporter::class.java)
        private const val HEADER_EXCEL_FILE_SUFIX = ".xlsx"
        private const val HEADER_EXCEL_FILE_PREFIX = "books"
        private val formatter = DateTimeFormatter.ofLocalizedTime(FormatStyle.SHORT)
    }

    override fun export(date: LocalDate, offer: List<OfferDetails>): SystemFile? {
        val file = File.createTempFile(HEADER_EXCEL_FILE_PREFIX, HEADER_EXCEL_FILE_SUFIX)
        PoiSpreadsheetBuilder.create(file).build { w ->
            w.apply(OfferExcelStylesheet())
            w.sheet(date.toString()) { s ->
                offer.filter { it.offer.active }.forEach { addOffer(s, it) }
            }
        }
        val filename = "DailyReport${date}.xlsx"
        return SystemFile(file).attach(filename)
    }

    private fun addOffer(s: SheetDefinition, offer: OfferDetails) {
        s.row { r ->
            r.cell {
                it.value(offer.offer.start.format(formatter))
                it.style(OfferExcelStylesheet.STYLE_HEADER)
            }
            r.cell {
                it.colspan(2)
            }
            r.cell {
                it.value(offer.offer.maxPersons)
                it.style(OfferExcelStylesheet.STYLE_HEADER)
            }
        }
        offer.bookings.forEachIndexed { index, booking -> addBooking(s, index, booking) }
    }

    private fun addBooking(s: SheetDefinition, index: Int, booking: BookingDetails) {
        s.row { r ->
            r.cell {
                it.value(index)
            }
            r.cell {
                it.value(booking.visitorGroup.title)
            }
            r.cell {
                it.value(booking.visitorGroup.contact)
            }
            r.cell {
                it.value(booking.visitorGroup.size)
            }
            r.cell {
                it.value(booking.visitorGroup.status)
            }
        }
    }


}
