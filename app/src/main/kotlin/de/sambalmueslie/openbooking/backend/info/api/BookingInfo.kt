package de.sambalmueslie.openbooking.backend.info.api

import de.sambalmueslie.openbooking.backend.booking.api.BookingStatus

data class BookingInfo(
    val size: Int,
    val status: BookingStatus,
)
