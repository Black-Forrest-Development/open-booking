package de.sambalmueslie.openbooking.offer


import de.sambalmueslie.openbooking.common.GenericCrudService
import de.sambalmueslie.openbooking.error.InvalidRequestException
import de.sambalmueslie.openbooking.offer.api.Offer
import de.sambalmueslie.openbooking.offer.api.OfferChangeRequest
import de.sambalmueslie.openbooking.offer.db.OfferData
import de.sambalmueslie.openbooking.offer.db.OfferRepository
import de.sambalmueslie.openbooking.util.TimeProvider
import jakarta.inject.Singleton
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import java.time.LocalDate

@Singleton
class OfferService(
    private val repository: OfferRepository,
    private val timeProvider: TimeProvider
) : GenericCrudService<Long, Offer, OfferChangeRequest, OfferData>(repository, logger) {


    companion object {
        private val logger: Logger = LoggerFactory.getLogger(OfferService::class.java)
    }

    override fun createData(request: OfferChangeRequest): OfferData {
        return OfferData.create(request, timeProvider.now())
    }

    override fun updateData(data: OfferData, request: OfferChangeRequest): OfferData {
        return data.update(request, timeProvider.now())
    }

    override fun isValid(request: OfferChangeRequest) {
        if (request.maxPersons <= 0) throw InvalidRequestException("Max Person for offer cannot be below or equals 0")
    }

    fun getOffer(date: LocalDate): List<Offer>{
        val start = date.atStartOfDay()
        val finish = date.atTime(23, 59, 59)
        return repository.findByStartGreaterThanEqualsAndFinishLessThanEqualsOrderByStart(start, finish).map { it.convert()}
    }


}
