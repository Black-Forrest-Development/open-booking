package de.sambalmueslie.openbooking.role.api

import de.sambalmueslie.openbooking.common.BusinessObjectChangeRequest

data class TourRoleChangeRequest(
    val name: String,
    val description: String
) : BusinessObjectChangeRequest

