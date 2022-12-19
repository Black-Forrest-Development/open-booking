package de.sambalmueslie.openbooking.request


import de.sambalmueslie.openbooking.booking.BookingService
import de.sambalmueslie.openbooking.group.VisitorGroupService
import de.sambalmueslie.openbooking.request.api.BookingRequest
import de.sambalmueslie.openbooking.request.api.BookingRequestChangeRequest
import de.sambalmueslie.openbooking.request.api.BookingRequestStatus
import de.sambalmueslie.openbooking.request.db.BookingRequestData
import de.sambalmueslie.openbooking.request.db.BookingRequestRelation
import de.sambalmueslie.openbooking.request.db.BookingRequestRelationRepository
import de.sambalmueslie.openbooking.request.db.BookingRequestRepository
import de.sambalmueslie.openbooking.util.TimeProvider
import de.sambalmueslie.openbooking.util.findByIdOrNull
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

    fun get(id: Long): BookingRequest? {
        return repository.findByIdOrNull(id)?.convert()
    }

    fun getAll(pageable: Pageable): Page<BookingRequest> {
        return repository.findAll(pageable).map { it.convert() }
    }

    fun create(request: BookingRequestChangeRequest): BookingRequest {
        val visitorGroup = visitorGroupService.create(request.visitorGroupChangeRequest)

        val data = repository.save(BookingRequestData(0, BookingRequestStatus.UNKNOWN, visitorGroup.id,request.comment, timeProvider.now()))

        val bookings = request.bookings.mapNotNull { bookingService.create(it) }
        val relations = bookings.map { BookingRequestRelation(data.id, it.id) }
        relationRepository.saveAll(relations)

        return data.convert()
    }

    fun delete(id: Long) {
        val data = repository.findByIdOrNull(id) ?: return

        val relations = relationRepository.getByBookingRequestId(data.id)
        relations.forEach { bookingService.delete(it.bookingId) }

        relationRepository.deleteByBookingRequestId(data.id)
    }


}
