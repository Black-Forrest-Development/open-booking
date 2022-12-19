package de.sambalmueslie.openbooking.backend.group.api

import de.sambalmueslie.openbooking.common.AuthCrudAPI

interface GroupAPI : AuthCrudAPI<Long, VisitorGroup, VisitorGroupChangeRequest> {
    companion object {
        const val PERMISSION_GROUP_READ = "openbooking.group.read"
        const val PERMISSION_GROUP_WRITE = "openbooking.group.write"
    }
}
