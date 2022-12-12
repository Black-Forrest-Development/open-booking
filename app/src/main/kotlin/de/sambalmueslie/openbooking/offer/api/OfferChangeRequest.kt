package de.sambalmueslie.openbooking.offer.api

import de.sambalmueslie.openbooking.common.BusinessObjectChangeRequest
import java.time.LocalDateTime

data class OfferChangeRequest(
    val start: LocalDateTime,
    val end: LocalDateTime,
    val maxPersons: Int,
    val active: Boolean
) : BusinessObjectChangeRequest
