create table todo (
    id text primary key default firebase.new_id(),
    todo  text not null,
    completed boolean not null default false,
    created_on timestamp not null default now(),
    updated_on timestamp not null default now()
);

create or replace function set_updated_on() returns trigger as $$
begin
  new.updated_on = now();
  return new;
end
$$ language plpgsql;

create trigger application_set_updated_on
    before update on todo for each row
    execute procedure set_updated_on ();
