package de.sambalmueslie.openbooking.backend.info


import com.github.benmanes.caffeine.cache.Caffeine
import com.github.benmanes.caffeine.cache.LoadingCache
import de.sambalmueslie.openbooking.backend.booking.BookingService
import de.sambalmueslie.openbooking.backend.booking.api.Booking
import de.sambalmueslie.openbooking.backend.booking.api.BookingStatus
import de.sambalmueslie.openbooking.backend.cache.CacheService
import de.sambalmueslie.openbooking.backend.info.api.DateRangeSelectionRequest
import de.sambalmueslie.openbooking.backend.info.api.DayInfo
import de.sambalmueslie.openbooking.backend.info.api.DayInfoBooking
import de.sambalmueslie.openbooking.backend.info.api.DayInfoOffer
import de.sambalmueslie.openbooking.backend.offer.OfferService
import de.sambalmueslie.openbooking.backend.offer.api.Offer
import de.sambalmueslie.openbooking.common.BusinessObjectChangeListener
import de.sambalmueslie.openbooking.common.measureTimeMillisWithReturn
import io.micronaut.scheduling.annotation.Scheduled
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
    private val cacheService: CacheService
) {

    companion object {
        private val logger: Logger = LoggerFactory.getLogger(InfoService::class.java)
    }


    private val cache: LoadingCache<LocalDate, DayInfo> = cacheService.register(DayInfo::class){
        Caffeine.newBuilder()
            .maximumSize(100)
            .expireAfterWrite(1, TimeUnit.HOURS)
            .refreshAfterWrite(15, TimeUnit.MINUTES)
            .build { date -> createDayInfo(date) }
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

        offerService.register(object : BusinessObjectChangeListener<Long, Offer> {
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
        val key = offer.start.toLocalDate()
        cache.refresh(key)
        addCacheKey(key)
    }

    private val cacheKeysToRefresh = mutableSetOf<LocalDate>()

    @Synchronized
    private fun getCacheKeys(): List<LocalDate> {
        val keys = cacheKeysToRefresh.toList()
        cacheKeysToRefresh.clear()
        return keys
    }

    @Synchronized
    private fun addCacheKey(key: LocalDate) {
        cacheKeysToRefresh.add(key)
    }

    @Scheduled(cron = "0/10 * * * * ?")
    fun evictCache() {
        val keys = getCacheKeys()
        keys.forEach { cache.refresh(it) }
    }




    fun getDayInfoRange(request: DateRangeSelectionRequest): List<DayInfo> {
        val firstOffer = offerService.getFirstOffer(LocalDate.now()) ?: return emptyList()
        val lastOffer = offerService.getLastOffer(LocalDate.now()) ?: return emptyList()

        val from = if (firstOffer.start.toLocalDate().isAfter(request.from)) firstOffer.start.toLocalDate() else request.from
        val to = if (lastOffer.finish.toLocalDate().isBefore(request.to)) lastOffer.finish.toLocalDate() else request.to
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
        val (duration, data) = measureTimeMillisWithReturn {
            val offer = offerService.getOffer(date)
            if (offer.isEmpty()) return null

            val first = offer.first()
            val last = offer.last()

            val bookingsByOffer = bookingService.getBookings(offer).groupBy { it.offerId }
            val offerInfo = offer.map { createOfferInfo(it, bookingsByOffer) }

            DayInfo(date, first.start, last.finish, offerInfo)
        }
        logger.info("Cache refresh for $date done within $duration ms.")
        return data
    }


    private fun createOfferInfo(offer: Offer, bookingsByOffer: Map<Long, List<Booking>>): DayInfoOffer {
        val bookings = bookingsByOffer[offer.id] ?: emptyList()

        val bookingInfo = bookings.map { DayInfoBooking(it.size, it.status) }

        val bookingSpace = bookingInfo.groupBy { it.status }.mapValues { it.value.sumOf { b -> b.size } }.toMutableMap()
        BookingStatus.values().forEach { status -> if (!bookingSpace.containsKey(status)) bookingSpace[status] = 0 }

        return DayInfoOffer(offer, bookingSpace, bookingInfo)
    }


}
