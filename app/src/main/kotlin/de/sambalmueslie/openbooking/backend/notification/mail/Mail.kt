package de.sambalmueslie.openbooking.backend.notification.mail

data class Mail(
    val subject: String,
    val htmlText: String?,
    val plainText: String?,
    
)
