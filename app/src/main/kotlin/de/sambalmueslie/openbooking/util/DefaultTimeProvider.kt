package de.sambalmueslie.openbooking.util

import jakarta.inject.Singleton
import java.time.LocalDateTime
import java.time.ZoneOffset

@Singleton
class DefaultTimeProvider : TimeProvider{
    override fun now(): LocalDateTime {
        return LocalDateTime.now(ZoneOffset.UTC)
    }
}
