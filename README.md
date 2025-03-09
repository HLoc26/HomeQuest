# HomeQuest

HomeQuest is a task management web application designed in RPG style, where users can assign and complete tasks in a gamified manner. The primary goal is to make task management more engaging and structured.

## Features

-   Task creation, assignment, and tracking
-   Gamified experience with levels, rewards, and achievements
-   Dashboard to monitor progress and statistics
-   User authentication and role-based access control
-   Task board for public task posting
-   Daily, weekly, and monthly tasks
-   Task proof submission and approval

## Technologies Used

-   Frontend: React, Vite, Bootstrap
-   Backend: Express.js, Sequelize, MySQL
-   Authentication: JWT
-   Containerization: Docker, Docker Compose

## Project Structure

```
HomeQuest/
    ├── API/
    │   ├── src/
    │   │   ├── config/
    │   │   ├── controllers/
    │   │   ├── data/
    │   │   ├── middlewares/
    │   │   ├── models/
    │   │   ├── routes/
    │   │   ├── services/
    │   │   ├── utils/
    │   ├── Dockerfile
    │   ├── package.json
    │   └── .env.example
    ├── UI/
    │   ├── src/
    │   │   ├── api/
    │   │   ├── components/
    │   │   ├── pages/
    │   │   ├── store/
    │   │   └── assets/
    │   ├── Dockerfile
    │   ├── package.json
    │   └── vite.config.js
    ├── docker-compose.yml
    └── README.md
```

## Getting Started

### Prerequisites

-   Docker
-   Docker Compose

### Setting Up and Running the Application

1. **Clone the repository:**

    ```sh
    git clone https://github.com/HLoc26/HomeQuest.git
    cd HomeQuest
    ```

2. **Configure environment variables:**

    Copy the `.env.example` file to `.env` in the `API` directory and fill in the required values.

    ```sh
    cp API/.env.example API/.env
    ```

3. **Build and run the Docker containers:**

    ```sh
    docker-compose up --build
    ```

    This command will build the Docker images and start the containers for the frontend, backend, and MySQL database.

4. **Access the application:**

    - Frontend: `http://localhost:5173`
    - Backend: `http://localhost:3000`

### Fixing Potential Errors

1. **Database Connection Issues:**

    If the backend container cannot connect to the MySQL database, ensure that the database service is healthy and the environment variables in the `.env` file are correctly configured.

    ```sh
    docker-compose logs db
    ```

    Check the logs for any errors related to the database service.

2. **Port Conflicts:**

    If the ports `5173` or `3000` are already in use, you can change the ports in the [docker-compose.yml](http://_vscodecontentref_/6) file.

    ```yml
    services:
        frontend:
            ports:
                - "5173:5173"
        backend:
            ports:
                - "3000:3000"
    ```

    Change the host ports to available ports, e.g., `5174:5173` and `3001:3000`.

3. **Frontend/Backend Not Starting:**

    If the frontend or backend containers fail to start, check the logs for any errors.

    ```sh
    docker-compose logs frontend
    docker-compose logs backend
    ```

    Ensure that all dependencies are installed correctly and there are no syntax errors in the code.

4. **Rebuilding Containers:**

    If you make changes to the code or configuration, you may need to rebuild the Docker containers.

    ```sh
    docker-compose up --build
    ```

5. **Stopping and Removing Containers:**

    To stop and remove the Docker containers, use the following command:

    ```sh
    docker-compose down
    ```

## Contributing

If you would like to contribute to this project, please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License.
