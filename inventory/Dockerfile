FROM openjdk:17-jdk-slim
# Copy the JAR built by Maven
COPY target/medical-inventory-*.jar medical-app.jar
# Expose app port
EXPOSE 8080
# Run the application
ENTRYPOINT ["java", "-jar", "/medical-app.jar"]