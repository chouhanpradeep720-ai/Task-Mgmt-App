-- =====================================
-- Create Tasks Table
-- =====================================

DROP TABLE IF EXISTS tasks CASCADE;


CREATE TABLE tasks (

    id BIGSERIAL PRIMARY KEY,


    -- Task Information

    title VARCHAR(150) NOT NULL,

    description TEXT,


    -- Priority

    priority VARCHAR(20)
    NOT NULL
    DEFAULT 'Medium'

    CHECK (
        priority IN
        (
            'Low',
            'Medium',
            'High',
            'Urgent'
        )
    ),


    -- Status

    status VARCHAR(30)
    NOT NULL
    DEFAULT 'Pending'

    CHECK (
        status IN
        (
            'Pending',
            'In Progress',
            'Completed',
            'Cancelled'
        )
    ),


    -- Deadline

    due_date DATE,


    -- Audit Fields

    created_at TIMESTAMP WITH TIME ZONE
    DEFAULT CURRENT_TIMESTAMP,


    updated_at TIMESTAMP WITH TIME ZONE
    DEFAULT CURRENT_TIMESTAMP,


    -- Soft Delete

    is_deleted BOOLEAN
    DEFAULT FALSE,


    -- Future User Management

    created_by BIGINT,

    updated_by BIGINT

);



-- =====================================
-- Indexes
-- =====================================


CREATE INDEX idx_tasks_status
ON tasks(status);



CREATE INDEX idx_tasks_priority
ON tasks(priority);



CREATE INDEX idx_tasks_due_date
ON tasks(due_date);



CREATE INDEX idx_tasks_created_at
ON tasks(created_at DESC);



CREATE INDEX idx_tasks_active
ON tasks(is_deleted)
WHERE is_deleted = FALSE;



-- =====================================
-- Auto Update Updated_at
-- =====================================


CREATE OR REPLACE FUNCTION update_tasks_updated_at()

RETURNS TRIGGER AS $$

BEGIN

    NEW.updated_at = CURRENT_TIMESTAMP;

    RETURN NEW;

END;

$$ LANGUAGE plpgsql;



CREATE TRIGGER trigger_tasks_updated_at

BEFORE UPDATE ON tasks

FOR EACH ROW

EXECUTE FUNCTION update_tasks_updated_at();

CREATE TABLE users (

    id SERIAL PRIMARY KEY,

    username VARCHAR(100) UNIQUE NOT NULL,

    password VARCHAR(255) NOT NULL,

    role VARCHAR(50) DEFAULT 'admin',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);
