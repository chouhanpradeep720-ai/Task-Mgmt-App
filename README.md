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

## 🚀 Project Overview

**Task Management App** is a full-stack task management and team collaboration platform.

Users can:

* Create tasks
* Update tasks
* Delete tasks
* Mark tasks as completed/incomplete
* View task information
* Login and authenticate
* Manage users

The project started as a Dockerized application and was later deployed using Kubernetes with **Amazon RDS PostgreSQL** as the managed database.

---

# 🏗️ Architecture

## Current Architecture

```text
                         USER
                           |
                           v
                     +-----------+
                     |   NGINX   |
                     +-----+-----+
                           |
              +------------+------------+
              |                         |
              v                         v
       +-------------+           +-------------+
       |    React    |   /api    |   Node.js   |
       |  Frontend   | --------> |   Backend   |
       +-------------+           +------+------+
                                        |
                                        | SSL/TLS
                                        v
                                +---------------+
                                |    AWS RDS    |
                                |  PostgreSQL   |
                                +---------------+
```

---

# 🔄 Application Request Flow

A typical request flows through the application as follows:

```text
User
 |
 v
Nginx
 |
 v
React Frontend
 |
 | HTTP API Request
 v
Node.js + Express
 |
 | SQL Query
 v
Amazon RDS PostgreSQL
 |
 v
Response
 |
 v
React UI
```

### Example: Creating a Task

```text
User
 |
 v
React Frontend
 |
 | POST /api/tasks
 v
Node.js / Express
 |
 | INSERT SQL
 v
PostgreSQL
 |
 v
Task Stored
 |
 v
API Response
 |
 v
React UI Updated
```

---

# 🧰 Technology Stack

## Application

| Technology | Purpose                      |
| ---------- | ---------------------------- |
| React      | Frontend UI                  |
| Vite       | Frontend build tool          |
| Node.js    | Backend runtime              |
| Express.js | REST API framework           |
| PostgreSQL | Relational database          |
| Nginx      | Web server and reverse proxy |

## DevOps & Cloud

| Technology          | Purpose                          |
| ------------------- | -------------------------------- |
| Docker              | Containerization                 |
| Docker Compose      | Local multi-container deployment |
| Kubernetes          | Container orchestration          |
| Kind                | Local Kubernetes cluster         |
| AWS EC2             | Cloud application environment    |
| AWS RDS             | Managed PostgreSQL database      |
| AWS VPC             | Network isolation                |
| AWS Security Groups | Network access control           |
| AWS IAM             | AWS access management            |
| Kubernetes Secrets  | Secret management                |
| Prometheus          | Metrics collection               |
| Grafana             | Metrics visualization            |
| Git                 | Version control                  |
| GitHub              | Source code management           |
| Amazon ECR          | Container image registry         |

---

# 📂 Project Structure

```text
Task-Mgmt-App/
|
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

# 🐳 Docker Deployment

The application can be run locally using Docker Compose.

## Docker Architecture

```text
+--------------------------------------+
|             Docker Network           |
|                                      |
|    +----------+                      |
|    | Frontend |                      |
|    |  Nginx   |                      |
|    +----+-----+                      |
|         |                            |
|         v                            |
|    +----------+                      |
|    | Backend  |                      |
|    | Node.js  |                      |
|    +----+-----+                      |
|         |                            |
|         v                            |
|    +-------------+                   |
|    | PostgreSQL  |                   |
|    +-------------+                   |
|                                      |
+--------------------------------------+
```

---

# ⚡ Local Setup

## 1. Clone Repository

```bash
git clone https://github.com/chouhanpradeep720-ai/Task-Mgmt-App.git

cd Task-Mgmt-App
```

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

> ⚠️ Never commit real passwords, JWT secrets, AWS credentials or API keys to GitHub.

## 3. Start Application

```bash
docker compose up --build
```

Or run in background:

```bash
docker compose up -d --build
```

## 4. Verify Containers

```bash
docker ps
```

## 5. Check Logs

```bash
docker compose logs -f
```

Backend logs:

```bash
docker compose logs -f backend
```

Database logs:

```bash
docker compose logs -f database
```

---

# 🌐 Application Endpoints

| Service    | Endpoint                        |
| ---------- | ------------------------------- |
| Frontend   | `http://localhost`              |
| Backend    | `http://localhost:5000`         |
| Health     | `http://localhost:5000/health`  |
| Readiness  | `http://localhost:5000/ready`   |
| Metrics    | `http://localhost:5000/metrics` |
| PostgreSQL | `localhost:5432`                |

