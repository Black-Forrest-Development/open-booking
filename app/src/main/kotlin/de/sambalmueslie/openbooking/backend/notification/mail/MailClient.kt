package de.sambalmueslie.openbooking.backend.notification.mail

interface MailClient {
    fun send(mail: Mail, from: MailParticipant, to: List<MailParticipant>, bcc: List<MailParticipant> = emptyList())
}
