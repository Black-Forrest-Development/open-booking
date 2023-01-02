package de.sambalmueslie.openbooking.backend.request


import de.sambalmueslie.openbooking.backend.booking.BookingService
import de.sambalmueslie.openbooking.backend.booking.api.Booking
import de.sambalmueslie.openbooking.backend.booking.api.BookingChangeRequest
import de.sambalmueslie.openbooking.backend.group.VisitorGroupService
import de.sambalmueslie.openbooking.backend.request.api.BookingRequest
import de.sambalmueslie.openbooking.backend.request.api.BookingRequestChangeRequest
import de.sambalmueslie.openbooking.backend.request.api.BookingRequestStatus
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

        relationRepository.deleteByBookingRequestId(data.id)
        return data.convert()
    }



}
