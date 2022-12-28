package de.sambalmueslie.openbooking.frontend.user.api

import java.time.LocalDate

@Deprecated("use offer info from backend")
data class OfferInfoSelectResultEntry(
    val date: LocalDate,
    val infos: List<OfferInfo>
)