---

# ☸️ Kubernetes Deployment

The application is deployed on Kubernetes using **Kind**.

## Kubernetes Architecture

```text
                 Kubernetes Cluster
                         |
             +-----------+-----------+
             |                       |
             v                       v
     Frontend Service        Backend Service
             |                       |
             v                       v
      Frontend Pod(s)        Backend Pod(s)
                                     |
                                     v
                              AWS RDS PostgreSQL
```

---

# 🔍 Kubernetes Verification

## Check Kind Cluster

```bash
kind get clusters
```

## Check Kubernetes Nodes

```bash
kubectl get nodes
```

## Check Pods

```bash
kubectl get pods -n task-management
```

## Check Services

```bash
kubectl get svc -n task-management
```

## Check Deployments

```bash
kubectl get deployments -n task-management
```

## Check Pods with IP and Node Information

```bash
kubectl get pods -n task-management -o wide
```

---

# 📜 Kubernetes Logs

## Backend Logs

```bash
kubectl logs deployment/backend-deployment \
  -n task-management \
  --tail=50
```

## Follow Logs

```bash
kubectl logs -f deployment/backend-deployment \
  -n task-management
```

## Pod Logs

```bash
kubectl logs <pod-name> \
  -n task-management
```

## Previous Container Logs

Useful when a container has restarted:

```bash
kubectl logs <pod-name> \
  -n task-management \
  --previous
```

---

# 🔄 Kubernetes Deployment Management

## Restart Backend

```bash
kubectl rollout restart deployment/backend-deployment \
  -n task-management
```

## Check Rollout Status

```bash
kubectl rollout status deployment/backend-deployment \
  -n task-management
```

## View Rollout History

```bash
kubectl rollout history deployment/backend-deployment \
  -n task-management
```

## Rollback

```bash
kubectl rollout undo deployment/backend-deployment \
  -n task-management
```

---

# ☁️ AWS RDS PostgreSQL Migration

The PostgreSQL database was migrated from Kubernetes PostgreSQL to **Amazon RDS for PostgreSQL**.

## Migration Architecture

```text
Kubernetes PostgreSQL
        |
        | pg_dump
        v
    backup.sql
        |
        | psql
        v
Amazon RDS PostgreSQL
        |
        | SSL/TLS
        v
Node.js Backend
```

---

# 🔄 Database Migration Process

## 1. Create RDS PostgreSQL

An Amazon RDS PostgreSQL database was created inside the AWS VPC.

Important configuration:

* PostgreSQL engine
* Database name
* Database username
* Database password
* VPC
* Subnet configuration
* Security Group
* PostgreSQL port `5432`

---

# 🔐 2. Configure RDS Security Group

PostgreSQL port `5432` is allowed from the application EC2 security group.

```text
EC2 Security Group
        |
        | TCP 5432
        v
RDS Security Group
        |
        v
Amazon RDS PostgreSQL
```

The database should not be unnecessarily exposed to:

```text
0.0.0.0/0
```

---

# 🌐 3. Verify Network Connectivity

Before restoring the database, RDS DNS resolution and PostgreSQL connectivity were tested from the EC2 environment.

## Step 1: Test RDS DNS Resolution

```bash
nslookup <RDS-ENDPOINT>
```

Example:

```bash
nslookup task-db.xxxxxxxxxxxx.ap-south-1.rds.amazonaws.com
```

Alternative:

```bash
getent hosts <RDS-ENDPOINT>
```

If DNS works, the RDS hostname should resolve to an IP address.

---

## Step 2: Test PostgreSQL Port

```bash
nc -vz <RDS-ENDPOINT> 5432
```

Example:

```bash
nc -vz task-db.xxxxxxxxxxxx.ap-south-1.rds.amazonaws.com 5432
```

Successful output will look similar to:

```text
Connection to task-db.xxxxxxxxxxxx.ap-south-1.rds.amazonaws.com 5432 port [tcp/postgresql] succeeded!
```

---

## Step 3: Test PostgreSQL Connection

```bash
psql \
  -h <RDS-ENDPOINT> \
  -p 5432 \
  -U postgres \
  -d task_management
```

For SSL:

```bash
psql \
  "host=<RDS-ENDPOINT> port=5432 dbname=task_management user=postgres sslmode=require"
```

