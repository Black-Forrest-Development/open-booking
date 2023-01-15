package de.sambalmueslie.openbooking.backend.response.api

data class ResolveResponseRequest(
    val lang: String,
    val type: ResponseType,
    val reference: Reference
)
