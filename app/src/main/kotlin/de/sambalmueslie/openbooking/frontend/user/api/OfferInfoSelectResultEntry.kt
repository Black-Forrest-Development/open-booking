package de.sambalmueslie.openbooking.frontend.user.api

import java.time.LocalDate

data class OfferInfoSelectResultEntry(
    val date: LocalDate,
    val infos: List<OfferInfo>
)
