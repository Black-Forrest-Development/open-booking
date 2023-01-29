package de.sambalmueslie.openbooking.backend.text


import de.sambalmueslie.openbooking.backend.text.api.Text
import de.sambalmueslie.openbooking.backend.text.api.TextChangeRequest
import de.sambalmueslie.openbooking.backend.text.db.TextData
import de.sambalmueslie.openbooking.backend.text.db.TextRepository
import de.sambalmueslie.openbooking.common.GenericCrudService
import de.sambalmueslie.openbooking.common.TimeProvider
import de.sambalmueslie.openbooking.error.InvalidRequestException
import jakarta.inject.Singleton
import org.slf4j.Logger
import org.slf4j.LoggerFactory

@Singleton
class TextService(
    private val repository: TextRepository,
    private val timeProvider: TimeProvider
) : GenericCrudService<Long, Text, TextChangeRequest, TextData>(repository, logger) {

    companion object {
        private val logger: Logger = LoggerFactory.getLogger(TextService::class.java)
    }


    override fun createData(request: TextChangeRequest): TextData {
        return TextData.create(request, timeProvider.now())
    }

    override fun updateData(data: TextData, request: TextChangeRequest): TextData {
        return data.update(request, timeProvider.now())
    }

    override fun isValid(request: TextChangeRequest) {
        if (request.lang.isEmpty()) throw InvalidRequestException("Lang cannot be empty")
        if (request.type.isEmpty()) throw InvalidRequestException("Type cannot be empty")
    }

}
