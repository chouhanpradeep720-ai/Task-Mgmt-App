<div align="center">

# 📝 Task Management App

### Cloud-Native 3-Tier Task Management Platform

A full-stack task management application built with **React, Node.js, Express, PostgreSQL, Docker and Kubernetes**, with AWS infrastructure and production-oriented DevOps practices.

[![React](https://img.shields.io/badge/React-Frontend-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-Build%20Tool-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-20%2B-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express.js-Backend-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-Containerization-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![Kubernetes](https://img.shields.io/badge/Kubernetes-Orchestration-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white)](https://kubernetes.io/)
[![AWS](https://img.shields.io/badge/AWS-Cloud-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white)](https://aws.amazon.com/)

</div>

---

# 📖 Project Overview

**Task Management App** is a full-stack task management and team collaboration platform that allows users to securely authenticate and manage tasks from a centralized application.

The project was developed with a **cloud-native and DevOps-oriented approach**, starting from a Dockerized local environment and progressing toward Kubernetes and AWS infrastructure.

Users can:

- Create tasks
- Update tasks
- Delete tasks
- Mark tasks as completed/incomplete
- View task information
- Authenticate securely
- Manage users

The application follows a **3-tier architecture**:

```text
Frontend
   ↓
Backend API
   ↓
PostgreSQL Database
```

---

# 🚀 Key Features

| Feature | Description |
|---|---|
| 🔐 Authentication | User login and authentication |
| 👤 User Management | User-related operations |
| 📝 Task Management | Create, update and delete tasks |
| ✅ Task Status | Mark tasks complete/incomplete |
| 🐳 Dockerized | Frontend, backend and database containerized |
| 🌐 Nginx | Reverse proxy and frontend web server |
| ☸️ Kubernetes | Application deployed using Kubernetes |
| ☁️ AWS RDS | PostgreSQL database migrated to AWS RDS |
| 🔒 SSL/TLS | Secure connection between backend and RDS |
| 📊 Prometheus Metrics | Application and database metrics |
| 📈 Grafana | Metrics visualization |
| ❤️ Health Endpoints | Application health and readiness endpoints |
| 📦 Persistent Storage | PostgreSQL persistent storage in local environment |

---

# 🏗️ Architecture

## Current Implemented Architecture

The currently implemented deployment uses Docker, Kubernetes and AWS RDS.

```text
                        USER
                          │
                          ▼
                    ┌───────────┐
                    │  NGINX    │
                    └─────┬─────┘
                          │
              ┌───────────┴───────────┐
              │                       │
              ▼                       ▼
        ┌───────────┐           ┌───────────┐
        │  React    │   /api    │  Node.js  │
        │ Frontend  │ ────────► │  Backend  │
        └───────────┘           └─────┬─────┘
                                      │
                                      │ SSL/TLS
                                      ▼
                              ┌───────────────┐
                              │   AWS RDS     │
                              │  PostgreSQL   │
                              └───────────────┘
```

---

# ☁️ AWS Production Architecture

The following architecture represents the **target production architecture** for the project.

Some components are currently planned and are not yet fully implemented.

```text
                         INTERNET
                            │
                            ▼
                     Amazon CloudFront
                            │
                            ▼
                       AWS WAF
                            │
                            ▼
              Application Load Balancer
                            │
                            ▼
                    ┌──────────────┐
                    │  AWS VPC     │
                    │              │
                    │    EC2       │
                    │      │       │
                    │    Nginx     │
                    │      │       │
                    │  ┌───┴───┐   │
                    │  │       │   │
                    │ React  Node  │
                    │ Frontend Backend
                    │          │   │
                    └──────────┼───┘
                               │
                               ▼
                         AWS RDS
                         PostgreSQL
```

### Target Observability Architecture

```text
Application
     │
     ├──────────► Metrics ──────► Prometheus ──────► Grafana
     │
     ├──────────► Traces ───────► Tempo ───────────► Grafana
     │
     └──────────► Logs ─────────► Fluent Bit ──────► CloudWatch
```

### Target Security Architecture

```text
                         AWS IAM
                            │
                            ▼
                           EC2
                            │
              ┌─────────────┼─────────────┐
              ▼             ▼             ▼
       Secrets Manager  CloudWatch    AWS Services
              │
              ▼
        Application Secrets
```

---

# 🛠️ Technology Stack

## Application

| Technology | Purpose |
|---|---|
| React | Frontend UI |
| Vite | Frontend build tool |
| Node.js | Backend runtime |
| Express.js | REST API framework |
| PostgreSQL | Relational database |
| Nginx | Web server / reverse proxy |

## DevOps & Cloud

| Technology | Purpose |
|---|---|
| Docker | Containerization |
| Docker Compose | Local multi-container deployment |
| Kubernetes | Container orchestration |
| Kind | Local Kubernetes cluster |
| AWS EC2 | Application hosting environment |
| AWS RDS | Managed PostgreSQL database |
| AWS Security Groups | Network security |
| AWS IAM | Access management |
| Prometheus | Metrics collection |
| Grafana | Metrics visualization |
| Tempo | Distributed tracing |
| CloudWatch | AWS logging and monitoring |
| GitHub Actions | CI/CD |
| Amazon ECR | Container image registry |

---

# 📂 Project Structure

```text
Task-Mgmt-App/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── taskController.js
│   │   └── userController.js
│   │
│   ├── middleware/
│   │   ├── errorHandler.js
│   │   └── notFound.js
│   │
│   ├── models/
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── taskRoutes.js
│   │   └── userRoutes.js
│   │
│   ├── database/
│   │   ├── schema.sql
│   │   └── seed.sql
│   │
│   ├── app.js
│   ├── server.js
│   └── Dockerfile
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── nginx.conf
│   └── Dockerfile
│
├── k8s-folder/
│   ├── backend-deployment.yaml
│   ├── backend-service.yaml
│   ├── frontend-deployment.yaml
│   ├── frontend-service.yaml
│   ├── postgres-deployment.yaml
│   ├── postgres-service.yaml
│   └── ...
│
├── docker-compose.yml
├── kind-config.yaml
├── .gitignore
└── README.md
```

---

# 🔄 Application Request Flow

A typical user request follows this flow:

```text
User
 │
 ▼
Nginx
 │
 ▼
React Frontend
 │
 │ HTTP API Request
 ▼
Node.js + Express
 │
 ▼
PostgreSQL
```

For example:

```text
User creates task
       │
       ▼
React Frontend
       │
       │ POST /api/tasks
       ▼
Node.js / Express
       │
       ▼
PostgreSQL
       │
       ▼
Task stored
```

---

# 🐳 Docker Deployment

The application can be run locally using Docker Compose.

## Services

```text
┌─────────────────────────────┐
│       Docker Network        │
│                             │
│  ┌─────────┐                │
│  │Frontend │                │
│  │ Nginx   │                │
│  └────┬────┘                │
│       │                     │
│       ▼                     │
│  ┌─────────┐                │
│  │ Backend │                │
│  │ Node.js │                │
│  └────┬────┘                │
│       │                     │
│       ▼                     │
│  ┌───────────┐              │
│  │PostgreSQL │              │
│  └───────────┘              │
│                             │
└─────────────────────────────┘
```

---

# ⚡ Local Setup

## 1. Clone Repository

```bash
git clone https://github.com/chouhanpradeep720-ai/Task-Mgmt-App.git
cd Task-Mgmt-App
```

---

## 2. Configure Environment Variables

Create the required environment configuration.

Example:

```env
PORT=5000

DB_HOST=database
DB_PORT=5432
DB_NAME=task_management
DB_USER=postgres
DB_PASSWORD=your-password
```

> ⚠️ Never commit real passwords, API keys or secrets to GitHub.

---

## 3. Start Application

```bash
docker compose up --build
```

Or run in background:

```bash
docker compose up -d --build
```

---

# 🌐 Application Endpoints

| Service | Endpoint |
|---|---|
| Frontend | `http://localhost` |
| Backend | `http://localhost:5000` |
| Backend Health | `http://localhost:5000/health` |
| Backend Readiness | `http://localhost:5000/ready` |
| Prometheus Metrics | `http://localhost:5000/metrics` |
| PostgreSQL | `localhost:5432` |

---

# ☸️ Kubernetes Deployment

The application is also deployed on Kubernetes using **Kind**.

### Kubernetes Architecture

```text
                   Kubernetes Cluster
                         │
          ┌──────────────┴──────────────┐
          │                             │
          ▼                             ▼
   Frontend Service              Backend Service
          │                             │
          ▼                             ▼
   Frontend Pod(s)              Backend Pod(s)
                                        │
                                        ▼
                                AWS RDS PostgreSQL
```

## Check Cluster

```bash
kind get clusters
```

```bash
kubectl get nodes
```

---

## Check Application Pods

```bash
kubectl get pods -n task-management
```

---

## Check Services

```bash
kubectl get svc -n task-management
```

---

## Check Deployment

```bash
kubectl get deployments -n task-management
```

---

## View Backend Logs

```bash
kubectl logs deployment/backend-deployment \
  -n task-management \
  --tail=50
```

---

# ☁️ AWS RDS Database Migration

The PostgreSQL database was migrated from Kubernetes PostgreSQL to **Amazon RDS for PostgreSQL**.

## Migration Architecture

```text
Kubernetes PostgreSQL
        │
        │ pg_dump
        ▼
    backup.sql
        │
        │ restore
        ▼
Amazon RDS PostgreSQL
        │
        │ SSL/TLS
        ▼
Node.js Backend
```

## Migration Process

### 1. Create RDS PostgreSQL

Created an Amazon RDS PostgreSQL database inside the AWS VPC.

### 2. Configure Security Group

PostgreSQL port `5432` is allowed from the application EC2 security group.

```text
EC2 Security Group
       │
       │ TCP 5432
       ▼
RDS Security Group
```

### 3. Verify Network Connectivity

RDS DNS resolution and PostgreSQL connectivity were tested from the EC2 environment.

### 4. Create Database Backup

The Kubernetes PostgreSQL database was exported using:

```bash
kubectl exec -n task-management postgres-0 -- \
pg_dump -U postgres -d task_management > backup.sql
```

### 5. Restore Database to RDS

The backup was restored into the RDS PostgreSQL database.

### 6. Verify Tables

```sql
\dt
```

Verified tables:

```text
users
tasks
```

### 7. Verify Data

```sql
SELECT COUNT(*) FROM users;

SELECT COUNT(*) FROM tasks;
```

### 8. Enable SSL/TLS

The Node.js PostgreSQL connection was configured with SSL:

```javascript
ssl: {
  rejectUnauthorized: false,
}
```

This allows the application to establish an encrypted SSL/TLS connection with Amazon RDS.

> Production deployments should use proper RDS CA certificate verification instead of disabling certificate verification.

---

# 📊 Monitoring & Observability

The backend exposes Prometheus-compatible application metrics.

Metrics endpoint:

```text
/metrics
```

## Application Metrics

Examples include:

```text
http_requests_total
http_request_duration_seconds
http_requests_in_progress

db_pool_total_connections
db_pool_idle_connections
db_pool_waiting_requests
db_pool_active_connections

db_queries_total
db_query_errors_total
db_query_duration_seconds

tasks_created_total
tasks_completed_total
tasks_deleted_total

login_attempts_total
```

## Observability Architecture

```text
                Application
                     │
          ┌──────────┼──────────┐
          │          │          │
          ▼          ▼          ▼
       Metrics     Logs       Traces
          │          │          │
          ▼          ▼          ▼
     Prometheus   Fluent Bit   Tempo
          │          │          │
          ▼          ▼          ▼
       Grafana   CloudWatch   Grafana
```

> Some components in this architecture are part of the planned production observability stack.

---

# 🔐 Security

Security is considered at both application and infrastructure levels.

## Current Security Practices

- Environment-based configuration
- Kubernetes Secrets for sensitive credentials
- AWS Security Groups
- RDS private networking
- SSL/TLS connection to RDS
- IAM-based AWS access where applicable
- Secrets separated from application configuration

## Secrets

Sensitive values should not be stored directly in GitHub.

Example:

```text
DB_PASSWORD
JWT_SECRET
AWS credentials
API keys
```

Use:

```text
Kubernetes Secrets
```

and for the planned AWS production architecture:

```text
AWS Secrets Manager
```

---

# ❤️ Health Checks

The backend exposes health-related endpoints.

## Health

```http
GET /health
```

Used to determine whether the application is running.

## Readiness

```http
GET /ready
```

Used to determine whether the application is ready to receive traffic.

## Metrics

```http
GET /metrics
```

Exposes Prometheus metrics.

---

# 🧪 Testing & Verification

Basic application verification includes:

```text
✓ Backend starts successfully
✓ Database connection succeeds
✓ User authentication works
✓ Tasks can be created
✓ Tasks can be updated
✓ Tasks can be deleted
✓ Tasks can be marked complete/incomplete
✓ RDS connection works
✓ Migrated users verified
✓ Migrated tasks verified
✓ Prometheus metrics exposed
```

---

# 🐳 Docker Commands

## Start

```bash
docker compose up -d
```

## Stop

```bash
docker compose down
```

## Rebuild

```bash
docker compose up -d --build
```

## View Containers

```bash
docker ps
```

## View Logs

```bash
docker compose logs -f
```

## Build Backend

```bash
docker build -t task-app-backend ./backend
```

## Build Frontend

```bash
docker build -t task-app-frontend ./frontend
```

---

# ☸️ Useful Kubernetes Commands

## Pods

```bash
kubectl get pods -n task-management
```

## Services

```bash
kubectl get svc -n task-management
```

## Deployments

```bash
kubectl get deployments -n task-management
```

## Logs

```bash
kubectl logs deployment/backend-deployment \
  -n task-management
```

## Restart Backend

```bash
kubectl rollout restart deployment/backend-deployment \
  -n task-management
```

## Deployment Status

```bash
kubectl rollout status deployment/backend-deployment \
  -n task-management
```

---

# 🚨 Troubleshooting

| Problem | Possible Solution |
|---|---|
| Frontend not loading | Check Nginx and frontend container logs |
| Backend not starting | Check Kubernetes/Docker logs |
| PostgreSQL connection failed | Verify DB host, port and credentials |
| RDS connection timeout | Check VPC, subnet and Security Group |
| RDS `no pg_hba.conf entry` | Verify SSL/TLS configuration |
| Pod not ready | Check readiness configuration and backend logs |
| Port already in use | Check Docker/Kubernetes port mappings |
| Kubernetes pod restarting | Check `kubectl describe pod` and logs |

Useful commands:

```bash
kubectl describe pod <pod-name> -n task-management
```

```bash
kubectl logs <pod-name> -n task-management
```

---

# 🔄 CI/CD Pipeline

The planned CI/CD workflow is:

```text
Developer
    │
    ▼
GitHub Repository
    │
    ▼
GitHub Actions
    │
    ├── Checkout Code
    ├── Unit Tests
    ├── SonarQube Scan
    ├── Trivy Scan
    ├── Docker Build
    │
    ▼
Container Registry
    │
    ▼
Deployment Environment
```

The CI/CD architecture will be expanded as additional automation components are implemented.

---

# 🗺️ Development Roadmap

## ✅ Completed

- [x] React frontend
- [x] Node.js + Express backend
- [x] PostgreSQL database
- [x] Dockerized application
- [x] Docker Compose setup
- [x] Nginx reverse proxy
- [x] Kubernetes deployment
- [x] Kind cluster deployment
- [x] AWS EC2 environment
- [x] AWS RDS PostgreSQL
- [x] Kubernetes PostgreSQL → RDS migration
- [x] RDS SSL/TLS connection
- [x] Kubernetes Secrets
- [x] Prometheus application metrics

## 🚧 In Progress / Planned

- [ ] Production AWS Load Balancer
- [ ] Amazon CloudFront
- [ ] AWS WAF
- [ ] AWS Secrets Manager integration
- [ ] Complete CloudWatch logging pipeline
- [ ] Fluent Bit log forwarding
- [ ] Tempo distributed tracing
- [ ] Complete Grafana dashboards
- [ ] Complete GitHub Actions CI/CD
- [ ] Container image scanning
- [ ] Terraform infrastructure automation
- [ ] Production EKS deployment

---

# 📚 DevOps Concepts Demonstrated

This project provides practical experience with:

```text
Containerization
Docker
Docker Compose
Kubernetes
Kind
Nginx
AWS EC2
AWS RDS
VPC
Security Groups
IAM
Kubernetes Secrets
SSL/TLS
PostgreSQL
Prometheus
Grafana
Application Metrics
Database Migration
Git
GitHub
CI/CD
Infrastructure as Code
Observability
```

---

# 🎯 Project Goals

The main goal of this project is not only to build a task management application, but also to demonstrate how a full-stack application can evolve toward a **production-oriented cloud-native architecture**.

The project focuses on:

- Containerization
- Kubernetes orchestration
- Cloud infrastructure
- Managed databases
- Secure configuration
- Monitoring
- Observability
- CI/CD
- Infrastructure automation

---

# 🔮 Future Improvements

Future improvements include:

- Migration from Kind to Amazon EKS
- Automated infrastructure using Terraform
- Production AWS Load Balancer
- CloudFront CDN
- AWS WAF protection
- AWS Secrets Manager
- Centralized logging with CloudWatch
- Distributed tracing with Tempo
- Automated CI/CD with GitHub Actions
- Automated security scanning
- High availability and autoscaling
- Production-grade TLS certificate management

---

# Author

**Pradeep Chouhan**

DevOps / Cloud Engineering Project

---

<div align="center">

### 📝 Task Management App

**React · Node.js · Express · PostgreSQL · Docker · Kubernetes · AWS**

Built as a practical Cloud & DevOps learning project.

</div>