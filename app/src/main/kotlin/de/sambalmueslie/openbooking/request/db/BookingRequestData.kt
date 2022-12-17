package de.sambalmueslie.openbooking.request.db

import de.sambalmueslie.openbooking.common.DataObject
import de.sambalmueslie.openbooking.request.api.BookingRequest
import de.sambalmueslie.openbooking.request.api.BookingRequestStatus
import jakarta.persistence.*
import java.time.LocalDateTime

@Suppress("JpaObjectClassSignatureInspection")
@Entity(name = "BookingRequest")
@Table(name = "booking_request")
data class BookingRequestData(
    @Id @GeneratedValue(strategy = GenerationType.SEQUENCE) var id: Long,
    @Column @Enumerated(EnumType.STRING) var status: BookingRequestStatus,

    @Column var visitorGroupId: Long,
    @Column var created: LocalDateTime,
    @Column var updated: LocalDateTime? = null,
) : DataObject<BookingRequest> {


    override fun convert() = BookingRequest(id, status)

}

