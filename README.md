<div align="center">

# 📝 Task Management App

**A production-ready 3-Tier Dockerized Full-Stack Application built with HTML · Node · JavaScript · React · PostgresSql**

[![React](https://img.shields.io/badge/React-2026-blue?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-20%2B-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![Nginx](https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white)](https://nginx.org/)

</div>

---
# 📖 Project Overview

Task Management App is a team collaboration platform designed to help users efficiently create, manage, and track tasks in a centralized application.

The application provides a secure user authentication system along with complete task management functionality. Users can create, update, delete, and manage their tasks, as well as mark tasks as completed or incomplete.

The application is built with a modern web architecture, using React for the frontend, Node.js for the backend, and PostgreSQL for data storage. The application is containerized using Docker, with Nginx handling web traffic and serving as part of the deployment architecture.

---

# Application Architecture

```
        👤 User
          │
          ▼
     ┌───────────┐
     │  Nginx    │
     └─────┬─────┘
           │
     ┌─────▼─────┐
     │   React   │
     │ Frontend  │
     └─────┬─────┘
           │ API Requests
           ▼
     ┌───────────┐
     │  Node.js  │
     │  Backend  │
     └─────┬─────┘
           │
           ▼
     ┌───────────┐
     │PostgreSQL │
     │ Database  │
     └───────────┘

```

# ✨ Features


| Feature | Description |
|--------|-------------|
| 🐳 Dockerized Application | Complete application runs inside containers |
| 🏗️ Three Tier Architecture | Frontend, Backend and Database separated |
| 🔄 Reverse Proxy | Nginx forwards API requests to backend |
| 🔐 Environment Configuration | Database credentials managed using .env |
| 💾 Persistent Database | PostgreSQL data stored using Docker volumes |
| 📦 Multi-stage Builds | Optimized Docker images |
| ❤️ Health Monitoring | Container health checks |
| 🚀 Easy Deployment | Start entire application with one command |


---

# 📋 Prerequisites


Before running the project install:


| Tool | Version |
|-|-|
| Docker Desktop | Latest |
| Docker Compose | Latest |


No need to install:

- Java
- PostgreSQL
- Node.js


Everything runs inside Docker containers.


---

---

# ⚡ Quick Start


## 1. Clone Repository


```bash
git clone https://github.com/chouhanpradeep720-ai/Task-Mgmt-App.git
cd Task-Mgmt-App
```


---

## 2. Create Environment File


Create `.env` file:


```env

PORT=5000

DB_HOST=localhost
DB_PORT=5432
DB_NAME=task_management
DB_USER=postgres
DB_PASSWORD=your-postgresql-password


```

---

---

## 3. Start Application


```bash
docker compose up --build
```


Run in background:


```bash
docker compose up -d --build
```


---

# 🌐 Application URLs


| Service | URL |
|-|-|
| Frontend | http://localhost: |
| Backend API | http://localhost:5000|
| Database | localhost:5432 |
| Backend HealthCheack | http://localhost:5000/actuator/health |

---

---

# 🐳 Docker Commands


## Start containers

```bash
docker compose up -d
```


## Stop containers

```bash
docker compose down
```


## View running containers

```bash
docker ps
```


## View logs


```bash
docker compose logs -f
```


## Rebuild images


```bash
docker compose up --build
```



---

# 🔨 Docker Images


Build Backend Image:


```bash
docker build -t task-app-backend ./backend
```


Build Frontend Image:


```bash
docker build -t task-app-frontend ./frontend
```

---


---

# 🐳 Docker Architecture


```

frontend-container

        |
        |
        ▼

backend-container

        |
        |
        ▼

PostgreSQL-container


```


Each service runs independently and communicates through Docker network.



---

# 🚨 Troubleshooting


| Problem | Solution |
|-|-|
| Frontend not loading | Check nginx container logs |
| Backend not responding | Check backned container logs |
| Database connection error | Verify .env credentials |
| Port already used | Change port mapping in docker-compose.yml |
| Container stopped | Run docker compose ps |



---

# 📚 DevOps Concepts Used


| Concept | Usage |
|-|-|
| Containerization | Docker containers |
| Image Building | Dockerfile |
| Multi-stage Build | Optimized images |
| Reverse Proxy | Nginx routing |
| Service Discovery | Docker network |
| Environment Variables | Secure configuration |
| Persistent Storage | PostgreSQL volume |



---

<div align="center">

## 📝 Task Management App

A scalable task management and team collaboration platform designed to streamline task creation, assignment, tracking, and completion.

**Tech Stack:** React · Node.js · PostgreSQL · Docker · Nginx

</div>
