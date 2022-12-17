package de.sambalmueslie.openbooking.role

import de.sambalmueslie.openbooking.role.api.TourRole
import de.sambalmueslie.openbooking.role.api.TourRoleChangeRequest
import de.sambalmueslie.openbooking.util.TimeProvider
import io.micronaut.data.model.Pageable
import io.micronaut.test.annotation.MockBean
import io.mockk.every
import io.mockk.mockk
import jakarta.inject.Inject
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test
import java.time.LocalDateTime

internal class RoleServiceTest {

    @Inject
    lateinit var service: RoleService

    private val timeProvider = mockk<TimeProvider>()

    @MockBean(TimeProvider::class)
    fun timeProvider() = timeProvider

    @Test
    fun checkCrud() {
        val now = LocalDateTime.of(2022, 10, 8, 20, 15, 0)
        every { timeProvider.now() } returns now

        // create
        val createRequest = TourRoleChangeRequest("name", "description")
        var result = service.create(createRequest)

        var reference = TourRole(result.id, createRequest.name, createRequest.description)
        assertEquals(reference, result)

        // read
        assertEquals(reference, service.get(reference.id))
        assertEquals(listOf(reference), service.getAll(Pageable.from(0)).content)

        // update
        val updateRequest = TourRoleChangeRequest("update-name", "update-description")
        result = service.update(reference.id, updateRequest)

        reference = TourRole(
            result.id,
            updateRequest.name,
            updateRequest.description
        )
        assertEquals(reference, result)

        // delete
        service.delete(reference.id)

        // read empty
        assertEquals(null, service.get(reference.id))
        assertEquals(emptyList<TourRole>(), service.getAll(Pageable.from(0)).content)
    }
}
