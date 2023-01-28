package de.sambalmueslie.openbooking.backend.mail.api

data class Mail(
    val subject: String,
    val htmlText: String?,
    val plainText: String?
)
