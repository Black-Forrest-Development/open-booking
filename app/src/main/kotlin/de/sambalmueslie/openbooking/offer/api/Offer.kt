package de.sambalmueslie.openbooking.offer.api

import de.sambalmueslie.openbooking.common.BusinessObject
import java.time.LocalDateTime

data class Offer(
    override val id: Long,
    val start: LocalDateTime,
    val end: LocalDateTime,
    val maxPersons: Int,
    val active: Boolean
) : BusinessObject<Long>
