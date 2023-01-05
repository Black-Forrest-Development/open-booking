package de.sambalmueslie.openbooking.backend.export.tools


import org.slf4j.Logger
import org.slf4j.LoggerFactory
import java.time.LocalDateTime
import java.time.LocalTime
import java.time.format.DateTimeFormatter

class LocalDateTimeTool(
    private val timeFormatter: DateTimeFormatter = DateTimeFormatter.ofPattern("HH:mm")
) {

    companion object {
        private val logger: Logger = LoggerFactory.getLogger(LocalDateTimeTool::class.java)
    }

    fun formatTime(date: LocalDateTime): String {
        return format(date.toLocalTime())
    }

    private fun format(time: LocalTime): String {
        return time.format(timeFormatter)
    }


}
