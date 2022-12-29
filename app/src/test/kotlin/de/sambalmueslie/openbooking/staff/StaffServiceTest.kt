package de.sambalmueslie.openbooking.staff

import de.sambalmueslie.openbooking.backend.staff.StaffService
import de.sambalmueslie.openbooking.backend.staff.api.StaffMember
import de.sambalmueslie.openbooking.backend.staff.api.StaffMemberChangeRequest
import de.sambalmueslie.openbooking.common.TimeProvider
import io.micronaut.data.model.Pageable
import io.micronaut.test.annotation.MockBean
import io.micronaut.test.extensions.junit5.annotation.MicronautTest
import io.mockk.every
import io.mockk.mockk
import jakarta.inject.Inject
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test
import java.time.LocalDateTime

@MicronautTest
internal class StaffServiceTest {

    @Inject
    lateinit var service: StaffService

    private val timeProvider = mockk<TimeProvider>()

    @MockBean(TimeProvider::class)
    fun timeProvider() = timeProvider

    @Test
    fun checkCrud() {
        val now = LocalDateTime.of(2022, 10, 8, 20, 15, 0)
        every { timeProvider.now() } returns now

        // create
        val createRequest = StaffMemberChangeRequest("firstName", "lastName", "email", "phone", "mobile")
        var result = service.create(createRequest)

        var reference = StaffMember(result.id, createRequest.firstName, createRequest.lastName, createRequest.email, createRequest.phone, createRequest.mobile)
        assertEquals(reference, result)

        // read
        assertEquals(reference, service.get(reference.id))
        assertEquals(listOf(reference), service.getAll(Pageable.from(0)).content)

        // update
        val updateRequest = StaffMemberChangeRequest("update-firstName", "update-lastName", "update-email", "update-phone", "update-mobile")
        result = service.update(reference.id, updateRequest)

        reference = StaffMember(
            result.id,
            updateRequest.firstName,
            updateRequest.lastName,
            updateRequest.email,
            updateRequest.phone,
            updateRequest.mobile,
        )
        assertEquals(reference, result)

        // delete
        service.delete(reference.id)

        // read empty
        assertEquals(null, service.get(reference.id))
        assertEquals(emptyList<StaffMember>(), service.getAll(Pageable.from(0)).content)
    }

}
