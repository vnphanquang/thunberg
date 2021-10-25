# PostgreSQL Idempotent Patterns

Adhere to following examples for better migration

```SQL
--Table
CREATE TABLE IF NOT EXISTS person
(
    id           integer               NOT NULL,
    person_name  character varying(40) NOT NULL,
    updated_date date,
    CONSTRAINT person_pkey PRIMARY KEY (id)
);

--Index
CREATE INDEX IF NOT EXISTS idx_person_name ON person (person_name);

--Sequence
CREATE SEQUENCE IF NOT EXISTS seq_person_inc;

--Function
CREATE OR REPLACE FUNCTION simple_sum(a_integer int, b_integer int) RETURNS INT
AS
$$
SELECT a_integer + b_integer
$$
    LANGUAGE SQL;

--View
CREATE OR REPLACE VIEW vw_select_1 AS
SELECT 1;

-- Type
DO
$$
    BEGIN
        CREATE TYPE public.role AS enum (
            'user',
            'admin'
            );
    EXCEPTION
        WHEN duplicate_object THEN -- Error Code 42710
            RAISE NOTICE 'Type already exists. Ignoring...';
    END
$$;

--Role
DO
$$
    BEGIN
        CREATE ROLE rick_deckard;
    EXCEPTION
        WHEN duplicate_object THEN -- Error Code 42710
            RAISE NOTICE 'Role already exists. Ignoring...';
    END
$$;

--Simple insert
INSERT INTO person (id, person_name)
VALUES (1, 'HAL-9000');

--Upsert (insert + update)
INSERT INTO person (id, person_name)
VALUES (1, 'Betrayer')
ON CONFLICT ON CONSTRAINT person_pkey DO UPDATE SET person_name = EXCLUDED.person_name;

--Upsert (ignoring duplicate error)
INSERT INTO person (id, person_name)
VALUES (1, 'HAL-9000')
ON CONFLICT ON CONSTRAINT person_pkey DO NOTHING;

--Upsert (ignoring any error)
INSERT INTO person (id, person_name)
VALUES (1, 'HAL-9000')
ON CONFLICT DO NOTHING;

--Field
DO
$$
    BEGIN
        ALTER TABLE person
            ADD COLUMN id_another_person INTEGER;
    EXCEPTION
        WHEN duplicate_column THEN -- Error Code 42701
            RAISE NOTICE 'Field already exists. Ignoring...';
    END
$$;

DO
$$
    BEGIN
        ALTER TABLE public.account_test
            RENAME COLUMN start_time to started_at;
    EXCEPTION
        WHEN undefined_column THEN -- Error Code 42703
            RAISE NOTICE 'Field does not exist. Ignoring...';
    END
$$;

--Constraint
DO
$$
    BEGIN
        ALTER TABLE person
            ADD CONSTRAINT person_id_another_person_fkey FOREIGN KEY (id_another_person) REFERENCES person (id);
    EXCEPTION
        WHEN duplicate_object THEN -- Error Code 42710
            RAISE NOTICE 'Constraint already exists. Ignoring...';
    END
$$;

--Trigger
CREATE OR REPLACE FUNCTION person_trigger_function() RETURNS trigger AS
$BODY$
BEGIN
    --Something complex here =)
    RETURN NEW;
END;
$BODY$
    LANGUAGE plpgsql;

DO
$$
    BEGIN
        CREATE TRIGGER person_trigger
            BEFORE INSERT OR UPDATE
            ON person
            FOR EACH ROW
        EXECUTE PROCEDURE person_trigger_function();
    EXCEPTION
        WHEN duplicate_object THEN -- Error Code 42710
            RAISE NOTICE 'Trigger already exists. Ignoring...';
    END
$$;

-- Constraint (primary key)
DO
$$
    BEGIN
        ALTER TABLE person
            ADD CONSTRAINT person_pkey PRIMARY KEY (id);
    EXCEPTION
        WHEN invalid_table_definition THEN -- Error Code 42P16
            RAISE NOTICE 'Primary key already exists. Ignoring...';
    END
$$;

-- Policy
DO
$$
    BEGIN
        CREATE POLICY select_account ON public.account FOR SELECT
            USING (
                id = CURRENT_SETTING('jwt.claims.id', TRUE)::uuid
                OR CURRENT_SETTING('jwt.claims.role')::public.role = 'admin'
            );
    EXCEPTION
        WHEN duplicate_object THEN -- Error Code 42710
            RAISE NOTICE 'Policy already exists. Ignoring...';
    END
$$;

--Drop
DROP TRIGGER IF EXISTS person_trigger ON person;
DROP INDEX IF EXISTS idx_person_name;
ALTER TABLE person
    DROP COLUMN IF EXISTS person_name;
ALTER TABLE person
    DROP CONSTRAINT IF EXISTS person_id_another_person_fkey;
DROP ROLE IF EXISTS rick_deckard;
DROP VIEW IF EXISTS vw_select_1;
DROP FUNCTION IF EXISTS simple_sum(integer, integer);
DROP FUNCTION IF EXISTS person_trigger_function();
DROP TABLE IF EXISTS person;
DROP SEQUENCE IF EXISTS seq_person_inc;
```
