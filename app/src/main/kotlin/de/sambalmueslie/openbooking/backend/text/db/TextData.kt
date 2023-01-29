package de.sambalmueslie.openbooking.backend.text.db

import de.sambalmueslie.openbooking.backend.text.api.Text
import de.sambalmueslie.openbooking.backend.text.api.TextChangeRequest
import de.sambalmueslie.openbooking.common.DataObject
import jakarta.persistence.*
import java.time.LocalDateTime

@Suppress("JpaObjectClassSignatureInspection")
@Entity(name = "Text")
@Table(name = "text")
data class TextData(
    @Id @GeneratedValue(strategy = GenerationType.SEQUENCE) var id: Long,
    @Column var lang: String,
    @Column var type: String,
    @Column var content: String,
    @Column var created: LocalDateTime,
    @Column var updated: LocalDateTime? = null,
) : DataObject<Text> {

    companion object {
        fun create(request: TextChangeRequest, timestamp: LocalDateTime): TextData {
            return TextData(0, request.lang, request.type, request.content, timestamp)
        }
    }

    override fun convert() = Text(id, lang, type, content)

    fun update(request: TextChangeRequest, timestamp: LocalDateTime): TextData {
        lang = request.lang
        type = request.type
        content = request.content
        updated = timestamp
        return this
    }
}
