-- =====================================
-- Insert Sample Tasks
-- =====================================


INSERT INTO tasks
(
    title,
    description,
    priority,
    status,
    due_date,
    created_by
)

VALUES


(
    'Create Database Schema',
    'Design PostgreSQL database structure',
    'High',
    'Completed',
    '2026-08-05',
    1
),


(
    'Develop Authentication',
    'Create login and security module',
    'Urgent',
    'In Progress',
    '2026-08-12',
    1
),


(
    'Build Task API',
    'Backend developer will create CRUD API',
    'High',
    'Pending',
    '2026-08-15',
    2
),


(
    'Testing Application',
    'Perform complete application testing',
    'Medium',
    'Pending',
    '2026-08-20',
    2
),


(
    'Production Deployment',
    'Deploy application on server',
    'Low',
    'Pending',
    '2026-09-01',
    3
);
