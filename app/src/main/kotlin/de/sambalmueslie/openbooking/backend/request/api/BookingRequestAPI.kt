package de.sambalmueslie.openbooking.backend.request.api

import de.sambalmueslie.openbooking.common.AuthCrudAPI

interface BookingRequestAPI : AuthCrudAPI<Long, BookingRequest, BookingRequestChangeRequest> {
    companion object {
        const val PERMISSION_BOOKING_REQUEST_READ = "openbooking.bookingrequest.read"
        const val PERMISSION_BOOKING_REQUEST_WRITE = "openbooking.bookingrequest.write"
    }
}
