package de.sambalmueslie.openbooking.backend.offer.api

import de.sambalmueslie.openbooking.common.AuthCrudAPI
import de.sambalmueslie.openbooking.common.GenericRequestResult
import de.sambalmueslie.openbooking.common.PatchRequest
import io.micronaut.security.authentication.Authentication
import java.time.LocalDate

interface OfferAPI : AuthCrudAPI<Long, Offer, OfferChangeRequest> {
    companion object {
        const val PERMISSION_OFFER_READ = "openbooking.offer.read"
        const val PERMISSION_OFFER_WRITE = "openbooking.offer.write"
    }

    fun createSeries(auth: Authentication, request: OfferSeriesRequest): GenericRequestResult

    fun findByDate(auth: Authentication, date: LocalDate): List<Offer>

    fun setActive(auth: Authentication, id: Long, value: PatchRequest<Boolean>): Offer?
    fun setMaxPersons(auth: Authentication, id: Long, value: PatchRequest<Int>): Offer?

}
