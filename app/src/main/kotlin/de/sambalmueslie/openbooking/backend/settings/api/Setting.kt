package de.sambalmueslie.openbooking.backend.settings.api

import de.sambalmueslie.openbooking.common.BusinessObject

data class Setting(
    override val id: String,
    val value: Any,
    val type: ValueType
) : BusinessObject<String>
