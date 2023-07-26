FROM openjdk:17

WORKDIR /app

COPY ./petandmet-0.0.1-SNAPSHOT.jar .

ENTRYPOINT ["java","-jar","-Dserver.port=8000","petandmet-0.0.1-SNAPSHOT.jar"]