package de.sambalmueslie.openbooking.backend.booking.db

import io.micronaut.data.annotation.Repository
import io.micronaut.data.jdbc.annotation.JdbcRepository
import io.micronaut.data.model.Page
import io.micronaut.data.model.Pageable
import io.micronaut.data.model.query.builder.sql.Dialect
import io.micronaut.data.repository.PageableRepository

@Repository
@JdbcRepository(dialect = Dialect.POSTGRES)
interface BookingRepository : PageableRepository<BookingData, Long> {

    fun findByOfferIdIn(offerIds: Set<Long>): List<BookingData>
    fun findByOfferId(offerId: Long, pageable: Pageable): Page<BookingData>

    fun countByVisitorGroupId(visitorGroupId: Long): Long

}
