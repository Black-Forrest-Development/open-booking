package de.sambalmueslie.openbooking.backend.response.resolve


import de.sambalmueslie.openbooking.backend.group.VisitorGroupService
import de.sambalmueslie.openbooking.backend.request.BookingRequestService
import de.sambalmueslie.openbooking.backend.request.api.BookingRequest
import de.sambalmueslie.openbooking.backend.response.api.Reference
import de.sambalmueslie.openbooking.backend.response.api.ResolvedResponse
import de.sambalmueslie.openbooking.backend.response.api.Response
import jakarta.inject.Singleton
import org.apache.velocity.VelocityContext
import org.apache.velocity.app.VelocityEngine
import java.io.StringWriter

@Singleton
class ResponseResolver(
    private val bookingRequestService: BookingRequestService
) {

    private val ve = VelocityEngine()

    init {
        ve.init()
    }

    fun resolve(data: Response, reference: Reference): ResolvedResponse? {
        return when (reference.type) {
            BookingRequest::class.simpleName -> resolveBookingRequest(data, reference)
            else -> null
        }
    }

    private fun resolveBookingRequest(data: Response, reference: Reference): ResolvedResponse? {
        val request = bookingRequestService.info(reference.id) ?: return null
        val properties = mutableMapOf<String, Any>(
            Pair("status", request.status),
            Pair("visitor", request.visitorGroup),
            Pair("bookings", request.bookings),
        )
        val title = evaluate(properties, data.title)
        val content = evaluate(properties, data.content)

        return ResolvedResponse(title, content)
    }

    private fun evaluate(properties: Map<String, Any>, raw: String): String {
        val context = VelocityContext(properties)
        val writer = StringWriter()
        ve.evaluate(context, writer, "Response Resolver", raw)
        return writer.toString()
    }


}
