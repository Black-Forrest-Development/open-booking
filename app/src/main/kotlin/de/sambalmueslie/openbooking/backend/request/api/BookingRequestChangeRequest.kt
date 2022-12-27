package de.sambalmueslie.openbooking.backend.request.api

import de.sambalmueslie.openbooking.backend.booking.api.BookingChangeRequest
import de.sambalmueslie.openbooking.common.BusinessObjectChangeRequest
import de.sambalmueslie.openbooking.backend.group.api.VisitorGroupChangeRequest

data class BookingRequestChangeRequest(
    val visitorGroupChangeRequest: VisitorGroupChangeRequest,
    val offerIds: List<Long>,
    val comment: String,
) : BusinessObjectChangeRequest
