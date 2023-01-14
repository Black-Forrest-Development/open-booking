package de.sambalmueslie.openbooking.backend.audit


import com.fasterxml.jackson.databind.ObjectMapper
import de.sambalmueslie.openbooking.backend.audit.api.AuditLogEntry
import de.sambalmueslie.openbooking.backend.audit.api.AuditLogEntryChangeRequest
import de.sambalmueslie.openbooking.backend.audit.db.AuditLogEntryData
import de.sambalmueslie.openbooking.backend.audit.db.AuditLogEntryRepository
import de.sambalmueslie.openbooking.common.GenericCrudService
import de.sambalmueslie.openbooking.error.InvalidRequestException
import jakarta.inject.Singleton
import org.slf4j.Logger
import org.slf4j.LoggerFactory

@Singleton
class AuditLogService(
    private val repository: AuditLogEntryRepository,
    private val mapper: ObjectMapper
) : GenericCrudService<Long, AuditLogEntry, AuditLogEntryChangeRequest, AuditLogEntryData>(repository, logger) {

    companion object {
        private val logger: Logger = LoggerFactory.getLogger(AuditLogService::class.java)
    }

    override fun createData(request: AuditLogEntryChangeRequest): AuditLogEntryData {
        return AuditLogEntryData.create(request, mapper)
    }

    override fun updateData(data: AuditLogEntryData, request: AuditLogEntryChangeRequest): AuditLogEntryData {
        return data.update(request, mapper)
    }

    override fun isValid(request: AuditLogEntryChangeRequest) {
        if (request.source.isBlank()) throw InvalidRequestException("Source is not allowed to be blank")
    }

}
