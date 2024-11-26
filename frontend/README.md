This is a simple game character index, where the user can view, add, edit, delete game characters and simulate battles between them.

## Getting Started

First, execute following commands to start the frontend of the application:

```bash
cd frontend
npm install --force
npm run dev
```

Next, setup a local MySQL database by adding an application.properties file in game-character-index/backend/src/main resources:

```
spring.application.name=backend
spring.web.resources.add-mappings=false
spring.datasource.url=jdbc:mysql://localhost:3306/your-database
spring.datasource.username=
spring.datasource.password=
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

Fill it in with your local database credentials and run the backend with the following commands:

```bash
cd backend
mvn spring-boot:run
```

By navigating to http://localhost:3000, you should have the application up and running.