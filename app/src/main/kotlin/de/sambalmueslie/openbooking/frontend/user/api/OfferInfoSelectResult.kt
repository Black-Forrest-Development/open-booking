package de.sambalmueslie.openbooking.frontend.user.api


import java.time.LocalDate

data class OfferInfoSelectResult(
    val offers: Map<LocalDate, List<OfferInfo>>
)
