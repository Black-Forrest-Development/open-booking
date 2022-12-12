package de.sambalmueslie.openbooking.settings.api

import de.sambalmueslie.openbooking.common.AuthCrudAPI
import de.sambalmueslie.openbooking.offer.api.Offer
import de.sambalmueslie.openbooking.offer.api.OfferChangeRequest

interface SettingsAPI : AuthCrudAPI<Long, Offer, OfferChangeRequest> {
    companion object {
        const val PERMISSION_SETTINGS_READ = "openbooking.settings.read"
        const val PERMISSION_SETTINGS_WRITE = "openbooking.settings.write"
    }
}

