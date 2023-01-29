package de.sambalmueslie.openbooking.backend.text.api

import de.sambalmueslie.openbooking.common.AuthCrudAPI

interface TextAPI : AuthCrudAPI<Long, Text, TextChangeRequest> {
    companion object {
        const val PERMISSION_TEXT_READ = "openbooking.text.read"
        const val PERMISSION_TEXT_WRITE = "openbooking.text.write"
    }
}
