package de.sambalmueslie.openbooking


import io.micronaut.core.io.ResourceResolver
import io.micronaut.http.MediaType
import io.micronaut.http.annotation.Controller
import io.micronaut.http.annotation.Get
import io.micronaut.http.annotation.Produces
import io.micronaut.http.server.types.files.StreamedFile
import io.micronaut.security.annotation.Secured
import io.micronaut.security.rules.SecurityRule
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import java.util.*

@Controller("/")
class IndexController(private val res: ResourceResolver) {

    companion object {
        private val logger: Logger = LoggerFactory.getLogger(IndexController::class.java)
    }

    @Get(value = "/{path:[^\\.]*}", produces = [MediaType.TEXT_HTML])
    @Secured(SecurityRule.IS_ANONYMOUS)
    @Produces(MediaType.TEXT_HTML)
    fun refresh(path: String): Optional<StreamedFile> {
		if(logger.isDebugEnabled) logger.debug("Refresh $path")
        if(path.startsWith("api")) return Optional.empty()
        return res.getResource("classpath:static/index.html").map { StreamedFile(it) }
    }

}
