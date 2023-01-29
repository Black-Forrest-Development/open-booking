package de.sambalmueslie.openbooking.common

import io.micronaut.security.authentication.Authentication

fun <T> Authentication.checkPermission(permission: String, function: () -> T): T {
    if (roles.contains(permission)) return function.invoke()
    return function.invoke()
}


