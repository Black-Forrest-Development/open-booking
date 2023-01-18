package de.sambalmueslie.openbooking.backend.notification.handler


import de.sambalmueslie.openbooking.backend.notification.NotificationService
import de.sambalmueslie.openbooking.backend.notification.api.NotificationEvent
import de.sambalmueslie.openbooking.backend.notification.api.NotificationEventType
import de.sambalmueslie.openbooking.backend.request.BookingRequestService
import de.sambalmueslie.openbooking.backend.request.api.BookingRequest
import de.sambalmueslie.openbooking.common.BusinessObjectChangeListener
import io.micronaut.context.annotation.Context
import org.slf4j.Logger
import org.slf4j.LoggerFactory

@Context
class BookingRequestChangeHandler(
    source: BookingRequestService,
    private val service: NotificationService,
) : BusinessObjectChangeListener<Long, BookingRequest> {

    companion object {
        private val logger: Logger = LoggerFactory.getLogger(BookingRequestChangeHandler::class.java)
    }

    init {
        source.register(this)
    }

    override fun handleCreated(obj: BookingRequest) {
        service.add(NotificationEvent(obj.id, BookingRequest::class, NotificationEventType.OBJ_CREATED))
    }


}
