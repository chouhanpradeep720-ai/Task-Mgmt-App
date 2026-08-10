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


