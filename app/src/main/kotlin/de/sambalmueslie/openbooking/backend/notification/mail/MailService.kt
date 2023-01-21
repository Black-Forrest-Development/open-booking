package de.sambalmueslie.openbooking.backend.notification.mail


import de.sambalmueslie.openbooking.config.MailConfig
import io.micronaut.context.event.ApplicationEventListener
import io.micronaut.runtime.server.event.ServerStartupEvent
import jakarta.inject.Singleton
import org.simplejavamail.email.EmailBuilder
import org.simplejavamail.mailer.MailerBuilder
import org.slf4j.Logger
import org.slf4j.LoggerFactory

@Singleton
class MailService(
    private val config: MailConfig
) : ApplicationEventListener<ServerStartupEvent> {

    companion object {
        private val logger: Logger = LoggerFactory.getLogger(MailService::class.java)
    }

    private val mailer = MailerBuilder
        .withSMTPServer(config.server, config.port, config.username, config.password)
        .async()
        .buildMailer()

    override fun onApplicationEvent(event: ServerStartupEvent?) {
        mailer.testConnection(true)
    }

    fun send(mail: Mail, from: MailParticipant, to: List<MailParticipant>, bcc: List<MailParticipant> = emptyList()) {
        if (logger.isDebugEnabled) logger.debug("Send mail '${mail.subject}' to ${to.joinToString { it.address }}")
        val builder = EmailBuilder.startingBlank()
        to.forEach { builder.to(it.name, it.address) }
        bcc.forEach { builder.bcc(it.name, it.address) }
        builder.withReplyTo(config.replyToAddress)

        builder.withSubject(mail.subject)
        builder.from(from.name, from.address)
        mail.plainText?.let { builder.withPlainText(it) }
        mail.htmlText?.let { builder.withHTMLText(it) }

        val email = builder.buildEmail()
        mailer.sendMail(email, true)
    }

}