This verifies:

```text
DNS
 |
 v
Network
 |
 v
Port 5432
 |
 v
PostgreSQL
 |
 v
Authentication
 |
 v
Database
```

---

# 📦 4. Create Database Backup

The Kubernetes PostgreSQL database was exported using `pg_dump`.

```bash
kubectl exec -n task-management postgres-0 -- \
  pg_dump -U postgres -d task_management > backup.sql
```

Verify the backup:

```bash
ls -lh backup.sql
```

Check the backup content:

```bash
head -n 20 backup.sql
```

---

# ♻️ 5. Restore Database to RDS

The backup was restored into the Amazon RDS PostgreSQL database using `psql`.

```bash
psql \
  -h <RDS-ENDPOINT> \
  -p 5432 \
  -U postgres \
  -d task_management \
  -f backup.sql
```

For SSL:

```bash
psql \
  "host=<RDS-ENDPOINT> port=5432 dbname=task_management user=postgres sslmode=require" \
  -f backup.sql
```

Example:

```bash
psql \
  "host=task-db.xxxxxxxxxxxx.ap-south-1.rds.amazonaws.com port=5432 dbname=task_management user=postgres sslmode=require" \
  -f backup.sql
```

The PostgreSQL password can be entered when `psql` prompts for it.

---

# 🗃️ 6. Verify Tables

Connect to RDS:

```bash
psql \
  "host=<RDS-ENDPOINT> port=5432 dbname=task_management user=postgres sslmode=require"
```

Inside PostgreSQL:

```sql
\dt
```

Expected tables:

```text
users
tasks
```

---

# 📊 7. Verify Migrated Data

Check users:

```sql
SELECT COUNT(*) FROM users;
```

Check tasks:

```sql
SELECT COUNT(*) FROM tasks;
```

Check sample users:

```sql
SELECT * FROM users LIMIT 5;
```

Check sample tasks:

```sql
SELECT * FROM tasks LIMIT 5;
```

These checks verify that the database migration transferred both:

* Database schema
* Application data

---

# 🔒 8. SSL/TLS Connection

The Node.js PostgreSQL connection was configured with SSL:

```javascript
ssl: {
  rejectUnauthorized: false
}
```

This allows the backend to establish an encrypted SSL/TLS connection with Amazon RDS.

> For production environments, proper RDS CA certificate verification should be used instead of disabling certificate verification.

---

# 🧪 Database Migration Verification

```text
Kubernetes PostgreSQL
        |
        | pg_dump
        v
    backup.sql
        |
        | psql
        v
Amazon RDS
        |
        +---- DNS Check
        |
        +---- Port 5432 Check
        |
        +---- PostgreSQL Login
        |
        +---- Table Verification
        |
        +---- Data Verification
        |
        +---- SSL/TLS Verification
```

---

# 📊 Monitoring & Observability

The backend exposes Prometheus-compatible metrics through:

```text
/metrics
```

Test:

```bash
curl http://localhost:5000/metrics
```

---

# 📈 Application Metrics

Examples:

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

---

# 🔎 What These Metrics Help Debug

### HTTP Metrics

```text
http_requests_total
```

Useful for monitoring:

* Request volume
* API traffic
* HTTP status patterns

### Request Duration

```text
http_request_duration_seconds
```

Useful for identifying:

* Slow API requests
* Increased latency
* Performance issues

### Database Pool Metrics

```text
db_pool_total_connections
db_pool_idle_connections
db_pool_waiting_requests
db_pool_active_connections
```

Useful for identifying:

* Connection exhaustion
* Database pool saturation
* Waiting database requests

### Business Metrics

```text
tasks_created_total
tasks_completed_total
tasks_deleted_total
login_attempts_total
```

Useful for monitoring application behavior.

---

# 📡 Observability Architecture

```text
                  Application
                       |
              +--------+--------+
              |        |        |
              v        v        v
           Metrics    Logs    Traces
              |        |        |
              v        v        v
         Prometheus  Logging   Tempo
              |        |        |
              v        v        v
           Grafana  CloudWatch Grafana
```

---

# ❤️ Health Checks

## Health Endpoint

```http
GET /health
```

Test:

```bash
curl http://localhost:5000/health
```

Used to verify that the backend application is running.

---

# 🟢 Readiness Endpoint

```http
GET /ready
```

Test:

```bash
curl http://localhost:5000/ready
```

Used to verify whether the backend is ready to receive traffic.

