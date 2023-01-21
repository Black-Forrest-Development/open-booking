package de.sambalmueslie.openbooking.backend.export.tools


import org.slf4j.Logger
import org.slf4j.LoggerFactory
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter

class LocalDateTimeTool(
    private val timeFormatter: DateTimeFormatter = DateTimeFormatter.ofPattern("HH:mm"),
    private val dateTimeFormatter: DateTimeFormatter = DateTimeFormatter.ofPattern("dd.MM.YY HH:mm")
) {

    companion object {
        private val logger: Logger = LoggerFactory.getLogger(LocalDateTimeTool::class.java)
    }

    fun format(date: LocalDateTime?, pattern: String): String {
        if (date == null) return ""
        return date.format(DateTimeFormatter.ofPattern(pattern))
    }

    fun formatDateTime(date: LocalDateTime?): String {
        if (date == null) return ""
        return dateTimeFormatter.format(date)
    }

    fun formatTime(date: LocalDateTime?): String {
        if (date == null) return ""
        return date.toLocalTime().format(timeFormatter)
    }


}
