# Backend Developer 2 Guide
## Role: PostgreSQL & Database Developer

---

# Your Role

You are responsible for everything related to PostgreSQL.

You are NOT responsible for Express routes.

Another team member is building the Express API.

Your goal is to prepare a clean data layer that Express can easily consume.

---

# Technology Stack

- PostgreSQL
- pg (node-postgres)

---

# Your Responsibilities

## Sprint 1

Install PostgreSQL.

Create database.

Create tables.

Insert sample records.

Expected structure

```
backend/

config/

models/

database/

init.sql
```

---

## Database

Database

```
task_manager
```

Create table

```sql
CREATE TABLE tasks(

id SERIAL PRIMARY KEY,

title VARCHAR(100),

description TEXT,

priority VARCHAR(20),

status VARCHAR(20),

due_date DATE,

created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);
```

---

## Sprint 2

Create SQL queries.

Examples

Create Task

Get All Tasks

Update Task

Delete Task

Mark Complete

These queries should be placed inside

```
models/taskModel.js
```

---

## IMPORTANT

Database column names should map correctly to frontend JSON.

Example

Database

```
due_date
```

Frontend

```
dueDate
```

Make sure the returned JSON follows the frontend contract.

---

## Integration

Developer 1 will call your functions.

Example

```
getAllTasks()
```

should return

```json
[
    {
        "id":1,
        "title":"Learn Docker",
        "description":"Docker Basics",
        "priority":"High",
        "status":"Pending",
        "dueDate":"2026-08-10"
    }
]
```

---

## Git Branch

Work only on

```
feature/backend-db
```

Do NOT modify routes or controllers.

---

## Deliverables

- PostgreSQL
- Database Schema
- SQL Queries
- Database Connection
- Model Layer

---

# Prompt for ChatGPT

Open a NEW ChatGPT conversation.

Attach

- Backend_Handover_Guide.md
- Backend_Developer2_Guide.md

Then write

"I am Backend Developer 2 for this project.

Please first understand both attached guides.

Act as my DevOps mentor.

Guide me sprint by sprint.

I am a beginner.

Explain SQL concepts before implementation.

Keep the project simple.

The backend should be production-like and ready for Docker later.

Do not change the database schema unless necessary."
