package de.sambalmueslie.openbooking.backend.offer.api

import de.sambalmueslie.openbooking.common.AuthCrudAPI

interface OfferAPI : AuthCrudAPI<Long, Offer, OfferChangeRequest> {
    companion object {
        const val PERMISSION_OFFER_READ = "openbooking.offer.read"
        const val PERMISSION_OFFER_WRITE = "openbooking.offer.write"
    }
}
