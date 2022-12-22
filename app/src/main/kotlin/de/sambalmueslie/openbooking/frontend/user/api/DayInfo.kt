package de.sambalmueslie.openbooking.frontend.user.api

import de.sambalmueslie.openbooking.backend.booking.api.BookingStatus
import java.time.LocalDate
import java.time.LocalDateTime

data class DayInfo(
    val date: LocalDate,
    val start: LocalDateTime?,
    val end: LocalDateTime?,

    val amountOfOfferTotal: Int,
    val amountOfOfferAvailable: Int,
    val amountOfOfferBooked: Int,

    val amountOfSpaceTotal: Int,
    val amountOfSpaceAvailable: Int,
    val amountOfSpaceBooked: Int
)