---

# 🐞 Troubleshooting & Debugging

One of the important practical parts of this project is troubleshooting problems across different layers.

```text
Application
     |
     v
Docker
     |
     v
Kubernetes
     |
     v
Service
     |
     v
DNS
     |
     v
Network
     |
     v
AWS
     |
     v
Database
```

---

# 🐳 Docker Troubleshooting

## Problem: Container is Not Running

Check running containers:

```bash
docker ps
```

Check all containers:

```bash
docker ps -a
```

Check logs:

```bash
docker logs <container-name>
```

Or:

```bash
docker compose logs backend
```

---

# Problem: Backend Container Keeps Restarting

Check:

```bash
docker compose ps
```

Then:

```bash
docker compose logs backend
```

Look for:

```text
Database connection error
Environment variable missing
Port already in use
Application crash
```

---

# Problem: PostgreSQL Connection Failed

Check environment variables:

```bash
docker compose exec backend env | grep DB
```

Check database container:

```bash
docker ps
```

Check database logs:

```bash
docker compose logs database
```

Inside Docker, use the PostgreSQL service name:

```env
DB_HOST=database
```

instead of:

```env
DB_HOST=localhost
```

Inside a container, `localhost` refers to the same container, not another Docker container.

---

# Problem: Port Already in Use

Check the port:

```bash
sudo lsof -i :5000
```

Alternative:

```bash
sudo ss -lntp | grep 5000
```

---

# ☸️ Kubernetes Troubleshooting

## Problem: Pod is Pending

Check:

```bash
kubectl get pods -n task-management
```

Then:

```bash
kubectl describe pod <pod-name> \
  -n task-management
```

Check the `Events` section.

Possible causes:

* Insufficient resources
* Scheduling issues
* Image problems
* Volume problems

---

# Problem: Pod is CrashLoopBackOff

Check logs:

```bash
kubectl logs <pod-name> \
  -n task-management
```

Check previous logs:

```bash
kubectl logs <pod-name> \
  -n task-management \
  --previous
```

Then:

```bash
kubectl describe pod <pod-name> \
  -n task-management
```

---

# Problem: ImagePullBackOff

Check:

```bash
kubectl describe pod <pod-name> \
  -n task-management
```

Check the deployment image:

```bash
kubectl get deployment backend-deployment \
  -n task-management \
  -o yaml
```

Verify that:

* Image name is correct
* Image tag exists
* Registry is reachable
* Image pull credentials are correct if required

---

# Problem: Backend Service Not Reachable

Check service:

```bash
kubectl get svc -n task-management
```

Check endpoints:

```bash
kubectl get endpoints -n task-management
```

Check backend pods:

```bash
kubectl get pods \
  -n task-management \
  -l app=backend
```

If a Service has no endpoints, check:

* Service selector
* Pod labels
* Pod readiness

---

# Problem: Frontend Cannot Reach Backend

Start a temporary debugging pod:

```bash
kubectl run debug \
  --rm -it \
  --image=curlimages/curl \
  -- sh
```

Inside the debugging pod:

```bash
curl http://backend:5000/health
```

This helps determine whether the problem is:

```text
Frontend
```

or:

```text
Backend / Kubernetes networking
```

---

# Problem: Kubernetes DNS Not Working

Check the Service:

```bash
kubectl get svc -n task-management
```

Test DNS:

```bash
kubectl run dns-test \
  --rm -it \
  --image=busybox \
  -- nslookup backend
```

If DNS fails, investigate:

* CoreDNS
* Service name
* Namespace
* Kubernetes networking

---

# 🔥 AWS RDS Troubleshooting

When the backend cannot connect to RDS, troubleshoot in this order:

```text
1. DNS
   |
   v
2. Network
   |
   v
3. Security Group
   |
   v
4. Port 5432
   |
   v
5. PostgreSQL
   |
   v
6. Credentials
   |
   v
7. SSL/TLS
   |
   v
8. Application Configuration
```

---

# Problem: RDS DNS Resolution Failed

Test:

```bash
nslookup <RDS-ENDPOINT>
```

Alternative:

```bash
getent hosts <RDS-ENDPOINT>
```

Check:

* RDS endpoint
* VPC DNS resolution
* VPC DNS hostnames
* EC2 network configuration

---

# Problem: RDS Connection Timeout

Test:

```bash
nc -vz <RDS-ENDPOINT> 5432
```

If the connection times out, check:

