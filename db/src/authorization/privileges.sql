-- This file is a central place to define all the permissions for roles used by the application
-- You should write the sql in such a way that executing this file (even multiple times) will reset
-- all the roles to the correct permissions

-- the auto inclusion of this file when generating migrations is configured in .env file
-- with MIGRATION_INCLUDE_END variable

-- Resetting all privileges for application roles (start from a clean slate)
-- we use a convenience inline function here since PostgreSQL does not have a specific statement
-- you only need to list the roles and schemas that need to be reset
do $$
declare
    r text;
    s text;
    -- list roles which need resetting here
    role_list text[] = '{anonymous, api}';
    -- list schemas for which to reset privileges
    schema_list text[] = '{api, data, request, response, settings, firebase}';
begin
    foreach r in array role_list loop 
        foreach s in array schema_list loop 
            execute format('revoke all privileges on all tables    in schema %I from %I', s, r);
            execute format('revoke all privileges on all sequences in schema %I from %I', s, r);
            execute format('revoke all privileges on all functions in schema %I from %I', s, r);
            execute format('revoke all privileges on                  schema %I from %I', s, r);
        end loop;
    end loop;
end$$;

-- set the correct owner for all the api views
alter view
  api.todos
-- list all views here
-- , api.another_view
owner to api;


-- Loading roles privilege

-- specify which application roles can access this api (you'll probably list them all)
grant usage on schema request, response to public;
grant usage on schema api to anonymous;


-- give access to the view owner to this table
grant select, insert, update, delete on data.todo to api;

-- anonymous users can only request specific columns from this view
grant select, insert(id, todo, completed), update(todo, completed) on api.todos to anonymous;
-------------------------------------------------------------------------------
