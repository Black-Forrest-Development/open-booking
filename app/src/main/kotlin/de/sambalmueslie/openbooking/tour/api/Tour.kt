package de.sambalmueslie.openbooking.tour.api

import de.sambalmueslie.openbooking.common.BusinessObject
import java.time.LocalDateTime

data class Tour(
    override val id: Long,
    val timestamp: LocalDateTime,
) : BusinessObject<Long>
