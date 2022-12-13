package de.sambalmueslie.openbooking.staff


import de.sambalmueslie.openbooking.common.GenericCrudService
import de.sambalmueslie.openbooking.error.InvalidRequestException
import de.sambalmueslie.openbooking.staff.api.StaffMember
import de.sambalmueslie.openbooking.staff.api.StaffMemberChangeRequest
import de.sambalmueslie.openbooking.staff.db.StaffMemberData
import de.sambalmueslie.openbooking.staff.db.StaffMemberRepository
import de.sambalmueslie.openbooking.util.TimeProvider
import jakarta.inject.Singleton
import org.slf4j.Logger
import org.slf4j.LoggerFactory

@Singleton
class StaffService(
    private val repository: StaffMemberRepository,
    private val timeProvider: TimeProvider
) : GenericCrudService<Long, StaffMember, StaffMemberChangeRequest, StaffMemberData>(repository, logger) {


    companion object {
        private val logger: Logger = LoggerFactory.getLogger(StaffService::class.java)
    }

    override fun createData(request: StaffMemberChangeRequest): StaffMemberData {
        return StaffMemberData.create(request, timeProvider.now())
    }

    override fun updateData(data: StaffMemberData, request: StaffMemberChangeRequest): StaffMemberData {
        return data.update(request, timeProvider.now())
    }

    override fun isValid(request: StaffMemberChangeRequest) {
        if (request.firstName.isEmpty()) throw InvalidRequestException("First name cannot be empty")
        if (request.lastName.isEmpty()) throw InvalidRequestException("First name cannot be empty")
        if (request.email.isEmpty() && request.phone.isEmpty()) throw InvalidRequestException("Either mail or phone contact must be provided")
    }


}
