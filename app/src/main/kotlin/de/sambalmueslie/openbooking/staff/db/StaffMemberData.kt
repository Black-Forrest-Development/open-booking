package de.sambalmueslie.openbooking.staff.db

import de.sambalmueslie.openbooking.common.DataObject
import de.sambalmueslie.openbooking.staff.api.StaffMember
import de.sambalmueslie.openbooking.staff.api.StaffMemberChangeRequest
import jakarta.persistence.*
import java.time.LocalDateTime

@Suppress("JpaObjectClassSignatureInspection")
@Entity(name = "StaffMember")
@Table(name = "staff_member")
data class StaffMemberData(
    @Id @GeneratedValue(strategy = GenerationType.SEQUENCE) var id: Long,
    @Column var firstName: String,
    @Column var lastName: String,
    @Column var email: String,
    @Column var phone: String,
    @Column var created: LocalDateTime,
    @Column var updated: LocalDateTime? = null,
) : DataObject<StaffMember> {
    companion object {
        fun create(request: StaffMemberChangeRequest, timestamp: LocalDateTime): StaffMemberData {
            return StaffMemberData(0, request.firstName, request.lastName, request.email, request.phone, timestamp)
        }
    }

    override fun convert() = StaffMember(id, firstName, lastName, email, phone)

    fun update(request: StaffMemberChangeRequest, timestamp: LocalDateTime): StaffMemberData {
        firstName = request.firstName
        lastName = request.lastName
        email = request.email
        phone = request.phone
        updated = timestamp
        return this
    }
}
