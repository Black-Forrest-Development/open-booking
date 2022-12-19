package de.sambalmueslie.openbooking.backend.booking.db

import de.sambalmueslie.openbooking.backend.booking.api.Booking
import de.sambalmueslie.openbooking.backend.booking.api.BookingChangeRequest
import de.sambalmueslie.openbooking.backend.booking.api.BookingStatus
import de.sambalmueslie.openbooking.common.DataObject
import jakarta.persistence.*
import java.time.LocalDateTime

@Suppress("JpaObjectClassSignatureInspection")
@Entity(name = "Booking")
@Table(name = "booking")
data class BookingData(
    @Id @GeneratedValue(strategy = GenerationType.SEQUENCE) var id: Long,
    @Column var offerId: Long,
    @Column var visitorGroupId: Long,
    @Column @Enumerated(EnumType.STRING) var status: BookingStatus,
    @Column var created: LocalDateTime,
    @Column var updated: LocalDateTime? = null,
) : DataObject<Booking> {
    companion object {
        fun create(request: BookingChangeRequest, timestamp: LocalDateTime): BookingData {
            return BookingData(0, request.offerId, request.visitorGroupId, BookingStatus.UNKNOWN, timestamp)
        }
    }

    override fun convert() = Booking(id, offerId, visitorGroupId, status)

    fun update(request: BookingChangeRequest, timestamp: LocalDateTime): BookingData {
        offerId = request.offerId
        visitorGroupId = request.visitorGroupId
        updated = timestamp
        return this
    }

    fun update(status: BookingStatus, timestamp: LocalDateTime): BookingData {
        this.status = status
        updated = timestamp
        return this
    }
}