```text
EC2 Security Group
        |
        v
RDS Security Group
        |
        v
TCP 5432
        |
        v
VPC / Subnet Routing
```

---

# Problem: PostgreSQL Authentication Failed

Verify:

```text
DB_HOST
DB_PORT
DB_NAME
DB_USER
DB_PASSWORD
```

Test directly:

```bash
psql \
  -h <RDS-ENDPOINT> \
  -U postgres \
  -d task_management
```

---

# Problem: SSL/TLS Error

Test:

```bash
psql \
  "host=<RDS-ENDPOINT> port=5432 dbname=task_management user=postgres sslmode=require"
```

If this works but the application fails, inspect the Node.js PostgreSQL SSL configuration.

---

# 🧠 Systematic Debugging Strategy

Instead of randomly changing configurations, debug one layer at a time.

## 1. Application

```bash
curl http://localhost:5000/health
```

## 2. Container

```bash
docker ps
docker logs <container>
```

## 3. Kubernetes

```bash
kubectl get pods -n task-management

kubectl describe pod <pod> -n task-management

kubectl logs <pod> -n task-management
```

## 4. Kubernetes Service

```bash
kubectl get svc -n task-management

kubectl get endpoints -n task-management
```

## 5. DNS

```bash
nslookup <hostname>
```

## 6. Network Port

```bash
nc -vz <hostname> 5432
```

## 7. Database

```bash
psql \
  -h <hostname> \
  -U postgres \
  -d task_management
```

This makes troubleshooting systematic instead of guessing.

---

# 🔐 Security

Security is considered at both application and infrastructure levels.

## Current Security Practices

* Environment-based configuration
* Kubernetes Secrets
* AWS Security Groups
* RDS private networking
* SSL/TLS connection to RDS
* IAM-based AWS access where applicable
* Database access controlled through Security Groups
* Sensitive configuration separated from application code
* No real credentials committed to GitHub

---

# 🔑 Secrets Management

Sensitive values should not be stored directly in GitHub.

Examples:

```text
DB_PASSWORD
JWT_SECRET
AWS credentials
API keys
```

Current Kubernetes deployment uses:

```text
Kubernetes Secrets
```

Future AWS architecture can use:

```text
AWS Secrets Manager
```

---

# 🧪 Testing & Verification

The application has been verified through practical tests including:

```text
✓ Backend starts successfully

✓ Frontend loads successfully

✓ Database connection succeeds

✓ User authentication works

✓ Tasks can be created

✓ Tasks can be updated

✓ Tasks can be deleted

✓ Tasks can be marked complete/incomplete

✓ RDS DNS resolution works

✓ RDS port 5432 connectivity works

✓ RDS PostgreSQL authentication works

✓ Database backup created successfully

✓ Database restored successfully

✓ Migrated tables verified

✓ Migrated users verified

✓ Migrated tasks verified

✓ SSL/TLS connection works

✓ Prometheus metrics exposed

✓ Kubernetes pods verified

✓ Kubernetes services verified
```

---

# 🐳 Useful Docker Commands

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

## Running Containers

```bash
docker ps
```

## All Containers

```bash
docker ps -a
```

## Logs

```bash
docker compose logs -f
```

## Backend Logs

```bash
docker compose logs -f backend
```

## Database Logs

```bash
docker compose logs -f database
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

## Detailed Pod Information

```bash
kubectl describe pod <pod-name> \
  -n task-management
```

## Logs

```bash
kubectl logs <pod-name> \
  -n task-management
```

## Previous Logs

```bash
kubectl logs <pod-name> \
  -n task-management \
  --previous
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

## Rollback

```bash
kubectl rollout undo deployment/backend-deployment \
  -n task-management
```

---

# 🩺 Quick Health Verification

After deployment, run:

### Backend

```bash
curl http://localhost:5000/health
```

### Readiness

```bash
curl http://localhost:5000/ready
```

### Metrics

```bash
curl http://localhost:5000/metrics
```

### Kubernetes Pods

```bash
kubectl get pods -n task-management
```

### Kubernetes Services

```bash
kubectl get svc -n task-management
```

### RDS DNS

```bash
nslookup <RDS-ENDPOINT>
```

### RDS Port

```bash
nc -vz <RDS-ENDPOINT> 5432
```

### RDS PostgreSQL

```bash
psql \
  "host=<RDS-ENDPOINT> port=5432 dbname=task_management user=postgres sslmode=require"
```

