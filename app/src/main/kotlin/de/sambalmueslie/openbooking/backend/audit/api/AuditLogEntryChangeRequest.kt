package de.sambalmueslie.openbooking.backend.audit.api

import de.sambalmueslie.openbooking.common.BusinessObjectChangeRequest
import java.time.LocalDateTime

data class AuditLogEntryChangeRequest(
    val timestamp: LocalDateTime,
    val actor: String,
    val level: AuditLogLevel,
    val message: String,
    val reference: Any,
    val source: String,
) : BusinessObjectChangeRequest
