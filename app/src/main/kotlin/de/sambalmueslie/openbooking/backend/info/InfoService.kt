package de.sambalmueslie.openbooking.backend.info


import de.sambalmueslie.openbooking.backend.booking.BookingService
import de.sambalmueslie.openbooking.backend.booking.api.Booking
import de.sambalmueslie.openbooking.backend.info.api.DateRangeSelectionRequest
import de.sambalmueslie.openbooking.backend.info.api.DayInfo
import de.sambalmueslie.openbooking.backend.offer.OfferService
import de.sambalmueslie.openbooking.backend.offer.api.Offer
import de.sambalmueslie.openbooking.common.BusinessObjectChangeListener
import io.micronaut.scheduling.annotation.Scheduled
import jakarta.inject.Singleton
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import java.time.LocalDate
import java.time.temporal.ChronoUnit


@Singleton
class InfoService(
    private val offerService: OfferService,
    bookingService: BookingService,
    private val cache: InfoCache
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
        val now = LocalDate.now()
        val firstOffer = offerService.getFirstOffer(listOf(request.from, now).min()) ?: offerService.getFirstOffer() ?: return emptyList()
        val lastOffer = offerService.getLastOffer(listOf(request.to, now).min()) ?: offerService.getLastOffer() ?: return emptyList()

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


}
