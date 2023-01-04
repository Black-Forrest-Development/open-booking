package de.sambalmueslie.openbooking.backend.offer.db

import io.micronaut.data.annotation.Repository
import io.micronaut.data.jdbc.annotation.JdbcRepository
import io.micronaut.data.model.query.builder.sql.Dialect
import io.micronaut.data.repository.PageableRepository
import java.time.LocalDateTime

@Repository
@JdbcRepository(dialect = Dialect.POSTGRES)
interface OfferRepository : PageableRepository<OfferData, Long> {

    fun findByStartGreaterThanEqualsAndFinishLessThanEqualsOrderByStart(start: LocalDateTime, end: LocalDateTime): List<OfferData>

    fun findOneByStartGreaterThanEqualsOrderByStart(start: LocalDateTime): OfferData?
    fun findOneByStartGreaterThanEqualsOrderByStartDesc(start: LocalDateTime): OfferData?
    fun findByIdIn(offerIds: Set<Long>): List<OfferData>
    fun findOneByStart(start: LocalDateTime): OfferData?
}
