package de.sambalmueslie.openbooking.backend.offer


import de.sambalmueslie.openbooking.backend.offer.api.Offer
import de.sambalmueslie.openbooking.common.checkPermission
import de.sambalmueslie.openbooking.backend.offer.api.OfferAPI
import de.sambalmueslie.openbooking.backend.offer.api.OfferAPI.Companion.PERMISSION_OFFER_READ
import de.sambalmueslie.openbooking.backend.offer.api.OfferAPI.Companion.PERMISSION_OFFER_WRITE
import de.sambalmueslie.openbooking.backend.offer.api.OfferChangeRequest
import de.sambalmueslie.openbooking.common.PatchRequest
import io.micronaut.data.model.Pageable
import io.micronaut.http.annotation.*
import io.micronaut.security.authentication.Authentication
import io.swagger.v3.oas.annotations.tags.Tag
import java.time.LocalDate

@Controller("/api/backend/offer")
@Tag(name = "Offer API")
class OfferController(private val service: OfferService) : OfferAPI {

    @Get()
    override fun getAll(auth: Authentication, pageable: Pageable) = auth.checkPermission(PERMISSION_OFFER_READ) { service.getAll(pageable) }

    @Get("/{id}")
    override fun get(auth: Authentication, @PathVariable id: Long) = auth.checkPermission(PERMISSION_OFFER_READ) { service.get(id) }

    @Get("/find/{date}")
    override fun findByDate(auth: Authentication, @PathVariable date: LocalDate) = auth.checkPermission(PERMISSION_OFFER_READ) { service.getOffer(date) }

    @Patch("/{id}/active")
    override fun setActive(auth: Authentication, @PathVariable id: Long, @Body value: PatchRequest<Boolean>)=
        auth.checkPermission(PERMISSION_OFFER_WRITE) { service.setActive(id, value.value) }

    @Patch("/{id}/max_persons")
    override fun setMaxPersons(auth: Authentication, @PathVariable id: Long, @Body value: PatchRequest<Int>) =
        auth.checkPermission(PERMISSION_OFFER_WRITE) { service.setMaxPersons(id, value.value) }


    @Post()
    override fun create(auth: Authentication, @Body request: OfferChangeRequest) =
        auth.checkPermission(PERMISSION_OFFER_WRITE) { service.create(request) }

    @Put("/{id}")
    override fun update(auth: Authentication, @PathVariable id: Long, @Body request: OfferChangeRequest) =
        auth.checkPermission(PERMISSION_OFFER_WRITE) { service.update(id, request) }

    @Delete("/{id}")
    override fun delete(auth: Authentication, @PathVariable id: Long) =
        auth.checkPermission(PERMISSION_OFFER_WRITE) { service.delete(id) }


}
