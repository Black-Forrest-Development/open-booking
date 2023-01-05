package de.sambalmueslie.openbooking.backend.offer.api

import de.sambalmueslie.openbooking.backend.booking.api.BookingDetails

data class OfferDetails(
    val offer: Offer,
    val bookings: List<BookingDetails>
)
