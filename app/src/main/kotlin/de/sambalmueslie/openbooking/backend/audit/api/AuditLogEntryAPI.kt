package de.sambalmueslie.openbooking.backend.audit.api

import de.sambalmueslie.openbooking.common.AuthCrudAPI

interface AuditLogEntryAPI : AuthCrudAPI<Long, AuditLogEntry, AuditLogEntryChangeRequest> {
    companion object {
        const val PERMISSION_READ = "openbooking.audit.log.read"
        const val PERMISSION_WRITE = "openbooking.audit.log.write"
    }
}
