package de.sambalmueslie.openbooking.backend.notification.processor


import de.sambalmueslie.openbooking.backend.group.api.VisitorGroupStatus
import de.sambalmueslie.openbooking.backend.notification.NotificationTemplateEvaluator
import de.sambalmueslie.openbooking.backend.notification.api.NotificationEvent
import de.sambalmueslie.openbooking.backend.notification.api.NotificationEventType
import de.sambalmueslie.openbooking.backend.notification.api.NotificationTemplateType
import de.sambalmueslie.openbooking.backend.notification.handler.BookingRequestChangeHandler
import de.sambalmueslie.openbooking.backend.notification.mail.Mail
import de.sambalmueslie.openbooking.backend.notification.mail.MailParticipant
import de.sambalmueslie.openbooking.backend.notification.mail.MailService
import de.sambalmueslie.openbooking.backend.request.BookingRequestService
import de.sambalmueslie.openbooking.backend.request.api.BookingConfirmationContent
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
            NotificationEventType.CUSTOM -> handleCustom(event)
            else -> return
        }
    }

    private fun handleCustom(event: NotificationEvent) {
        val type = event.parameter[BookingRequestChangeHandler.TYPE_KEY] ?: return logger.warn("Cannot find ${BookingRequestChangeHandler.TYPE_KEY} on custom notification event")

        val info = service.info(event.sourceId) ?: return
        val content = event.parameter[BookingRequestChangeHandler.CONTENT] as? BookingConfirmationContent ?: BookingConfirmationContent("","", false)
        val properties = mapOf(
            Pair("info", info),
            Pair("content", content),
        )
        when (type) {
            BookingRequestChangeHandler.TYPE_CONFIRMED -> notifyContactOnConfirmed(properties, info)
            BookingRequestChangeHandler.TYPE_DENIED -> notifyContactOnDenied(properties, info)
        }
    }


    private fun handleCreated(event: NotificationEvent) {
        val info = service.info(event.sourceId) ?: return
        val url = if (info.visitorGroup.status == VisitorGroupStatus.CONFIRMED) "" else service.getConfirmationUrl(event.sourceId)

        val properties = mapOf(
            Pair("info", info),
            Pair("url", url)
        )

        notifyContactOnCreated(properties, info)
        notifyAdminsOnCreated(properties)
    }

    private fun notifyAdminsOnCreated(properties: Map<String, Any>) {
        val mails = evaluator.evaluate(NotificationTemplateType.BOOKING_REQUEST_CREATED_ADMIN, properties)
        val from = MailParticipant("", config.fromAddress)
        val to = listOf(MailParticipant("", config.defaultAdminAddress))
        mails.forEach { mailService.send(it, from, to) }

    }

    private fun notifyContactOnCreated(properties: Map<String, Any>, info: BookingRequestInfo) {
        val mails = evaluator.evaluate(NotificationTemplateType.BOOKING_REQUEST_CREATED_CONTACT, properties)
        notifyContact(mails, info)
    }

    private fun notifyContactOnConfirmed(properties: Map<String, Any>, info: BookingRequestInfo) {
        val mails = evaluator.evaluate(NotificationTemplateType.BOOKING_REQUEST_CONFIRMED_CONTACT, properties)
        notifyContact(mails, info)
    }

    private fun notifyContactOnDenied(properties: Map<String, Any>, info: BookingRequestInfo) {
        val mails = evaluator.evaluate(NotificationTemplateType.BOOKING_REQUEST_DENIED_CONTACT, properties)
        notifyContact(mails, info)
    }

    private fun notifyContact(mails: List<Mail>, info: BookingRequestInfo) {
        val from = MailParticipant("", config.fromAddress)
        val visitorGroup = info.visitorGroup
        val to = listOf(MailParticipant(visitorGroup.contact, visitorGroup.email))
        mails.forEach { mailService.send(it, from, to) }
    }


}
