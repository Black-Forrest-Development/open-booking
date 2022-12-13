package de.sambalmueslie.openbooking.booking.api

import de.sambalmueslie.openbooking.common.BusinessObject

data class Booking(
    override val id: Long,

) : BusinessObject<Long>
