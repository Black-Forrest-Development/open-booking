package de.sambalmueslie.openbooking.backend.offer.api

import de.sambalmueslie.openbooking.common.BusinessObjectChangeRequest
import java.time.LocalDateTime
import java.time.LocalTime

data class OfferChangeRequest(
    val start: LocalDateTime,
    val finish: LocalDateTime,
    val maxPersons: Int,
    val active: Boolean
) : BusinessObjectChangeRequest
