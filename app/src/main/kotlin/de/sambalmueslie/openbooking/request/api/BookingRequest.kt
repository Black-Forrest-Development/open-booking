package de.sambalmueslie.openbooking.request.api

import de.sambalmueslie.openbooking.common.BusinessObject

data class BookingRequest(
    override val id: Long,
    val status: BookingRequestStatus
) : BusinessObject<Long>
