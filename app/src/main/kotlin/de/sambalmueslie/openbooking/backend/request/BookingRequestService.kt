package de.sambalmueslie.openbooking.backend.request


import de.sambalmueslie.openbooking.backend.booking.BookingService
import de.sambalmueslie.openbooking.backend.booking.api.Booking
import de.sambalmueslie.openbooking.backend.booking.api.BookingChangeRequest
import de.sambalmueslie.openbooking.backend.booking.api.BookingStatus
import de.sambalmueslie.openbooking.backend.cache.CacheService
import de.sambalmueslie.openbooking.backend.group.VisitorGroupService
import de.sambalmueslie.openbooking.backend.group.api.VisitorGroupChangeRequest
import de.sambalmueslie.openbooking.backend.group.api.VisitorGroupStatus
import de.sambalmueslie.openbooking.backend.offer.OfferService
import de.sambalmueslie.openbooking.backend.offer.api.Offer
import de.sambalmueslie.openbooking.backend.request.api.*
import de.sambalmueslie.openbooking.backend.request.db.BookingRequestData
import de.sambalmueslie.openbooking.backend.request.db.BookingRequestRelation
import de.sambalmueslie.openbooking.backend.request.db.BookingRequestRelationRepository
import de.sambalmueslie.openbooking.backend.request.db.BookingRequestRepository
import de.sambalmueslie.openbooking.common.*
import de.sambalmueslie.openbooking.config.AppConfig
import de.sambalmueslie.openbooking.error.InvalidRequestException
import io.micronaut.data.model.Page
import io.micronaut.data.model.Pageable
import jakarta.inject.Singleton
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import java.util.*


