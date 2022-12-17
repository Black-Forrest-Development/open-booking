package de.sambalmueslie.openbooking.group


import de.sambalmueslie.openbooking.common.GenericCrudService
import de.sambalmueslie.openbooking.error.InvalidRequestException
import de.sambalmueslie.openbooking.group.api.VisitorGroup
import de.sambalmueslie.openbooking.group.api.VisitorGroupChangeRequest
import de.sambalmueslie.openbooking.group.db.VisitorGroupData
import de.sambalmueslie.openbooking.group.db.VisitorGroupRepository
import de.sambalmueslie.openbooking.util.TimeProvider
import jakarta.inject.Singleton
import org.slf4j.Logger
import org.slf4j.LoggerFactory

@Singleton
class VisitorGroupService(
    private val repository: VisitorGroupRepository,
    private val timeProvider: TimeProvider
) : GenericCrudService<Long, VisitorGroup, VisitorGroupChangeRequest, VisitorGroupData>(repository, logger) {

    companion object {
        private val logger: Logger = LoggerFactory.getLogger(VisitorGroupService::class.java)
    }

    override fun createData(request: VisitorGroupChangeRequest): VisitorGroupData {
        return VisitorGroupData.create(request, timeProvider.now())
    }

    override fun updateData(data: VisitorGroupData, request: VisitorGroupChangeRequest): VisitorGroupData {
        return data.update(request, timeProvider.now())
    }

    override fun create(request: VisitorGroupChangeRequest): VisitorGroup {
        // TODO check for duplicates
        return super.create(request)
    }

    override fun isValid(request: VisitorGroupChangeRequest) {
        if (request.title.isEmpty()) throw InvalidRequestException("Title cannot be empty")
        if (request.size <= 0) throw InvalidRequestException("Size must be a positive number")
        if (request.minAge <= 0) throw InvalidRequestException("Min Age must be a positive number")
        if (request.maxAge <= 0) throw InvalidRequestException("Max Age must be a positive number")
        if (request.contact.isEmpty()) throw InvalidRequestException("Contact cannot be empty")
        if (request.email.isEmpty() && request.phone.isEmpty()) throw InvalidRequestException("Either mail or phone contact must be provided")
    }


}
