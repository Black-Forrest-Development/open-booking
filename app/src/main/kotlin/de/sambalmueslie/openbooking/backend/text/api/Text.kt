package de.sambalmueslie.openbooking.backend.text.api

import de.sambalmueslie.openbooking.common.BusinessObject

data class Text(
    override val id: Long,
    val lang: String,
    val type: String,
    val content: String
) : BusinessObject<Long>
