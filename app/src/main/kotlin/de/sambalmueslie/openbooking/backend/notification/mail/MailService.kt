package de.sambalmueslie.openbooking.backend.notification.mail


import de.sambalmueslie.openbooking.config.MailConfig
import io.micronaut.context.annotation.Requires
import io.micronaut.context.env.Environment
import jakarta.inject.Singleton
import org.simplejavamail.email.EmailBuilder
import org.simplejavamail.mailer.MailerBuilder
import org.slf4j.Logger
import org.slf4j.LoggerFactory

@Singleton
@Requires(notEnv = [Environment.TEST])
class MailService(
    private val config: MailConfig
) : MailClient {

    companion object {
        private val logger: Logger = LoggerFactory.getLogger(MailService::class.java)
    }

    private val mailer = MailerBuilder
        .withSMTPServer(config.server, config.port, config.username, config.password)
        .async()
        .buildMailer()


    override fun send(mail: Mail, from: MailParticipant, to: List<MailParticipant>, bcc: List<MailParticipant>) {
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
