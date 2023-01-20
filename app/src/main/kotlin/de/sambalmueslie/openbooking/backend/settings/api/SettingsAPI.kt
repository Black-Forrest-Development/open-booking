package de.sambalmueslie.openbooking.backend.settings.api

import de.sambalmueslie.openbooking.common.AuthCrudAPI
import de.sambalmueslie.openbooking.common.PatchRequest
import io.micronaut.security.authentication.Authentication

interface SettingsAPI : AuthCrudAPI<String, Setting, SettingChangeRequest> {
    companion object {
        const val PERMISSION_READ = "openbooking.settings.read"
        const val PERMISSION_WRITE = "openbooking.settings.write"

        const val SETTINGS_URL_HELP = "url.help"
        const val SETTINGS_URL_TERMS_AND_CONDITIONS = "url.terms-and-condition"
        const val SETTINGS_MAIL_FROM_ADDRESS = "mail.from-address"
        const val SETTINGS_MAIL_REPLY_TO_ADDRESS = "mail.reply-to-address"
        const val SETTINGS_MAIL_DEFAULT_ADMIN_ADDRESS = "mail.default-admin-address"
    }

    fun setValue(auth: Authentication, id: String, value: PatchRequest<Any>): Setting?
}

