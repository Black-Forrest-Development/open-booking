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
import de.sambalmueslie.openbooking.common.BusinessObjectChangeListener
import de.sambalmueslie.openbooking.common.TimeProvider
import de.sambalmueslie.openbooking.common.findByIdOrNull
import io.micronaut.data.model.Page
import io.micronaut.data.model.Pageable
import jakarta.inject.Singleton
import org.slf4j.Logger
import org.slf4j.LoggerFactory

@Singleton
class BookingRequestService(
    private val bookingService: BookingService,
    private val visitorGroupService: VisitorGroupService,
    private val repository: BookingRequestRepository,
    private val relationRepository: BookingRequestRelationRepository,
    private val timeProvider: TimeProvider
) {

    companion object {
        private val logger: Logger = LoggerFactory.getLogger(BookingRequestService::class.java)
    }

    init {
        bookingService.register(object : BusinessObjectChangeListener<Long, Booking> {
            override fun handleDeleted(obj: Booking) {
                relationRepository.deleteByBookingId(obj.id)
            }
        })
    }


    fun get(id: Long): BookingRequest? {
        return repository.findByIdOrNull(id)?.convert()
    }

    fun getAll(pageable: Pageable): Page<BookingRequest> {
        return repository.findAll(pageable).map { it.convert() }
    }

    fun create(request: BookingRequestChangeRequest): BookingRequest {
        val visitorGroup = visitorGroupService.create(request.visitorGroupChangeRequest)

        val data = repository.save(BookingRequestData(0, BookingRequestStatus.UNKNOWN, visitorGroup.id, request.comment, timeProvider.now()))

        val bookings = request.offerIds.map { bookingService.create(BookingChangeRequest(it, visitorGroup.id)) }
        val relations = bookings.map { BookingRequestRelation(it.id, data.id) }
        relationRepository.saveAll(relations)

        return data.convert()
    }

    fun update(id: Long, request: BookingRequestChangeRequest): BookingRequest {
        TODO("Not yet implemented")
    }

    fun delete(id: Long): BookingRequest? {
        val data = repository.findByIdOrNull(id) ?: return null

        val relations = relationRepository.getByBookingRequestId(data.id)
        relations.forEach { bookingService.delete(it.bookingId) }

        visitorGroupService.delete(data.visitorGroupId)

        relationRepository.deleteByBookingRequestId(data.id)
        repository.delete(data)

        return data.convert()
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


    private fun getUnconfirmedData(pageable: Pageable) = repository.findByStatusIn(listOf(BookingRequestStatus.UNKNOWN, BookingRequestStatus.UNCONFIRMED), pageable)
    fun confirm(id: Long, bookingId: Long): BookingRequestChangeResult {
        val data = repository.findByIdOrNull(id) ?: return BookingRequestChangeResult(false, "REQUEST.MESSAGE.CONFIRM.FAILED")

        val relations = relationRepository.getByBookingRequestId(data.id)
        if(!relations.any { it.bookingId == bookingId }) return BookingRequestChangeResult(false, "REQUEST.MESSAGE.CONFIRM.FAILED")

        relationRepository.deleteByBookingRequestId(data.id)
        repository.delete(data)

        relations.forEach {
            if (it.bookingId == bookingId) {
                bookingService.confirm(it.bookingId)
            } else {
                bookingService.denial(it.bookingId)
            }
        }


        return BookingRequestChangeResult(true, "REQUEST.MESSAGE.CONFIRM.SUCCESS")
    }

    fun denial(id: Long): BookingRequestChangeResult {
        delete(id)
        return BookingRequestChangeResult(true, "REQUEST.MESSAGE.DENIAL.SUCCESS")
    }


}
