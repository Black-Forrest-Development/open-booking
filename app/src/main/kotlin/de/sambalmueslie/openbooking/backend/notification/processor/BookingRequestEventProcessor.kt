package de.sambalmueslie.openbooking.backend.notification.processor


import de.sambalmueslie.openbooking.backend.notification.NotificationTemplateEvaluator
import de.sambalmueslie.openbooking.backend.notification.api.NotificationEvent
import de.sambalmueslie.openbooking.backend.notification.api.NotificationEventType
import de.sambalmueslie.openbooking.backend.notification.api.NotificationTemplateType
import de.sambalmueslie.openbooking.backend.notification.mail.MailParticipant
import de.sambalmueslie.openbooking.backend.notification.mail.MailService
import de.sambalmueslie.openbooking.backend.request.BookingRequestService
import de.sambalmueslie.openbooking.backend.request.api.BookingRequest
import de.sambalmueslie.openbooking.backend.request.api.BookingRequestInfo
import de.sambalmueslie.openbooking.config.MailConfig
import jakarta.inject.Singleton
import org.slf4j.Logger
import org.slf4j.LoggerFactory

@Singleton
class BookingRequestEventProcessor(
    private val service: BookingRequestService,
    private val evaluator: NotificationTemplateEvaluator,
    private val mailService: MailService,
    private val config: MailConfig
) : NotificationEventProcessor {

    companion object {
        private val logger: Logger = LoggerFactory.getLogger(BookingRequestEventProcessor::class.java)
    }

    override fun process(event: NotificationEvent) {
        if (event.sourceType != BookingRequest::class) return
        when (event.type) {
            NotificationEventType.OBJ_CREATED -> handleCreated(event)
            else -> return
        }
    }

    private fun handleCreated(event: NotificationEvent) {
        val info = service.info(event.sourceId) ?: return

        val properties = mapOf(
            Pair("info", info)
        )

        notifyContactOnCreated(properties, info)
        notifyAdminsOnCreated(properties)
    }

    private fun notifyAdminsOnCreated(properties: Map<String, Any>) {
        val mails = evaluator.evaluate(NotificationTemplateType.BOOKING_REQUEST_CREATED_ADMIN, properties)
        // TODO collect admins together
        val from = MailParticipant("", config.fromAddress)
        val to = listOf(MailParticipant("", config.defaultAdminAddress))
        mails.forEach { mailService.send(it, from, to) }

    }

    private fun notifyContactOnCreated(properties: Map<String, Any>, info: BookingRequestInfo) {
        val mails = evaluator.evaluate(NotificationTemplateType.BOOKING_REQUEST_CREATED_CONTACT, properties)
        val from = MailParticipant("", config.fromAddress)
        val visitorGroup = info.visitorGroup
        val to = listOf(MailParticipant(visitorGroup.contact, visitorGroup.email))
        mails.forEach { mailService.send(it, from, to) }
    }


}
