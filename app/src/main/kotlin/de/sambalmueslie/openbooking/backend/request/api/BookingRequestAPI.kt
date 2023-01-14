package de.sambalmueslie.openbooking.backend.request.api

import de.sambalmueslie.openbooking.common.AuthCrudAPI
import de.sambalmueslie.openbooking.common.GenericRequestResult
import io.micronaut.data.model.Page
import io.micronaut.data.model.Pageable
import io.micronaut.security.authentication.Authentication

interface BookingRequestAPI : AuthCrudAPI<Long, BookingRequest, BookingRequestChangeRequest> {
    companion object {
        const val PERMISSION_READ = "openbooking.bookingrequest.read"
        const val PERMISSION_WRITE = "openbooking.bookingrequest.write"
    }

    fun getUnconfirmed(auth: Authentication, pageable: Pageable): Page<BookingRequest>

    fun getInfoUnconfirmed(auth: Authentication, pageable: Pageable): Page<BookingRequestInfo>
    fun confirm(auth: Authentication, id: Long, bookingId: Long): GenericRequestResult
    fun denial(auth: Authentication, id: Long): GenericRequestResult

}
