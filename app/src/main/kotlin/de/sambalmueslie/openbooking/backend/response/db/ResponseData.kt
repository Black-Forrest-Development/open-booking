package de.sambalmueslie.openbooking.backend.response.db

import de.sambalmueslie.openbooking.backend.response.api.Response
import de.sambalmueslie.openbooking.backend.response.api.ResponseChangeRequest
import de.sambalmueslie.openbooking.backend.response.api.ResponseType
import de.sambalmueslie.openbooking.common.DataObject
import jakarta.persistence.*
import java.time.LocalDateTime

@Suppress("JpaObjectClassSignatureInspection")
@Entity(name = "Response")
@Table(name = "response")
data class ResponseData(
    @Id @GeneratedValue(strategy = GenerationType.SEQUENCE) var id: Long,
    @Column var lang: String,
    @Column @Enumerated(EnumType.STRING) var type: ResponseType,
    @Column var title: String,
    @Column var content: String,

    @Column var created: LocalDateTime,
    @Column var updated: LocalDateTime? = null,
) : DataObject<Response> {

    companion object {
        fun create(request: ResponseChangeRequest, timestamp: LocalDateTime): ResponseData {
            return ResponseData(
                0,
                request.lang,
                request.type,
                request.title,
                request.content,
                timestamp
            )
        }
    }

    override fun convert(): Response {
        return Response(id, lang, type, title, content)
    }

    fun update(request: ResponseChangeRequest, timestamp: LocalDateTime): ResponseData {
        lang = request.lang
        type = request.type
        title = request.title
        content = request.content
        updated = timestamp
        return this
    }
}
