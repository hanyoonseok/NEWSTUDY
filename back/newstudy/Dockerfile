FROM openjdk:8-jdk-alpine AS build

COPY gradlew .

COPY gradle gradle

COPY build.gradle .

COPY settings.gradle .

COPY src src

RUN chmod +x gradlew

RUN ["./gradlew", "bootJar"]

FROM openjdk:8-jdk-alpine

COPY --from=build build/libs/*.jar app.jar

EXPOSE 8085

ENTRYPOINT ["java", "-jar", "/app.jar"]