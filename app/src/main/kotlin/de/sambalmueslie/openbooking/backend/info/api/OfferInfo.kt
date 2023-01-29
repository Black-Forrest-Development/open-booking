package de.sambalmueslie.openbooking.backend.info.api


import de.sambalmueslie.openbooking.backend.offer.api.Offer

data class OfferInfo(
    val offer: Offer,

    val amountOfSpaceTotal: Int,
    val amountOfSpaceAvailable: Int,
    val amountOfSpaceConfirmed: Int,
    val amountOfSpaceUnconfirmed: Int,

    val bookings: List<BookingInfo>
)
