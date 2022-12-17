package de.sambalmueslie.openbooking.booking


import de.sambalmueslie.openbooking.booking.api.Booking
import de.sambalmueslie.openbooking.booking.api.BookingChangeRequest
import jakarta.inject.Singleton
import org.slf4j.Logger
import org.slf4j.LoggerFactory

@Singleton
class BookingService {

    companion object {
        private val logger: Logger = LoggerFactory.getLogger(BookingService::class.java)
    }

    fun create(request: BookingChangeRequest): Booking? {
        TODO("Not yet implemented")
    }

    fun delete(bookingId: Long) {
        TODO("Not yet implemented")
    }
}
