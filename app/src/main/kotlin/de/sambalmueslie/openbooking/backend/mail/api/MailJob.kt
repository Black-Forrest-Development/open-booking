package de.sambalmueslie.openbooking.backend.mail.api

import de.sambalmueslie.openbooking.common.BusinessObject
import java.time.LocalDateTime

data class MailJob(
    override val id: Long,
    val title: String,
    val status: MailJobStatus,
    val timestamp: LocalDateTime,
) : BusinessObject<Long>
