package de.sambalmueslie.openbooking.role.api

import de.sambalmueslie.openbooking.common.AuthCrudAPI

interface RoleAPI : AuthCrudAPI<Long, TourRole, TourRoleChangeRequest> {
    companion object {
        const val PERMISSION_ROLE_READ = "openbooking.role.read"
        const val PERMISSION_ROLE_WRITE = "openbooking.role.write"
    }
}

