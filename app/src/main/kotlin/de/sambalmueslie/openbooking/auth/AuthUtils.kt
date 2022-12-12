package de.sambalmueslie.openbooking.auth

import de.sambalmueslie.openbooking.error.InsufficientPermissionsException
import io.micronaut.security.authentication.Authentication

fun <T> Authentication.checkPermission(permission: String, function: () -> T): T {
    if (!roles.contains(permission)) throw InsufficientPermissionsException("User '${name}' does not have '$permission' permission")
    return function.invoke()
}


