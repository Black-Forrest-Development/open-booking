package de.sambalmueslie.openbooking.backend.response.api

import de.sambalmueslie.openbooking.common.AuthCrudAPI

interface ResponseAPI : AuthCrudAPI<Long, Response, ResponseChangeRequest> {
    companion object {
        const val PERMISSION_READ = "openbooking.response.read"
        const val PERMISSION_WRITE = "openbooking.response.write"
    }
}

