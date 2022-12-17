package de.sambalmueslie.openbooking.request.api

import de.sambalmueslie.openbooking.booking.api.BookingChangeRequest
import de.sambalmueslie.openbooking.common.BusinessObjectChangeRequest
import de.sambalmueslie.openbooking.group.api.VisitorGroupChangeRequest

data class BookingRequestChangeRequest(
    val visitorGroupChangeRequest: VisitorGroupChangeRequest,
    val bookings: List<BookingChangeRequest>
) : BusinessObjectChangeRequest
