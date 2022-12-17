package de.sambalmueslie.openbooking.booking.api

import de.sambalmueslie.openbooking.common.BusinessObjectChangeRequest

data class BookingChangeRequest(
    var offerId: Long,
    var visitorGroupId: Long,
) : BusinessObjectChangeRequest
