package de.sambalmueslie.openbooking.backend.mail.db

import de.sambalmueslie.openbooking.backend.mail.api.MailJob
import de.sambalmueslie.openbooking.backend.mail.api.MailJobStatus
import de.sambalmueslie.openbooking.common.DataObject
import jakarta.persistence.*
import java.time.LocalDateTime

@Suppress("JpaObjectClassSignatureInspection")
@Entity(name = "MailJob")
@Table(name = "mail_job")
data class MailJobData(
    @Id @GeneratedValue(strategy = GenerationType.SEQUENCE) var id: Long,
    @Column @Enumerated(EnumType.STRING) var status: MailJobStatus,
    @Column var title: String,
    @Column var created: LocalDateTime,
    @Column var updated: LocalDateTime? = null,
) : DataObject<MailJob> {

    companion object {
        fun create(title: String, timestamp: LocalDateTime): MailJobData {
            return MailJobData(0, MailJobStatus.QUEUED, title, timestamp, timestamp)
        }

    }

    override fun convert(): MailJob {
        val timestamp = updated ?: created
        return MailJob(id, title, status, timestamp)
    }

    fun updateStatus(status: MailJobStatus, timestamp: LocalDateTime): MailJobData {
        this.status = status
        this.updated = timestamp
        return this
    }
}
