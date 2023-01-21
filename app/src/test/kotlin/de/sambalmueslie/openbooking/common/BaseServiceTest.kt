package de.sambalmueslie.openbooking.common


import de.sambalmueslie.openbooking.backend.notification.mail.MailClient
import io.micronaut.test.annotation.MockBean
import io.mockk.mockk
import org.slf4j.Logger
import org.slf4j.LoggerFactory

abstract class BaseServiceTest {

	val mailClient = mockk<MailClient>()
	@MockBean(MailClient::class)
	fun mailClient() = mailClient

	val timeProvider = mockk<TimeProvider>()

	@MockBean(TimeProvider::class)
	fun timeProvider() = timeProvider
}
