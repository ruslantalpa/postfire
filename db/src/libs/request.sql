drop schema if exists request cascade;
create schema request;

create or replace function request.env_var(v text) returns text as $$
    select current_setting(v, true);
$$ stable language sql;

create or replace function request.jwt_claim(c text) returns text as $$
    select current_setting('request.jwt.claim.' || c, true);
$$ stable language sql;

create or replace function request.cookie(c text) returns text as $$
    select current_setting('request.cookie.' || c, true);
$$ stable language sql;

create or replace function request.header(h text) returns text as $$
    select current_setting('request.header.' || h, true);
$$ stable language sql;

create or replace function request.user_id() returns int as $$
    select 
    case coalesce(current_setting('request.jwt.claim.user_id', true),'')
    when '' then 0
    else current_setting('request.jwt.claim.user_id', true)::int
	end
$$ stable language sql;

create or replace function request.user_role() returns text as $$
    select current_setting('request.jwt.claim.role', true)::text;
$$ stable language sql;

create or replace function request.validate(
  valid boolean, 
  err text,
  details text default '',
  hint text default '',
  errcode text default 'P0001'
) returns boolean as $$
begin
   if valid then
      return true;
   else
      RAISE EXCEPTION '%', err USING
      DETAIL = details, 
      HINT = hint, 
      ERRCODE = errcode;
   end if;
end
$$ stable language plpgsql;


-- {
--     "id": "f816c773-cc2d-44b7-8973-6a2bbd529c4e",
--     "jwt.claims": {},
--     "headers": {},
--     "cookies": {},
--     "get": [{"f":"completed", "v":true, "o":"eq", "n":false}]
-- }

create or replace function request.set_env(r json) returns BOOLEAN as $$
declare
    _key text;
    _value text;
    _g json;
begin
    for _key, _value in select * from json_each_text(r->'jwt.claims') loop
       perform set_config('request.jwt.claim.'||_key, _value, true);
    --    raise notice 'request.jwt.claim.%: %', _key, _value;
    end loop;
    for _key, _value in select * from json_each_text(r->'headers') loop
       perform set_config('request.header.'||_key, _value, true);
    --    raise notice 'request.header.%: %', _key, _value;
    end loop;
    for _key, _value in select * from json_each_text(r->'cookies') loop
       perform set_config('request.cookie.'||_key, _value, true);
    --    raise notice 'request.cookie.%: %', _key, _value;
    end loop;
    for _g in select * from json_array_elements (r->'get') loop
       perform set_config(
           'request.get.' || (_g->>'f')::text
           , json_build_object(
               'v', _g->'v',
               'o', _g->'o',
               'n', _g->'n'
           )::text
           , true);
    end loop;
    
    return true;
end
$$ volatile language plpgsql;