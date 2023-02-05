package de.sambalmueslie.openbooking.backend.request


import de.sambalmueslie.openbooking.backend.booking.BookingService
import de.sambalmueslie.openbooking.backend.booking.api.BookingInfo
import de.sambalmueslie.openbooking.backend.group.VisitorGroupService
import de.sambalmueslie.openbooking.backend.group.api.VisitorGroup
import de.sambalmueslie.openbooking.backend.request.api.BookingRequestInfo
import de.sambalmueslie.openbooking.backend.request.db.BookingRequestData
import de.sambalmueslie.openbooking.backend.request.db.BookingRequestRelationRepository
import io.micronaut.data.model.Page
import jakarta.inject.Singleton
import org.slf4j.Logger
import org.slf4j.LoggerFactory

@Singleton
class BookingInfoConverter(
    private val bookingService: BookingService,
    private val visitorGroupService: VisitorGroupService,
    private val relationRepository: BookingRequestRelationRepository,
) {

    companion object {
        private val logger: Logger = LoggerFactory.getLogger(BookingInfoConverter::class.java)
    }

    fun page(provider: () -> Page<BookingRequestData>): Page<BookingRequestInfo> {
        return info(provider.invoke())
    }

    fun data(provider: () -> BookingRequestData?): BookingRequestInfo? {
        val data = provider.invoke() ?: return null
        return info(data)
    }


    private fun info(data: Page<BookingRequestData>): Page<BookingRequestInfo> {
        val requestIds = data.content.map { it.id }
        val relations = relationRepository.getByBookingRequestIdIn(requestIds)
            .groupBy { it.bookingRequestId }
            .mapValues { it.value.map { it.bookingId } }
        val bookingIds = relations.values.map { it }.flatten().toSet()
        val bookings = bookingService.getBookingInfos(bookingIds).associateBy { it.id }

        val visitorGroupIds = data.content.map { it.visitorGroupId }.toSet()
        val visitorGroups = visitorGroupService.getVisitorGroups(visitorGroupIds).associateBy { it.id }

        val result = data.mapNotNull { info(it, relations, bookings, visitorGroups) }
            .sortedBy { it.visitorGroup.status.order }

        return Page.of(result, data.pageable, data.totalSize)
    }


    private fun info(request: BookingRequestData, relations: Map<Long, List<Long>>, bookings: Map<Long, BookingInfo>, visitorGroups: Map<Long, VisitorGroup>): BookingRequestInfo? {
        val visitorGroup = visitorGroups[request.visitorGroupId] ?: return null
        val relatedBookingIds = relations[request.id] ?: emptyList()
        val relatedBookings = relatedBookingIds.mapNotNull { bookings[it] }

        val timestamp = request.updated ?: request.created
        return BookingRequestInfo(request.id, visitorGroup, relatedBookings, request.status, request.comment, timestamp)
    }

    private fun info(data: BookingRequestData): BookingRequestInfo? {
        val relations = relationRepository.getByBookingRequestId(data.id)
        val bookings = bookingService.getBookingInfos(relations.map { it.bookingId }.toSet())
        val visitorGroup = visitorGroupService.get(data.visitorGroupId) ?: return null

        val timestamp = data.updated ?: data.created
        return BookingRequestInfo(data.id, visitorGroup, bookings, data.status, data.comment, timestamp)
    }

}
