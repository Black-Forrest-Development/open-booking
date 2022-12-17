package de.sambalmueslie.openbooking.tour.db

import jakarta.persistence.*

@Suppress("JpaObjectClassSignatureInspection")
@Entity(name = "Tour")
@Table(name = "tour")
data class TourData(
    @Id @GeneratedValue(strategy = GenerationType.SEQUENCE) var id: Long,
)
