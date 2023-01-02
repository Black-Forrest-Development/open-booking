package de.sambalmueslie.openbooking.backend.booking.api

import de.sambalmueslie.openbooking.common.AuthCrudAPI

interface BookingAPI : AuthCrudAPI<Long, Booking, BookingChangeRequest> {
    companion object {
        const val PERMISSION_BOOKING_READ = "openbooking.booking.read"
        const val PERMISSION_BOOKING_WRITE = "openbooking.booking.write"
    }
}
