package de.sambalmueslie.openbooking.staff.api

import de.sambalmueslie.openbooking.common.BusinessObject

data class StaffMember(
    override val id: Long,
    val firstName: String,
    val lastName: String,
    val email: String,
    val phone: String
) : BusinessObject<Long>
