package de.sambalmueslie.openbooking.backend.info


import com.github.benmanes.caffeine.cache.Caffeine
import com.github.benmanes.caffeine.cache.LoadingCache
import de.sambalmueslie.openbooking.backend.booking.BookingService
import de.sambalmueslie.openbooking.backend.booking.api.Booking
import de.sambalmueslie.openbooking.backend.booking.api.BookingStatus
import de.sambalmueslie.openbooking.backend.group.VisitorGroupService
import de.sambalmueslie.openbooking.backend.group.api.VisitorGroup
import de.sambalmueslie.openbooking.backend.info.api.BookingInfo
import de.sambalmueslie.openbooking.backend.info.api.DateRangeSelectionRequest
import de.sambalmueslie.openbooking.backend.info.api.DayInfo
import de.sambalmueslie.openbooking.backend.info.api.OfferInfo
import de.sambalmueslie.openbooking.backend.offer.OfferService
import de.sambalmueslie.openbooking.backend.offer.api.Offer
import de.sambalmueslie.openbooking.common.BusinessObjectChangeListener
import jakarta.inject.Singleton
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import java.time.LocalDate
import java.time.temporal.ChronoUnit
import java.util.concurrent.TimeUnit


@Singleton
class InfoService(
    private val offerService: OfferService,
    private val bookingService: BookingService,
    private val visitorGroupService: VisitorGroupService
) {

    companion object {
        private val logger: Logger = LoggerFactory.getLogger(InfoService::class.java)
    }

    init {
        bookingService.register(object : BusinessObjectChangeListener<Long, Booking> {
            override fun handleCreated(obj: Booking) {
                updateCache(obj)
            }

            override fun handleUpdated(obj: Booking) {
                updateCache(obj)
            }

            override fun handleDeleted(obj: Booking) {
                updateCache(obj)
            }
        })

        offerService.register(object : BusinessObjectChangeListener<Long,Offer> {
            override fun handleCreated(obj: Offer) {
                updateCache(obj)
            }

            override fun handleUpdated(obj: Offer) {
                updateCache(obj)
            }

            override fun handleDeleted(obj: Offer) {
                updateCache(obj)
            }
        })
    }

    private fun updateCache(booking: Booking) {
        logger.info("Update cache for booking ${booking.id}")
        val offer = offerService.get(booking.offerId) ?: return
        updateCache(offer)
    }

    private fun updateCache(offer: Offer) {
        logger.info("Update cache for offer ${offer.id}")
        cache.refresh(offer.start.toLocalDate())
    }

    private val cache: LoadingCache<LocalDate, DayInfo> = Caffeine.newBuilder()
        .maximumSize(100)
        .expireAfterWrite(1, TimeUnit.HOURS)
        .build { date -> createDayInfo(date) }


    fun getDayInfoRange(request: DateRangeSelectionRequest): List<DayInfo> {
        val firstOffer = offerService.getFirstOffer(LocalDate.now()) ?: return emptyList()
        val lastOffer = offerService.getLastOffer(LocalDate.now()) ?: return emptyList()

        val from = if (firstOffer.start.toLocalDate().isAfter(request.from)) firstOffer.start.toLocalDate() else request.from
        val to = if (lastOffer.end.toLocalDate().isBefore(request.to)) lastOffer.end.toLocalDate() else request.to
        val days = ChronoUnit.DAYS.between(from, to)
        return getDayInfo(from, days.toInt())
    }

    private fun getDayInfo(date: LocalDate, amount: Int): List<DayInfo> {
        return (0..amount).mapNotNull { getDayInfo(date.plusDays(it.toLong())) }
    }

    fun getDayInfo(date: LocalDate): DayInfo? {
        return cache[date]
    }

    private fun createDayInfo(date: LocalDate): DayInfo? {
        val offer = offerService.getOffer(date)
        if (offer.isEmpty()) return null

        val first = offer.first()
        val last = offer.last()

        val bookingsByOffer = bookingService.getBookings(offer).groupBy { it.offerId }

        val offerInfo = offer.map { createOfferInfo(it,bookingsByOffer) }

        return DayInfo(date, first.start, last.end, offerInfo)
    }


    private fun createOfferInfo(offer: Offer, bookingsByOffer: Map<Long, List<Booking>>): OfferInfo {
        val bookings = bookingsByOffer[offer.id] ?: emptyList()
        val visitorGroups = visitorGroupService.get(bookings).associateBy { it.id }

        val bookingInfo = bookings.mapNotNull { createBookingInfo(it, visitorGroups[it.visitorGroupId]) }

        val bookingSpace = bookingInfo.groupBy { it.status }.mapValues { it.value.sumOf { b-> b.size } }

        val amountOfSpaceTotal = offer.maxPersons
        val amountOfSpaceConfirmed = bookingSpace[BookingStatus.CONFIRMED] ?: 0
        val amountOfSpaceUnconfirmed = bookingSpace[BookingStatus.UNCONFIRMED] ?: 0
        val amountOfSpaceAvailable = amountOfSpaceTotal - amountOfSpaceConfirmed - amountOfSpaceUnconfirmed

        return OfferInfo(offer, amountOfSpaceTotal, amountOfSpaceAvailable, amountOfSpaceConfirmed, amountOfSpaceUnconfirmed, bookingInfo)
    }


    private fun createBookingInfo(booking: Booking, visitorGroup: VisitorGroup?): BookingInfo? {
        if(visitorGroup == null) return null
        return BookingInfo(visitorGroup.size, booking.status)
    }

}
