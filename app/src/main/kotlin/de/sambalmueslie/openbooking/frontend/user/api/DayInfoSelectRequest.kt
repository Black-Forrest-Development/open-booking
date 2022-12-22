package de.sambalmueslie.openbooking.frontend.user.api

import java.time.LocalDate

data class DayInfoSelectRequest(
    val from: LocalDate,
    val to: LocalDate
)
