-- This file contains the definition of the applications specific roles
-- the roles defined here should not be made owners of database entities (tables/views/...)

\echo # Loading roles

-- the role used by postgrest to connect to the database
-- notice how this role does not have any privileges attached specifically to it
-- it can only switch to other roles
drop role if exists :authenticator;
create role :"authenticator" with login password :'authenticator_pass';
alter role :"authenticator" SET log_statement = 'all'; -- this is only used in local development
-- uncomment this line if you want to use the authenticator role for streaming WAL using pg-event-proxy (see docker-compose.yaml for more details)
-- alter role :"authenticator" with REPLICATION;

-- this is an application level role
-- requests that are not authenticated will be executed with this role's privileges
drop role if exists :"anonymous";
create role :"anonymous";
grant :"anonymous" to :"authenticator";

