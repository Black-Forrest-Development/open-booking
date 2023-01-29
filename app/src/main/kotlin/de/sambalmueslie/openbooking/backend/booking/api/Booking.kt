package de.sambalmueslie.openbooking.backend.booking.api

import de.sambalmueslie.openbooking.common.BusinessObject

data class Booking(
    override val id: Long,
    val offerId: Long,
    val visitorGroupId: Long,
    val status: BookingStatus,
) : BusinessObject<Long>
