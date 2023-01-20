package de.sambalmueslie.openbooking.backend.settings


import de.sambalmueslie.openbooking.backend.settings.api.Setting
import de.sambalmueslie.openbooking.backend.settings.api.SettingChangeRequest
import de.sambalmueslie.openbooking.backend.settings.db.SettingData
import de.sambalmueslie.openbooking.backend.settings.db.SettingsRepository
import de.sambalmueslie.openbooking.common.GenericCrudService
import de.sambalmueslie.openbooking.common.TimeProvider
import jakarta.inject.Singleton
import org.slf4j.Logger
import org.slf4j.LoggerFactory

@Singleton
class SettingsService(
    private val repository: SettingsRepository,
    private val timeProvider: TimeProvider
) : GenericCrudService<String, Setting, SettingChangeRequest, SettingData>(repository, logger) {


    companion object {
        private val logger: Logger = LoggerFactory.getLogger(SettingsService::class.java)
    }

    override fun createData(request: SettingChangeRequest): SettingData {
        return SettingData.create(request, timeProvider.now())
    }

    override fun updateData(data: SettingData, request: SettingChangeRequest): SettingData {
        return data.update(request, timeProvider.now())
    }

    override fun isValid(request: SettingChangeRequest) {
        // intentionally left empty
    }

    fun setValue(id: String, value: Any): Setting? {
        return patchData(id) { it.setValue(value) }
    }


}
