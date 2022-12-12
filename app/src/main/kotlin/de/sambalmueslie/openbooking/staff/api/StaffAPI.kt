package de.sambalmueslie.openbooking.staff.api

import de.sambalmueslie.openbooking.common.AuthCrudAPI

interface StaffAPI : AuthCrudAPI<Long, StaffMember, StaffMemberChangeRequest> {
    companion object {
        const val PERMISSION_STAFF_READ = "openbooking.staff.read"
        const val PERMISSION_STAFF_WRITE = "openbooking.staff.write"
    }
}

