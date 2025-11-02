create table if not exists characters (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  system text not null,
  name text not null,
  data jsonb not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create index if not exists characters_user_idx on characters(user_id);

create table if not exists portraits (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  character_id uuid,
  url text not null,
  key text,
  created_at timestamptz default now()
);
create index if not exists portraits_user_idx on portraits(user_id);

create table if not exists shares (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  character_id uuid not null,
  slug text unique not null,
  created_at timestamptz default now(),
  expires_at timestamptz
);
