package de.sambalmueslie.openbooking.offer


import de.sambalmueslie.openbooking.auth.checkPermission
import de.sambalmueslie.openbooking.offer.api.OfferAPI
import de.sambalmueslie.openbooking.offer.api.OfferAPI.Companion.PERMISSION_OFFER_READ
import de.sambalmueslie.openbooking.offer.api.OfferAPI.Companion.PERMISSION_OFFER_WRITE
import de.sambalmueslie.openbooking.offer.api.OfferChangeRequest
import io.micronaut.data.model.Pageable
import io.micronaut.http.annotation.*
import io.micronaut.security.authentication.Authentication
import io.swagger.v3.oas.annotations.tags.Tag

@Controller("/api/offer")
@Tag(name = "Offer API")
class OfferController(private val service: OfferService) : OfferAPI {

    @Get()
    override fun getAll(auth: Authentication, pageable: Pageable) = auth.checkPermission(PERMISSION_OFFER_READ) { service.getAll(pageable) }

    @Get("/{id}")
    override fun get(auth: Authentication, @PathVariable id: Long) = auth.checkPermission(PERMISSION_OFFER_READ) { service.get(id) }

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
