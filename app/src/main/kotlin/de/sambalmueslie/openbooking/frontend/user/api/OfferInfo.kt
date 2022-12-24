package de.sambalmueslie.openbooking.frontend.user.api

import java.time.LocalDateTime

data class OfferInfo(
    val id: Long,
    val start: LocalDateTime,
    val end: LocalDateTime,

    val amountOfSpaceTotal: Int,
    val amountOfSpaceAvailable: Int,
    val amountOfSpaceBooked: Int
)
