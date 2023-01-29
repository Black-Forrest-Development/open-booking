package de.sambalmueslie.openbooking.group

import de.sambalmueslie.openbooking.backend.group.VisitorGroupService
import de.sambalmueslie.openbooking.backend.group.api.Address
import de.sambalmueslie.openbooking.backend.group.api.VisitorGroup
import de.sambalmueslie.openbooking.backend.group.api.VisitorGroupChangeRequest
import de.sambalmueslie.openbooking.backend.group.api.VisitorGroupStatus
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
internal class VisitorGroupServiceTest {

    @Inject
    lateinit var service: VisitorGroupService

    private val timeProvider = mockk<TimeProvider>()

    @MockBean(TimeProvider::class)
    fun timeProvider() = timeProvider

    @Test
    fun checkCrud() {
        val now = LocalDateTime.of(2022, 10, 8, 20, 15, 0)
        every { timeProvider.now() } returns now

        // create
        val createRequest = VisitorGroupChangeRequest("title", 1, 2, 3, "contact", Address("street", "city", "zip"), "phone", "email")
        var result = service.create(createRequest)

        var reference = VisitorGroup(
            result.id, createRequest.title, createRequest.size, createRequest.minAge, createRequest.maxAge, createRequest.contact,
            createRequest.address, createRequest.phone, createRequest.email, VisitorGroupStatus.UNKNOWN
        )
        assertEquals(reference, result)

        // read
        assertEquals(reference, service.get(reference.id))
        assertEquals(listOf(reference), service.getAll(Pageable.from(0)).content)

        // update
        val updateRequest = VisitorGroupChangeRequest("update-title", 10, 20, 30, "update-contact", Address("update-street", "update-city", "update-zip"), "update-phone", "update-email")
        result = service.update(reference.id, updateRequest)

        reference = VisitorGroup(
            result.id,
            updateRequest.title,
            updateRequest.size,
            updateRequest.minAge,
            updateRequest.maxAge,
            updateRequest.contact,
            updateRequest.address,
            updateRequest.phone,
            updateRequest.email,
            VisitorGroupStatus.UNKNOWN
        )
        assertEquals(reference, result)

        // delete
        service.delete(reference.id)

        // read empty
        assertEquals(null, service.get(reference.id))
        assertEquals(emptyList<VisitorGroup>(), service.getAll(Pageable.from(0)).content)
    }
}
