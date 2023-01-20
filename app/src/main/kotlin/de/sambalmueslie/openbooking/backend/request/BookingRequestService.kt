package de.sambalmueslie.openbooking.backend.request


import de.sambalmueslie.openbooking.backend.booking.BookingService
import de.sambalmueslie.openbooking.backend.booking.api.Booking
import de.sambalmueslie.openbooking.backend.booking.api.BookingChangeRequest
import de.sambalmueslie.openbooking.backend.booking.api.BookingInfo
import de.sambalmueslie.openbooking.backend.group.VisitorGroupService
import de.sambalmueslie.openbooking.backend.group.api.VisitorGroup
import de.sambalmueslie.openbooking.backend.request.api.*
import de.sambalmueslie.openbooking.backend.request.db.BookingRequestData
import de.sambalmueslie.openbooking.backend.request.db.BookingRequestRelation
import de.sambalmueslie.openbooking.backend.request.db.BookingRequestRelationRepository
import de.sambalmueslie.openbooking.backend.request.db.BookingRequestRepository
import de.sambalmueslie.openbooking.common.*
import de.sambalmueslie.openbooking.config.AppConfig
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
    private val repository: BookingRequestRepository,
    private val relationRepository: BookingRequestRelationRepository,
    private val config: AppConfig,
    private val timeProvider: TimeProvider,
) : GenericCrudService<Long, BookingRequest, BookingRequestChangeRequest, BookingRequestData>(repository, logger) {

    companion object {
        private val logger: Logger = LoggerFactory.getLogger(BookingRequestService::class.java)
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
        isValid(request)
        val data = repository.save(createData(request))

        val bookings = request.offerIds.map { bookingService.create(BookingChangeRequest(it, data.visitorGroupId)) }
        val relations = bookings.map { BookingRequestRelation(it.id, data.id) }
        relationRepository.saveAll(relations)

        val result = data.convert()
        notifyCreated(result)
        return result
    }

    override fun createData(request: BookingRequestChangeRequest): BookingRequestData {
        val visitorGroup = visitorGroupService.create(request.visitorGroupChangeRequest)

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
        // intentionally left empty
    }

    override fun deleteDependencies(data: BookingRequestData) {
        val relations = relationRepository.getByBookingRequestId(data.id)
        relations.forEach { bookingService.delete(it.bookingId) }

        visitorGroupService.delete(data.visitorGroupId)

        relationRepository.deleteByBookingRequestId(data.id)
    }

    fun getUnconfirmed(pageable: Pageable): Page<BookingRequest> {
        return getUnconfirmedData(pageable).map { it.convert() }
    }

    fun getInfoUnconfirmed(pageable: Pageable): Page<BookingRequestInfo> {
        val data = getUnconfirmedData(pageable)

        val requestIds = data.content.map { it.id }
        val relations = relationRepository.getByBookingRequestIdIn(requestIds)
            .groupBy { it.bookingRequestId }
            .mapValues { it.value.map { it.bookingId } }
        val bookingIds = relations.values.map { it }.flatten().toSet()
        val bookings = bookingService.getBookingInfos(bookingIds).associateBy { it.id }

        val visitorGroupIds = data.content.map { it.visitorGroupId }.toSet()
        val visitorGroups = visitorGroupService.getVisitorGroups(visitorGroupIds).associateBy { it.id }

        return data.map { info(it, relations, bookings, visitorGroups) }

    }


    private fun info(request: BookingRequestData, relations: Map<Long, List<Long>>, bookings: Map<Long, BookingInfo>, visitorGroups: Map<Long, VisitorGroup>): BookingRequestInfo? {
        val visitorGroup = visitorGroups[request.visitorGroupId] ?: return null
        val relatedBookingIds = relations[request.id] ?: emptyList()
        val relatedBookings = relatedBookingIds.mapNotNull { bookings[it] }

        val timestamp = request.updated ?: request.created
        return BookingRequestInfo(request.id, visitorGroup, relatedBookings, request.status, request.comment, timestamp)
    }

    fun info(id: Long): BookingRequestInfo? {
        val data = repository.findByIdOrNull(id) ?: return null
        val relations = relationRepository.getByBookingRequestId(data.id)
        val bookings = bookingService.getBookingInfos(relations.map { it.bookingId }.toSet())
        val visitorGroup = visitorGroupService.get(data.visitorGroupId) ?: return null

        val timestamp = data.updated ?: data.created
        return BookingRequestInfo(data.id, visitorGroup, bookings, data.status, data.comment, timestamp)
    }


    private fun getUnconfirmedData(pageable: Pageable) = repository.findByStatusIn(listOf(BookingRequestStatus.UNKNOWN, BookingRequestStatus.UNCONFIRMED), pageable)

    fun confirm(key: String): GenericRequestResult {
        val request = repository.findOneByKey(key) ?: return GenericRequestResult(false, "REQUEST.MESSAGE.CONFIRM.FAILED")
        val relations = relationRepository.getByBookingRequestId(request.id)

        val bookingId = relations.firstOrNull()?.bookingId ?: return GenericRequestResult(false, "REQUEST.MESSAGE.CONFIRM.FAILED")
        return confirm(request.id, bookingId, false)
    }

    fun confirm(id: Long, bookingId: Long, silent: Boolean): GenericRequestResult {
        val relations = relationRepository.getByBookingRequestId(id)
        if (!relations.any { it.bookingId == bookingId }) return GenericRequestResult(false, "REQUEST.MESSAGE.CONFIRM.FAILED")

        val result = patchData(id) { it.setStatus(BookingRequestStatus.CONFIRMED, timeProvider.now()) }
            ?: return GenericRequestResult(false, "REQUEST.MESSAGE.CONFIRM.FAILED")

        relations.forEach {
            if (it.bookingId == bookingId) {
                bookingService.confirm(it.bookingId)
            } else {
                bookingService.denial(it.bookingId)
            }
        }


        listeners.forEachWithTryCatch { it.confirmed(result, silent) }
        return GenericRequestResult(true, "REQUEST.MESSAGE.CONFIRM.SUCCESS")
    }

    fun denial(id: Long, silent: Boolean): GenericRequestResult {
        val result = patchData(id) { it.setStatus(BookingRequestStatus.DENIED, timeProvider.now()) }
            ?: return GenericRequestResult(false, "REQUEST.MESSAGE.CONFIRM.FAILED")

        listeners.forEachWithTryCatch { it.denied(result, silent) }
        return GenericRequestResult(true, "REQUEST.MESSAGE.DENIAL.SUCCESS")
    }

    fun getConfirmationUrl(id: Long): String {
        val data = repository.findByIdOrNull(id) ?: return ""
        return "${config.baseUrl}/request/confirm/${data.key}"
    }


}
