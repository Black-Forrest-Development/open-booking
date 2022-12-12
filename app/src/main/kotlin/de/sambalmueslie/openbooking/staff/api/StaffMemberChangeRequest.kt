package de.sambalmueslie.openbooking.staff.api


import de.sambalmueslie.openbooking.common.BusinessObjectChangeRequest
import org.slf4j.Logger
import org.slf4j.LoggerFactory

data class StaffMemberChangeRequest(
	val firstName: String,
	val lastName: String,
	val email: String,
	val phone: String
) : BusinessObjectChangeRequest