@Singleton
class BookingRequestService(
    private val bookingService: BookingService,
    private val visitorGroupService: VisitorGroupService,
    private val offerService: OfferService,
    private val repository: BookingRequestRepository,
    private val relationRepository: BookingRequestRelationRepository,

    private val converter: BookingInfoConverter,
    private val filterService: BookingRequestFilterService,
    private val messageService: BookingRequestMessageService,
    private val changeService: BookingRequestChangeService,

    private val config: AppConfig,
    private val timeProvider: TimeProvider,
    cacheService: CacheService,
) : GenericCrudService<Long, BookingRequest, BookingRequestChangeRequest, BookingRequestData>(repository, cacheService, BookingRequest::class, logger) {

    companion object {
        private val logger: Logger = LoggerFactory.getLogger(BookingRequestService::class.java)
        const val MSG_CONFIRM_EMAIL_FAILED = "VISITOR_GROUP.Message.ConfirmEmailFailed"
        const val MSG_CONFIRM_EMAIL_SUCCEED = "VISITOR_GROUP.Message.ConfirmEmailSucceed"
        const val MSG_CONFIRM_REQUEST_FAILED = "REQUEST.MESSAGE.CONFIRM.FAILED"
        const val MSG_CONFIRM_REQUEST_SUCCESS = "REQUEST.MESSAGE.CONFIRM.SUCCESS"
        const val MSG_DENIAL_REQUEST_SUCCESS = "REQUEST.MESSAGE.DENIAL.SUCCESS"
        const val MSG_UPDATE_REQUEST_FAIL = "REQUEST.MESSAGE.UPDATE.FAIL"
        const val MSG_UPDATE_REQUEST_SUCCESS = "REQUEST.MESSAGE.UPDATE.SUCCESS"
    }

    private val listeners = mutableSetOf<BookingRequestChangeListener>()
    fun register(listener: BookingRequestChangeListener) {
        listeners.add(listener)
    }

    fun unregister(listener: BookingRequestChangeListener) {
        listeners.remove(listener)
    }


    init {
        bookingService.register(object : BusinessObjectChangeListener<Long, Booking> {
            override fun handleDeleted(obj: Booking) {
                relationRepository.deleteByBookingId(obj.id)
            }
        })
    }

    override fun create(request: BookingRequestChangeRequest): BookingRequest {
        val offerIds = request.offerIds.toSet()
        val existingBookings = bookingService.getBookingsByOfferId(offerIds).groupBy { it.offerId }
        val suitableOffers = offerService.getOffer(offerIds).filter {
            isEnoughSpaceAvailable(request.visitorGroupChangeRequest, it, existingBookings[it.id] ?: emptyList())
        }
        if (suitableOffers.isEmpty()) throw InvalidRequestException("REQUEST.Error.NoSuitableOffer")

        isValid(request)
        val data = repository.save(createData(request))

        val bookings = suitableOffers.map { bookingService.create(BookingChangeRequest(it.id, data.visitorGroupId)) }
        val relations = bookings.map { BookingRequestRelation(it.id, data.id) }
        relationRepository.saveAll(relations)

        val result = data.convert()
        notifyCreated(result)
        return result
    }

    private fun isEnoughSpaceAvailable(request: VisitorGroupChangeRequest, offer: Offer, bookings: List<Booking>): Boolean {
        if (bookings.isEmpty()) return true

        val spaceConfirmed = bookings.filter { it.status == BookingStatus.CONFIRMED || it.status == BookingStatus.UNCONFIRMED }.sumOf { it.size }
        val spaceAvailable = offer.maxPersons - spaceConfirmed

        return spaceAvailable >= request.size
    }

    override fun createData(request: BookingRequestChangeRequest): BookingRequestData {
        val visitorGroup = visitorGroupService.create(request.visitorGroupChangeRequest)
        if (request.autoConfirm) {
            visitorGroupService.confirm(visitorGroup.id)
        }

        val key = UUID.randomUUID().toString().uppercase(Locale.getDefault())
        return BookingRequestData(0, key, BookingRequestStatus.UNCONFIRMED, visitorGroup.id, request.comment, timeProvider.now())
    }


    override fun update(id: Long, request: BookingRequestChangeRequest): BookingRequest {
        TODO("Not yet implemented")
    }

    override fun updateData(data: BookingRequestData, request: BookingRequestChangeRequest): BookingRequestData {
        TODO("Not yet implemented")
    }

    override fun isValid(request: BookingRequestChangeRequest) {
        visitorGroupService.isValid(request.visitorGroupChangeRequest)
    }

    override fun deleteDependencies(data: BookingRequestData) {
        val relations = relationRepository.getByBookingRequestId(data.id)
        relations.forEach { bookingService.delete(it.bookingId) }

        visitorGroupService.delete(data.visitorGroupId)

        relationRepository.deleteByBookingRequestId(data.id)
    }

    fun getUnconfirmed(pageable: Pageable): Page<BookingRequest> = filterService.getUnconfirmedData(pageable).map { it.convert() }
    fun getInfoUnconfirmed(pageable: Pageable) = converter.page { filterService.getUnconfirmedData(pageable) }
    fun filterInfoUnconfirmed(filter: BookingRequestFilterRequest, pageable: Pageable) = converter.page { filterService.filterInfoUnconfirmed(filter, pageable) }


    fun confirmEmail(key: String): GenericRequestResult {
        val request = repository.findOneByKey(key) ?: return GenericRequestResult(false, MSG_CONFIRM_EMAIL_FAILED)
        val visitorGroupId = request.visitorGroupId
        val result = visitorGroupService.confirm(visitorGroupId) ?: return GenericRequestResult(false, MSG_CONFIRM_EMAIL_FAILED)

        return when (result.status == VisitorGroupStatus.CONFIRMED) {
            true -> GenericRequestResult(true, MSG_CONFIRM_EMAIL_SUCCEED)
            else -> GenericRequestResult(false, MSG_CONFIRM_EMAIL_FAILED)
        }

    }

    fun confirm(id: Long, bookingId: Long, content: BookingConfirmationContent): GenericRequestResult {
        val relations = relationRepository.getByBookingRequestId(id)
        if (!relations.any { it.bookingId == bookingId }) return GenericRequestResult(false, MSG_CONFIRM_REQUEST_FAILED)

        val result = patchData(id) { it.setStatus(BookingRequestStatus.CONFIRMED, timeProvider.now()) }
            ?: return GenericRequestResult(false, MSG_CONFIRM_REQUEST_FAILED)

        relations.forEach {
            if (it.bookingId == bookingId) {
                bookingService.confirm(it.bookingId)
            } else {
                bookingService.denial(it.bookingId)
            }
        }


        listeners.forEachWithTryCatch { it.confirmed(result, content) }
        return GenericRequestResult(true, MSG_CONFIRM_REQUEST_SUCCESS)
    }

    fun deny(id: Long, content: BookingConfirmationContent): GenericRequestResult {
        val result = patchData(id) { it.setStatus(BookingRequestStatus.DENIED, timeProvider.now()) }
            ?: return GenericRequestResult(false, MSG_CONFIRM_REQUEST_FAILED)

        val relations = relationRepository.getByBookingRequestId(id)
        relations.forEach { bookingService.denial(it.bookingId) }

        listeners.forEachWithTryCatch { it.denied(result, content) }
        return GenericRequestResult(true, MSG_DENIAL_REQUEST_SUCCESS)
    }

    fun getConfirmationUrl(id: Long): String {
        val data = repository.findByIdOrNull(id) ?: return ""
        return "${config.baseUrl}/home/confirm/email/${data.key}"
    }

    fun getRequestReceivedMessage(id: Long, lang: String = "de") = messageService.getRequestReceivedMessage(id, lang)
    fun getConfirmationMessage(id: Long, bookingId: Long, lang: String = "de") = messageService.getConfirmationMessage(id, bookingId, lang)
    fun getDenialMessage(id: Long, lang: String = "de") = messageService.getDenialMessage(id, lang)

    fun getInfoByBookingId(bookingId: Long): BookingRequestInfo? {
        val relations = relationRepository.getByBookingId(bookingId)
        val requestId = relations.map { it.bookingRequestId }.toSet().firstOrNull() ?: return null
        return converter.data { repository.findByIdOrNull(requestId) }
    }

    fun updateVisitorGroup(id: Long, request: VisitorGroupChangeRequest) = changeService.updateVisitorGroup(id, request)

    fun info(id: Long) = converter.data { repository.findByIdOrNull(id) }
    fun setComment(id: Long, value: String): BookingRequest? {
        return patchData(id) { it.setComment(value, timeProvider.now()) }
    }

}
