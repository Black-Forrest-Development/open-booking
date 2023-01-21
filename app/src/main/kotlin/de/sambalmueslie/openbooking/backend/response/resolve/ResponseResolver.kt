package de.sambalmueslie.openbooking.backend.response.resolve


import de.sambalmueslie.openbooking.backend.response.api.ResolvedResponse
import de.sambalmueslie.openbooking.backend.response.api.Response
import jakarta.inject.Singleton
import org.apache.velocity.VelocityContext
import org.apache.velocity.app.VelocityEngine
import java.io.StringWriter

@Singleton
class ResponseResolver {

    private val ve = VelocityEngine()

    init {
        ve.init()
    }


    fun resolve(data: Response, properties: Map<String, Any>): ResolvedResponse {
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
