package de.sambalmueslie.openbooking.request.db

import io.micronaut.data.annotation.Repository
import io.micronaut.data.jdbc.annotation.JdbcRepository
import io.micronaut.data.model.query.builder.sql.Dialect
import io.micronaut.data.repository.GenericRepository

@Repository
@JdbcRepository(dialect = Dialect.POSTGRES)
interface BookingRequestRelationRepository : GenericRepository<BookingRequestRelation, Long> {
    fun save(data: BookingRequestRelation): BookingRequestRelation
    fun saveAll(data: List<BookingRequestRelation>): List<BookingRequestRelation>

    fun getByBookingId(bookingId: Long): List<BookingRequestRelation>
    fun getByBookingRequestId(bookingRequestId: Long): List<BookingRequestRelation>

    fun deleteByBookingId(bookingId: Long)
    fun deleteByBookingRequestId(bookingRequestId: Long)
    fun deleteAll(relations: List<BookingRequestRelation>)

}
