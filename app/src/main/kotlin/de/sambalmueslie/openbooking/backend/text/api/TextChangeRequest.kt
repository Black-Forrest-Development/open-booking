package de.sambalmueslie.openbooking.backend.text.api

import de.sambalmueslie.openbooking.common.BusinessObjectChangeRequest

data class TextChangeRequest(
    val lang: String,
    val type: String,
    val content: String
) : BusinessObjectChangeRequest
