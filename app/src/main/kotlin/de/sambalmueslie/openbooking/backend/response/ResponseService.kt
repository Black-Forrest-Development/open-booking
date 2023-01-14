package de.sambalmueslie.openbooking.backend.response


import de.sambalmueslie.openbooking.backend.response.api.Response
import de.sambalmueslie.openbooking.backend.response.api.ResponseChangeRequest
import de.sambalmueslie.openbooking.backend.response.db.ResponseData
import de.sambalmueslie.openbooking.backend.response.db.ResponseRepository
import de.sambalmueslie.openbooking.common.GenericCrudService
import de.sambalmueslie.openbooking.common.TimeProvider
import de.sambalmueslie.openbooking.error.InvalidRequestException
import jakarta.inject.Singleton
import org.slf4j.Logger
import org.slf4j.LoggerFactory

@Singleton
class ResponseService(
    private val repository: ResponseRepository,
    private val timeProvider: TimeProvider
) : GenericCrudService<Long, Response, ResponseChangeRequest, ResponseData>(repository, logger) {

    companion object {
        private val logger: Logger = LoggerFactory.getLogger(ResponseService::class.java)
    }

    override fun createData(request: ResponseChangeRequest): ResponseData {
        return ResponseData.create(request, timeProvider.now())
    }

    override fun updateData(data: ResponseData, request: ResponseChangeRequest): ResponseData {
        return data.update(request, timeProvider.now())
    }

    override fun isValid(request: ResponseChangeRequest) {
        if (request.lang.isBlank()) throw InvalidRequestException("Language is not allowed to be blank")
        if (request.title.isBlank()) throw InvalidRequestException("Title is not allowed to be blank")
        if (request.content.isBlank()) throw InvalidRequestException("Content is not allowed to be blank")
    }

}
