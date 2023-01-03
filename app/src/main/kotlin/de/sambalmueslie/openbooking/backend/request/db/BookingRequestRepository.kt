package de.sambalmueslie.openbooking.backend.request.db

import de.sambalmueslie.openbooking.backend.request.api.BookingRequestStatus
import io.micronaut.data.annotation.Repository
import io.micronaut.data.jdbc.annotation.JdbcRepository
import io.micronaut.data.model.Page
import io.micronaut.data.model.Pageable
import io.micronaut.data.model.query.builder.sql.Dialect
import io.micronaut.data.repository.PageableRepository

@Repository
@JdbcRepository(dialect = Dialect.POSTGRES)
interface BookingRequestRepository : PageableRepository<BookingRequestData, Long> {

    fun findByStatusIn(status: List<BookingRequestStatus>, pageable: Pageable): Page<BookingRequestData>

}
