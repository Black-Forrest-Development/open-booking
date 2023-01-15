package de.sambalmueslie.openbooking.backend.response


import de.sambalmueslie.openbooking.backend.response.api.*
import de.sambalmueslie.openbooking.backend.response.db.ResponseData
import de.sambalmueslie.openbooking.backend.response.db.ResponseRepository
import de.sambalmueslie.openbooking.backend.response.resolve.ResponseResolver
import de.sambalmueslie.openbooking.common.GenericCrudService
import de.sambalmueslie.openbooking.common.TimeProvider
import de.sambalmueslie.openbooking.error.InvalidRequestException
import jakarta.inject.Singleton
import org.slf4j.Logger
import org.slf4j.LoggerFactory

@Singleton
class ResponseService(
    private val repository: ResponseRepository,
    private val resolver: ResponseResolver,
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

    fun find(lang: String, type: ResponseType): Response? {
        val response = repository.findOneByLangAndType(lang, type) ?: repository.findOneByLangAndType("en", type) ?: return null
        return response.convert()
    }

    fun resolve(request: ResolveResponseRequest): ResolvedResponse? {
        val type = request.type
        val response = repository.findOneByLangAndType(request.lang, type) ?: repository.findOneByLangAndType("en", type) ?: return null
        return resolver.resolve(response.convert(), request.reference)
    }

}
