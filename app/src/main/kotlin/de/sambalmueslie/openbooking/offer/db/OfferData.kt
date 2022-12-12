package de.sambalmueslie.openbooking.offer.db

import de.sambalmueslie.openbooking.common.DataObject
import de.sambalmueslie.openbooking.offer.api.Offer
import de.sambalmueslie.openbooking.offer.api.OfferChangeRequest
import jakarta.persistence.*
import java.time.LocalDateTime


@Suppress("JpaObjectClassSignatureInspection")
@Entity(name = "Offer")
@Table(name = "offer")
data class OfferData(
    @Id @GeneratedValue(strategy = GenerationType.SEQUENCE) var id: Long,
    @Column var start: LocalDateTime,
    @Column var end: LocalDateTime,
    @Column var maxPersons: Int,
    @Column var active: Boolean,
    @Column var created: LocalDateTime,
    @Column var updated: LocalDateTime? = null,
) : DataObject<Offer> {
    companion object {
        fun create(request: OfferChangeRequest, timestamp: LocalDateTime): OfferData {
            return OfferData(0, request.start, request.end, request.maxPersons, request.active, timestamp)
        }
    }

    override fun convert() = Offer(id, start, end, maxPersons, active)

    fun update(request: OfferChangeRequest, timestamp: LocalDateTime): OfferData {
        start = request.start
        end = request.end
        maxPersons = request.maxPersons
        active = request.active
        updated = timestamp
        return this
    }
}
