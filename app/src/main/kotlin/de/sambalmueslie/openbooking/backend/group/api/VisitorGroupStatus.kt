package de.sambalmueslie.openbooking.backend.group.api

enum class VisitorGroupStatus(val order: Int) {
    UNKNOWN(2),
    UNCONFIRMED(1),
    CONFIRMED(0);
}
