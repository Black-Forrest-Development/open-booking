package de.sambalmueslie.openbooking.backend.settings


import com.github.benmanes.caffeine.cache.Caffeine
import com.github.benmanes.caffeine.cache.LoadingCache
import de.sambalmueslie.openbooking.backend.cache.CacheService
import de.sambalmueslie.openbooking.backend.settings.api.Setting
import de.sambalmueslie.openbooking.backend.settings.api.SettingChangeRequest
import de.sambalmueslie.openbooking.backend.settings.db.SettingData
import de.sambalmueslie.openbooking.backend.settings.db.SettingsRepository
import de.sambalmueslie.openbooking.common.GenericCrudService
import de.sambalmueslie.openbooking.common.TimeProvider
import de.sambalmueslie.openbooking.common.findByIdOrNull
import io.micronaut.data.model.Page
import io.micronaut.data.model.Pageable
import jakarta.inject.Singleton
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import java.util.concurrent.TimeUnit

@Singleton
class SettingsService(
    private val repository: SettingsRepository,
    private val timeProvider: TimeProvider,
    cacheService: CacheService,
) : GenericCrudService<Long, Setting, SettingChangeRequest, SettingData>(repository, cacheService, Setting::class, logger) {

    private val keyCache: LoadingCache<String, Setting> = cacheService.register("Settings-Key") {
        Caffeine.newBuilder()
            .maximumSize(100)
            .expireAfterWrite(1, TimeUnit.HOURS)
            .recordStats()
            .build { key -> repository.findByKey(key)?.convert() }
    }

    companion object {
        private val logger: Logger = LoggerFactory.getLogger(SettingsService::class.java)
    }

    override fun getAll(pageable: Pageable): Page<Setting> {
        return repository.findAllOrderById(pageable).map { it.convert() }
    }

    override fun createData(request: SettingChangeRequest): SettingData {
        keyCache.invalidate(request.key)
        return SettingData.create(request, timeProvider.now())
    }

    override fun updateData(data: SettingData, request: SettingChangeRequest): SettingData {
        keyCache.invalidate(request.key)
        return data.update(request, timeProvider.now())
    }

    override fun isValid(request: SettingChangeRequest) {
        // intentionally left empty
    }

    fun setValue(id: Long, value: Any): Setting? {
        val result =  patchData(id) { it.setValue(value) } ?: return null
        keyCache.invalidate(result.key)
        return result
    }

    fun findByKey(key: String): Setting? {
        return keyCache[key]
    }


}
