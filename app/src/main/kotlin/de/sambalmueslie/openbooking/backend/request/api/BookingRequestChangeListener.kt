package de.sambalmueslie.openbooking.backend.request.api

interface BookingRequestChangeListener {
    fun confirmed(request: BookingRequest, silent: Boolean)
    fun denied(request: BookingRequest, silent: Boolean)

}
