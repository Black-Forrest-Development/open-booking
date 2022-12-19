package de.sambalmueslie.openbooking.frontend.api

import de.sambalmueslie.openbooking.booking.api.BookingStatus
import java.time.LocalDate
import java.time.LocalDateTime

data class DayInfo(
    val date: LocalDate,
    val start: LocalDateTime?,
    val end: LocalDateTime?,
    val totalAmountOfSpace: Int,
    val bookedAmountOfSpace: Map<BookingStatus, Int>
)
