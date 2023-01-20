package de.sambalmueslie.openbooking.backend.audit.db

import com.fasterxml.jackson.databind.ObjectMapper
import de.sambalmueslie.openbooking.backend.audit.api.AuditLogEntry
import de.sambalmueslie.openbooking.backend.audit.api.AuditLogEntryChangeRequest
import de.sambalmueslie.openbooking.backend.audit.api.AuditLogLevel
import de.sambalmueslie.openbooking.common.DataObject
import jakarta.persistence.*
import java.time.LocalDateTime

@Suppress("JpaObjectClassSignatureInspection")
@Entity(name = "AuditLogEntry")
@Table(name = "audit_log_entry")
data class AuditLogEntryData(
    @Id @GeneratedValue(strategy = GenerationType.SEQUENCE) var id: Long,
    @Column var timestamp: LocalDateTime,
    @Column var actor: String,
    @Column @Enumerated(EnumType.STRING) var level: AuditLogLevel,
    @Column var message: String,
    @Column var referenceId: Long,
    @Column var reference: String,
    @Column var source: String,
) : DataObject<AuditLogEntry> {

    companion object {
        fun create(request: AuditLogEntryChangeRequest, mapper: ObjectMapper): AuditLogEntryData {
            return AuditLogEntryData(
                0,
                request.timestamp,
                request.actor,
                request.level,
                request.message,
                request.referenceId,
                mapper.writeValueAsString(request.reference),
                request.source
            )
        }
    }

    override fun convert(): AuditLogEntry {
        return AuditLogEntry(id, timestamp, actor, level, message, referenceId, reference, source)
    }

    fun update(request: AuditLogEntryChangeRequest, mapper: ObjectMapper): AuditLogEntryData {
        timestamp = request.timestamp
        actor = request.actor
        level = request.level
        message = request.message
        referenceId = request.referenceId
        reference = mapper.writeValueAsString(request.reference)
        source = request.source
        return this
    }
}