---

# 🔄 Git & Development Workflow

The source code is maintained using Git and GitHub.

```text
Developer
    |
    v
Git
    |
    v
GitHub Repository
    |
    v
Application Changes
    |
    v
Docker Build
    |
    v
Container Image
    |
    v
Deployment Environment
```

Example Git workflow:

```bash
git status
```

```bash
git add .
```

```bash
git commit -m "Update application"
```

```bash
git push origin main
```

---

# 🗺️ Development Roadmap

## ✅ Completed

* [x] React frontend
* [x] Node.js + Express backend
* [x] PostgreSQL database
* [x] Dockerized application
* [x] Docker Compose setup
* [x] Nginx reverse proxy
* [x] Kubernetes deployment
* [x] Kind cluster deployment
* [x] AWS EC2 environment
* [x] AWS RDS PostgreSQL
* [x] Kubernetes PostgreSQL → RDS migration
* [x] RDS SSL/TLS connection
* [x] Kubernetes Secrets
* [x] Prometheus application metrics
* [x] Application health endpoint
* [x] Application readiness endpoint
* [x] Database migration verification
* [x] RDS DNS troubleshooting
* [x] PostgreSQL connectivity troubleshooting
* [x] Docker troubleshooting
* [x] Kubernetes troubleshooting

## 🚧 Planned / Future

* [ ] Terraform infrastructure automation
* [ ] Production AWS Load Balancer
* [ ] Amazon CloudFront
* [ ] AWS WAF
* [ ] AWS Secrets Manager integration
* [ ] Complete CloudWatch logging pipeline
* [ ] Fluent Bit log forwarding
* [ ] Complete Tempo distributed tracing
* [ ] Advanced Grafana dashboards
* [ ] Complete GitHub Actions CI/CD pipeline
* [ ] Automated container security scanning
* [ ] Production EKS deployment
* [ ] High availability
* [ ] Autoscaling
* [ ] Production-grade TLS certificate management

---

# 📚 DevOps Concepts Demonstrated

```text
Application Development
|
+-- React
+-- Node.js
+-- Express
+-- PostgreSQL
|
v
Containerization
|
+-- Docker
+-- Docker Compose
|
v
Orchestration
|
+-- Kubernetes
+-- Kind
|
v
Networking
|
+-- Kubernetes Services
+-- DNS
+-- TCP
+-- VPC
+-- Security Groups
|
v
AWS
|
+-- EC2
+-- RDS
+-- IAM
+-- VPC
|
v
Database Operations
|
+-- pg_dump
+-- psql
+-- Database Backup
+-- Database Restore
+-- PostgreSQL Migration
|
v
Security
|
+-- Kubernetes Secrets
+-- SSL/TLS
+-- Security Groups
|
v
Observability
|
+-- Prometheus
+-- Grafana
+-- Application Metrics
|
v
Troubleshooting
|
+-- Docker Debugging
+-- Kubernetes Debugging
+-- DNS Debugging
+-- Network Debugging
+-- Database Debugging
```

---

# 🎯 Project Goals

The goal of this project is not only to build a task management application, but also to demonstrate how a full-stack application can evolve toward a **production-oriented cloud-native architecture**.

The project focuses on:

* Containerization
* Kubernetes orchestration
* AWS cloud infrastructure
* Managed databases
* Database migration
* Network troubleshooting
* DNS troubleshooting
* Application debugging
* Secure configuration
* Monitoring
* Observability
* Health checks
* SSL/TLS
* CI/CD concepts
* Infrastructure automation concepts

---

# 🔮 Future Improvements

The project can be further evolved into a production-grade AWS platform by adding:

* Amazon EKS
* Terraform
* Application Load Balancer
* CloudFront
* AWS WAF
* AWS Secrets Manager
* CloudWatch centralized logging
* Fluent Bit
* Tempo
* Advanced Grafana dashboards
* GitHub Actions CI/CD
* Container image security scanning
* Autoscaling
* High availability
* Production TLS certificate management

These features are intentionally listed as **Future Improvements** so that the README clearly separates implemented functionality from planned architecture.

---

# 👨‍💻 Author

## Pradeep Chouhan

**DevOps / Cloud Engineering Project**

---

<div align="center">

### 📝 Task Management App

**React · Node.js · Express · PostgreSQL · Docker · Kubernetes · AWS**

Built as a practical Cloud & DevOps learning project.

</div>
