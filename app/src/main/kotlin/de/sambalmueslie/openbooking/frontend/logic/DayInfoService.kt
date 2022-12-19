package de.sambalmueslie.openbooking.frontend.logic


import de.sambalmueslie.openbooking.backend.booking.BookingService
import de.sambalmueslie.openbooking.frontend.api.DayInfo
import de.sambalmueslie.openbooking.backend.group.VisitorGroupService
import de.sambalmueslie.openbooking.backend.offer.OfferService
import jakarta.inject.Singleton
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import java.time.LocalDate

@Singleton
class DayInfoService(
    private val offerService: OfferService,
    private val bookingService: BookingService,
    private val visitorGroupService: VisitorGroupService
) {
    companion object {
        private val logger: Logger = LoggerFactory.getLogger(DayInfoService::class.java)
        private const val DEFAULT_DAY_INFO_AMOUNT = 7
    }

    fun getDefaultDayInfo(): List<DayInfo> {
        return getDayInfo(LocalDate.now(), DEFAULT_DAY_INFO_AMOUNT)
    }

    fun getDayInfo(date: LocalDate, amount: Int): List<DayInfo> {
        return (0 until amount).map { getDayInfo(date) }
    }


    private fun getDayInfo(date: LocalDate): DayInfo {
        val offer = offerService.getOffer(date)
        if (offer.isEmpty()) return DayInfo(date, null, null, 0, emptyMap())

        val first = offer.first()
        val last = offer.last()
        val bookings = bookingService.getBookings(offer)
        val visitorGroups = visitorGroupService.get(bookings).associateBy { it.id }

        val totalAmountOfSpace = offer.sumOf { it.maxPersons }
        val bookedAmountOfSpace = bookings
            .groupBy { it.status }
            .mapValues { it.value.sumOf { b -> visitorGroups[b.visitorGroupId]?.size ?: 0 } }
        return DayInfo(date, first.start, last.end, totalAmountOfSpace, bookedAmountOfSpace)
    }

}
