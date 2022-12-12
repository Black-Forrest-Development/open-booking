plugins {
    id("org.jetbrains.kotlin.jvm")
    id("org.jetbrains.kotlin.kapt")
    id("org.jetbrains.kotlin.plugin.allopen")
    id("org.sonarqube")
    id("com.google.cloud.tools.jib")
    id("io.micronaut.application")
}

micronaut {
    runtime("netty")
    testRuntime("junit5")
    processing {
        incremental(true)
        annotations("de.sambalmueslie.openevent.core.*")
    }
}


dependencies {
    // keycloak
    implementation("org.keycloak:keycloak-common:20.0.1")
    implementation("org.keycloak:keycloak-core:20.0.1")

    // database
    kapt("io.micronaut.data:micronaut-data-processor")
    implementation("io.micronaut.data:micronaut-data-jdbc")
    runtimeOnly("org.postgresql:postgresql")
    implementation("io.micronaut.flyway:micronaut-flyway")

    testImplementation("org.testcontainers:junit-jupiter")
    testImplementation("org.testcontainers:postgresql")
    testImplementation("org.testcontainers:testcontainers")
}

application {
    mainClass.set("de.sambalmueslie.openbooking.BookingApplication")
}

