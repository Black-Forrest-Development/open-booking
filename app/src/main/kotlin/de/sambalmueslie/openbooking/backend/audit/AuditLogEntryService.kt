package de.sambalmueslie.openbooking.backend.audit


import com.fasterxml.jackson.databind.ObjectMapper
import de.sambalmueslie.openbooking.backend.audit.api.AuditLogEntry
import de.sambalmueslie.openbooking.backend.audit.api.AuditLogEntryChangeRequest
import de.sambalmueslie.openbooking.backend.audit.db.AuditLogEntryData
import de.sambalmueslie.openbooking.backend.audit.db.AuditLogEntryRepository
import de.sambalmueslie.openbooking.common.GenericCrudService
import de.sambalmueslie.openbooking.error.InvalidRequestException
import io.micronaut.data.model.Page
import io.micronaut.data.model.Pageable
import jakarta.inject.Singleton
import org.slf4j.Logger
import org.slf4j.LoggerFactory

@Singleton
class AuditLogEntryService(
    private val repository: AuditLogEntryRepository,
    private val mapper: ObjectMapper
) : GenericCrudService<Long, AuditLogEntry, AuditLogEntryChangeRequest, AuditLogEntryData>(repository, logger) {

    companion object {
        private val logger: Logger = LoggerFactory.getLogger(AuditLogEntryService::class.java)
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

    fun findAll(pageable: Pageable): Page<AuditLogEntry> = repository.findAllOrderByTimestampDesc(pageable).map { it.convert() }
    fun findByReferenceId(referenceId: Long, pageable: Pageable): Page<AuditLogEntry> = repository.findAllByReferenceId(referenceId, pageable).map { it.convert() }

}
