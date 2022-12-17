package de.sambalmueslie.openbooking.role


import de.sambalmueslie.openbooking.common.GenericCrudService
import de.sambalmueslie.openbooking.error.InvalidRequestException
import de.sambalmueslie.openbooking.role.api.TourRole
import de.sambalmueslie.openbooking.role.api.TourRoleChangeRequest
import de.sambalmueslie.openbooking.role.db.TourRoleData
import de.sambalmueslie.openbooking.role.db.TourRoleRepository
import de.sambalmueslie.openbooking.staff.db.StaffMemberData
import de.sambalmueslie.openbooking.util.TimeProvider
import jakarta.inject.Singleton
import org.slf4j.Logger
import org.slf4j.LoggerFactory

@Singleton
class RoleService(
    private val repository: TourRoleRepository,
    private val timeProvider: TimeProvider
) : GenericCrudService<Long, TourRole, TourRoleChangeRequest, TourRoleData>(repository, logger) {
    companion object {
        private val logger: Logger = LoggerFactory.getLogger(RoleService::class.java)
    }

    override fun createData(request: TourRoleChangeRequest): TourRoleData {
        return TourRoleData.create(request, timeProvider.now())
    }

    override fun updateData(data: TourRoleData, request: TourRoleChangeRequest): TourRoleData {
        return data.update(request, timeProvider.now())
    }

    override fun isValid(request: TourRoleChangeRequest) {
        if (request.name.isEmpty()) throw InvalidRequestException("Name cannot be empty")
    }


}
