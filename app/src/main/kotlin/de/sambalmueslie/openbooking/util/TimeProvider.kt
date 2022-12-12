package de.sambalmueslie.openbooking.util

import java.time.LocalDateTime

interface TimeProvider {
    fun now(): LocalDateTime
}
