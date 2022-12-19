package de.sambalmueslie.openbooking.booking


import de.sambalmueslie.openbooking.booking.api.Booking
import de.sambalmueslie.openbooking.booking.api.BookingChangeRequest
import de.sambalmueslie.openbooking.booking.db.BookingData
import de.sambalmueslie.openbooking.booking.db.BookingRepository
import de.sambalmueslie.openbooking.common.GenericCrudService
import de.sambalmueslie.openbooking.error.InvalidRequestException
import de.sambalmueslie.openbooking.group.VisitorGroupService
import de.sambalmueslie.openbooking.offer.OfferService
import de.sambalmueslie.openbooking.offer.api.Offer
import de.sambalmueslie.openbooking.util.TimeProvider
import jakarta.inject.Singleton
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import java.time.LocalDate

@Singleton
class BookingService(
    private val offerService: OfferService,
    private val visitorGroupService: VisitorGroupService,
    private val repository: BookingRepository,
    private val timeProvider: TimeProvider
) : GenericCrudService<Long, Booking, BookingChangeRequest, BookingData>(repository, logger) {

    companion object {
        private val logger: Logger = LoggerFactory.getLogger(BookingService::class.java)
    }

    override fun createData(request: BookingChangeRequest): BookingData {
        return BookingData.create(request, timeProvider.now())
    }

    override fun updateData(data: BookingData, request: BookingChangeRequest): BookingData {
        return data.update(request, timeProvider.now())
    }

    override fun isValid(request: BookingChangeRequest) {
        if(offerService.get(request.offerId) == null) throw InvalidRequestException("Cannot find offer (${request.offerId}) for booking")
        if(visitorGroupService.get(request.visitorGroupId) == null) throw InvalidRequestException("Cannot find visitor group (${request.visitorGroupId}) for booking")
    }

    fun getBookings(offer: List<Offer>): List<Booking> {
        val offerIds = offer.map { it.id }.toSet()
        return repository.findByOfferIdIn(offerIds).map { it.convert() }
    }
}
