package de.sambalmueslie.openbooking.backend.booking.api

import de.sambalmueslie.openbooking.common.AuthCrudAPI
import io.micronaut.security.authentication.Authentication

interface BookingAPI : AuthCrudAPI<Long, Booking, BookingChangeRequest> {
    companion object {
        const val PERMISSION_BOOKING_READ = "openbooking.booking.read"
        const val PERMISSION_BOOKING_WRITE = "openbooking.booking.write"
    }

    fun findByOffer(auth: Authentication, offerId: Long): List<Booking>

    fun findDetailsByOffer(auth: Authentication, offerId: Long): List<BookingDetails>
}
