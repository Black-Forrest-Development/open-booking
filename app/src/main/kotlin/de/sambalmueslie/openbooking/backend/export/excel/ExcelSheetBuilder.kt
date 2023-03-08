package de.sambalmueslie.openbooking.backend.export.excel


import de.sambalmueslie.openbooking.backend.offer.api.OfferDetails
import de.sambalmueslie.openbooking.backend.request.api.BookingRequestInfo
import de.sambalmueslie.openbooking.backend.request.api.BookingRequestStatus
import org.apache.poi.ss.usermodel.*
import org.apache.poi.ss.util.CellRangeAddress
import org.apache.poi.ss.util.CellUtil
import org.apache.poi.ss.util.RegionUtil
import org.apache.poi.xssf.usermodel.IndexedColorMap
import org.apache.poi.xssf.usermodel.XSSFColor
import org.apache.poi.xssf.usermodel.XSSFWorkbook
import java.awt.Color
import java.time.LocalDate
import java.time.format.DateTimeFormatter


class ExcelSheetBuilder(
    private val wb: XSSFWorkbook,
    private val date: LocalDate,
    private val offer: List<OfferDetails>
) {

    companion object {
        private val formatter = DateTimeFormatter.ofPattern("HH:mm")

        // Donnerstag, 16. März 2023
        private val headlineFormatter = DateTimeFormatter.ofPattern("EEEE ,dd. LLLL yyyy")
    }

    private val sheet = wb.createSheet(date.toString())
    private var rowIndex = 3
    private val styleOfferHeaderBold = wb.createCellStyle()
    private val styleOfferHeaderText = wb.createCellStyle()
    private val styleBooking = wb.createCellStyle()

    fun build() {
        setupStyles()
        setupSheet()
        setupHeadline()
        offer.filter { it.offer.active }.forEach { setupOffer(it) }
    }

    private fun setupStyles() {
        val colorMap: IndexedColorMap = wb.stylesSource.indexedColors
        val boldFont = wb.createFont()
        boldFont.bold = true
        boldFont.fontHeightInPoints = 12

        val normalFont = wb.createFont()
        normalFont.fontHeightInPoints = 12

        styleOfferHeaderBold.setFillForegroundColor(XSSFColor(Color(217,217,217), colorMap))
        styleOfferHeaderBold.fillPattern = FillPatternType.SOLID_FOREGROUND
        styleOfferHeaderBold.setFont(boldFont)
        styleOfferHeaderBold.borderBottom = BorderStyle.THIN

        styleOfferHeaderText.setFillForegroundColor(XSSFColor(Color(217,217,217), colorMap))
        styleOfferHeaderText.fillPattern = FillPatternType.SOLID_FOREGROUND
        styleOfferHeaderText.alignment = HorizontalAlignment.RIGHT
        styleOfferHeaderText.borderBottom = BorderStyle.THIN
        styleOfferHeaderText.setFont(normalFont)

        styleBooking.fillPattern = FillPatternType.NO_FILL
        styleBooking.borderBottom = BorderStyle.THIN
        styleBooking.setFont(normalFont)

    }


    private fun setupHeadline() {
        val row = sheet.createRow(1)
        val cell = row.createCell(1)
        cell.setCellValue(date.format(headlineFormatter))
        val font = wb.createFont()
        font.fontHeightInPoints = 14
        font.bold = true

        val borderStyle = wb.createCellStyle()
        borderStyle.borderBottom = BorderStyle.THIN
        borderStyle.setFont(font)
        cell.cellStyle = borderStyle

        (2..9).forEach { row.createCell(it).cellStyle = borderStyle }
        sheet.addMergedRegion(CellRangeAddress(row.rowNum, row.rowNum, 1, 9))
    }

    private fun setupSheet() {
        sheet.setColumnWidth(0, 5 * 256)
        sheet.setColumnWidth(1, 9 * 256)
        sheet.setColumnWidth(2, 9 * 256)
        sheet.setColumnWidth(3, 14 * 256)
        sheet.setColumnWidth(4, 12 * 256)
        sheet.setColumnWidth(5, 9 * 256)
        sheet.setColumnWidth(6, 5 * 256)
        sheet.setColumnWidth(7, 9 * 256)
        sheet.setColumnWidth(8, 9 * 256)
        sheet.setColumnWidth(9, 22 * 256)
    }

    private fun setupOffer(details: OfferDetails) {
        createOfferHeaderLine1(details)
        createOfferHeaderLine2(details)

        val bookings = details.bookings.filter { it.status != BookingRequestStatus.DENIED }
        bookings.forEachIndexed { index, info -> setupBooking(index, info) }

        if(bookings.isEmpty()) setupEmptyBooking()

        val firstRow = if(bookings.isEmpty()) rowIndex - 3 else rowIndex - bookings.size - 2
        val region = CellRangeAddress(firstRow, rowIndex - 1, 1, 9)
        RegionUtil.setBorderLeft(BorderStyle.MEDIUM, region, sheet)
        RegionUtil.setBorderRight(BorderStyle.MEDIUM, region, sheet)
        RegionUtil.setBorderBottom(BorderStyle.MEDIUM, region, sheet)
        RegionUtil.setBorderTop(BorderStyle.MEDIUM, region, sheet)

        sheet.createRow(rowIndex++)
    }



    private fun createOfferHeaderLine1(details: OfferDetails) {
        val row = sheet.createRow(rowIndex++)

        val timeCell = row.createCell(1)
        timeCell.setCellValue(details.offer.start.format(formatter))
        timeCell.cellStyle = styleOfferHeaderBold
        row.createCell(2).cellStyle = styleOfferHeaderBold

        val spaceConfirmed = details.bookings.filter { it.status == BookingRequestStatus.CONFIRMED }.sumOf { it.visitorGroup.size }
        val spaceAvailable = details.offer.maxPersons - spaceConfirmed

        val usedTextCell = row.createCell(3)
        usedTextCell.setCellValue("Belegt:")
        usedTextCell.cellStyle = styleOfferHeaderText
        val usedValueCell = row.createCell(4)
        usedValueCell.setCellValue(spaceConfirmed.toDouble())
        usedValueCell.cellStyle = styleOfferHeaderBold
        CellUtil.setAlignment(usedValueCell, HorizontalAlignment.LEFT)

        val availableTextCell = row.createCell(5)
        availableTextCell.setCellValue("frei:")
        availableTextCell.cellStyle = styleOfferHeaderText
        val availableValueCell = row.createCell(6)
        availableValueCell.setCellValue(spaceAvailable.toDouble())
        availableValueCell.cellStyle = styleOfferHeaderBold
        CellUtil.setAlignment(availableValueCell, HorizontalAlignment.LEFT)

        row.createCell(7).cellStyle = styleOfferHeaderBold
        row.createCell(8).cellStyle = styleOfferHeaderBold
        row.createCell(9).cellStyle = styleOfferHeaderBold
    }


    private fun createOfferHeaderLine2(details: OfferDetails) {
        val row = sheet.createRow(rowIndex++)

        val indexCell = row.createCell(1)
        indexCell.setCellValue("Nr")
        indexCell.cellStyle = styleOfferHeaderBold

        val groupCell = row.createCell(2)
        groupCell.setCellValue("Gruppe")
        groupCell.cellStyle = styleOfferHeaderBold
        row.createCell(3).cellStyle = styleOfferHeaderBold

        val contactCell = row.createCell(4)
        contactCell.setCellValue("Kontakt")
        contactCell.cellStyle = styleOfferHeaderBold
        row.createCell(5).cellStyle = styleOfferHeaderBold

        val sizeCell = row.createCell(6)
        sizeCell.setCellValue("Pers")
        sizeCell.cellStyle = styleOfferHeaderBold

        val noteCell = row.createCell(7)
        noteCell.setCellValue("Anmerkungen")
        noteCell.cellStyle = styleOfferHeaderBold
        CellUtil.setCellStyleProperty(noteCell, CellUtil.BORDER_LEFT, BorderStyle.THIN)

        row.createCell(8).cellStyle = styleOfferHeaderBold
        row.createCell(9).cellStyle = styleOfferHeaderBold
    }

    private fun setupBooking(index: Int, info: BookingRequestInfo) {
        val row = sheet.createRow(rowIndex++)

        val indexCell = row.createCell(1)
        indexCell.setCellValue(index.toDouble())
        indexCell.cellStyle = styleBooking
        CellUtil.setAlignment(indexCell, HorizontalAlignment.CENTER)

        val groupCell = row.createCell(2)
        groupCell.setCellValue(info.visitorGroup.title)
        groupCell.cellStyle = styleBooking

        row.createCell(3).cellStyle = styleBooking

        val contactCell = row.createCell(4)
        contactCell.setCellValue(info.visitorGroup.contact)
        contactCell.cellStyle = styleBooking
        row.createCell(5).cellStyle = styleBooking

        val sizeCell = row.createCell(6)
        sizeCell.setCellValue(info.visitorGroup.size.toDouble())
        sizeCell.cellStyle = styleBooking
        CellUtil.setAlignment(sizeCell, HorizontalAlignment.CENTER)

        val noteCell = row.createCell(7)
        noteCell.setCellValue(info.comment)
        noteCell.cellStyle = styleBooking
        CellUtil.setCellStyleProperty(noteCell, CellUtil.BORDER_LEFT, BorderStyle.THIN)

        row.createCell(8).cellStyle = styleBooking
        row.createCell(9).cellStyle = styleBooking
    }


    private fun setupEmptyBooking() {
        val row = sheet.createRow(rowIndex++)

        val indexCell = row.createCell(1)
        indexCell.setCellValue(1.0)
        indexCell.cellStyle = styleBooking
        CellUtil.setAlignment(indexCell, HorizontalAlignment.CENTER)

        val groupCell = row.createCell(2)
        groupCell.cellStyle = styleBooking

        row.createCell(3).cellStyle = styleBooking

        val contactCell = row.createCell(4)
        contactCell.cellStyle = styleBooking
        row.createCell(5).cellStyle = styleBooking

        val sizeCell = row.createCell(6)
        sizeCell.cellStyle = styleBooking
        CellUtil.setAlignment(sizeCell, HorizontalAlignment.CENTER)

        val noteCell = row.createCell(7)
        noteCell.cellStyle = styleBooking
        CellUtil.setCellStyleProperty(noteCell, CellUtil.BORDER_LEFT, BorderStyle.THIN)

        row.createCell(8).cellStyle = styleBooking
        row.createCell(9).cellStyle = styleBooking
    }
}
