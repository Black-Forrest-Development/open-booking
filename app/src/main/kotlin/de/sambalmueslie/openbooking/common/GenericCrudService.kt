package de.sambalmueslie.openbooking.common


import com.github.benmanes.caffeine.cache.Caffeine
import com.github.benmanes.caffeine.cache.LoadingCache
import io.micronaut.data.model.Page
import io.micronaut.data.model.Pageable
import io.micronaut.data.repository.PageableRepository
import org.slf4j.Logger
import java.util.concurrent.TimeUnit

abstract class GenericCrudService<T : Any, O : BusinessObject<T>, R : BusinessObjectChangeRequest, D : DataObject<O>>(
    private val repository: PageableRepository<D, T>,
    logger: Logger
) : BaseCrudService<T, O, R>(logger) {

    private val cache: LoadingCache<T, O> = Caffeine.newBuilder()
        .maximumSize(100)
        .expireAfterWrite(1, TimeUnit.HOURS)
        .build { id -> repository.findByIdOrNull(id)?.convert() }

    final override fun get(id: T): O? {
        return repository.findByIdOrNull(id)?.convert()
    }

    final override fun getAll(pageable: Pageable): Page<O> {
        return repository.findAll(pageable).map { it.convert() }
    }

    override fun create(request: R): O {
        isValid(request)
        val existing = existing(request)
        if (existing != null) return existing.convert()

        val result = repository.save(createData(request)).convert()
        cache.put(result.id, result)
        notifyCreated(result)
        return result
    }

    protected abstract fun createData(request: R): D

    override fun update(id: T, request: R): O {
        val data = repository.findByIdOrNull(id) ?: return create(request)
        isValid(request)
        val result = repository.update(updateData(data, request)).convert()
        cache.put(result.id, result)
        notifyUpdated(result)
        return result
    }

    protected abstract fun updateData(data: D, request: R): D

    protected fun patchData(id: T, patch: (D) -> Unit): O? {
        val data = repository.findByIdOrNull(id) ?: return null
        patch.invoke(data)
        val result = repository.update(data).convert()
        cache.put(result.id, result)
        notifyUpdated(result)
        return result
    }

    override fun delete(id: T): O? {
        val data = repository.findByIdOrNull(id) ?: return null
        return delete(data)
    }

    fun delete(data: D): O {
        deleteDependencies(data)
        val result = data.convert()
        notifyDeleted(result)
        repository.delete(data)
        cache.invalidate(result.id)
        return result
    }

    protected abstract fun isValid(request: R)
    protected open fun existing(request: R): D? {
        return null
    }

    protected open fun deleteDependencies(data: D) {
        // intentionally left empty
    }
}


