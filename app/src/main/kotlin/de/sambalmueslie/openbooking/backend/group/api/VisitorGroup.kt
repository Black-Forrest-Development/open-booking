package de.sambalmueslie.openbooking.backend.group.api

import de.sambalmueslie.openbooking.common.BusinessObject

data class VisitorGroup(
    override val id: Long,
    val title: String,
    val size: Int,
    val minAge: Int,
    val maxAge: Int,
    val contact: String,
    val address: Address,
    val phone: String,
    val email: String,
    val status: VisitorGroupStatus
) : BusinessObject<Long>
