# InDocify Database Schema

This document provides the complete database schema for InDocify. Use these SQL statements to set up your Supabase database.

## Core Tables

### `threads` Table
```sql
create table threads (
  id uuid primary key default uuid_generate_v4(),
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now()),
  thread_id text,
  repo text,
  email text,
  message text,
  title text,
  owner text
);
```

### `github_repos` Table
```sql
[polar_customer_id]
  id uuid primary key default uuid_generate_v4(),
  created_at timestamp with time zone default timezone('utc'::text, now()),
  description text,
  owner text,
  email text,
  name text,
  url text
;
```

### `waitlist` Table
```sql
create table waitlist (
  id uuid primary key default uuid_generate_v4(),
  created_at timestamp with time zone default timezone('utc'::text, now()),
  email text
);
```

### `users` Table
```sql
create table users (
  id uuid primary key default uuid_generate_v4(),
  repo_count int4,
  name text,
  email text,
  image text,
  private_repo_count int4,
  github_access_token text,
  question_count int4
);
```

### `github_files` Table
```sql
create table github_files (
  id uuid primary key default uuid_generate_v4(),
  path text,
  content text,
  email text,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  repo text,
  owner text
);
```

### `github_docs` Table
```sql
create table github_docs (
  id uuid primary key default uuid_generate_v4(),
  mapping json,
  metadata json,
  email text,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  get_started text,
  architecture text,
  development_guidelines text,
  owner text,
  repo text
);
```

### `standby_files` Table
```sql
create table standby_files (
  id uuid primary key default uuid_generate_v4(),
  created_at timestamp with time zone default timezone('utc'::text, now()),
  file_id text,
  content json
);
```

## Payment and Subscription Tables

### `customers` Table
```sql
create table customers (
  id uuid primary key default uuid_generate_v4(),
  polar_customer_id text
);
```

### `subscriptions` Table
```sql
create table subscriptions (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id),
  status text,
  metadata json,
  cancel_at_period_end boolean,
  created timestamp with time zone default timezone('utc'::text, now()),
  current_period_start timestamp with time zone,
  current_period_end timestamp with time zone,
  price_id text,
  cancel_at timestamp with time zone,
  ended_at timestamp with time zone
);
```

### `prices` Table
```sql
create table prices (
  id uuid primary key default uuid_generate_v4(),
  product_id text,
  price_amount int4,
  type pricing_type,
  recurring_interval pricing_recurring_interval,
  metadata json
);
```

### `products` Table
```sql
create table products (
  id uuid primary key default uuid_generate_v4(),
  active boolean,
  name text,
  description text,
  image text,
  metadata json
);
```

## Enums

```sql
-- Create enum types for the prices table
create type pricing_type as enum ('one_time', 'recurring');
create type pricing_recurring_interval as enum ('day', 'week', 'month', 'year');
```

## Foreign Key Relationships

```sql
-- Add foreign key relationships
alter table subscriptions add constraint fk_subscriptions_price_id foreign key (price_id) references prices(id);
alter table prices add constraint fk_prices_product_id foreign key (product_id) references products(id);
```

## Indexes

```sql
-- Add indexes for better query performance
create index idx_threads_email on threads(email);
create index idx_github_repos_email on github_repos(email);
create index idx_github_files_email_repo on github_files(email, repo);
create index idx_github_docs_email_repo on github_docs(email, repo);
create index idx_users_email on users(email);
```

## RLS Policies (Row Level Security)

For production environments, consider setting up Row Level Security policies to restrict access to data:

```sql
-- Example RLS policy for threads table
alter table threads enable row level security;
create policy "Users can view their own threads" on threads for select using (auth.uid() = user_id);
create policy "Users can insert their own threads" on threads for insert with check (auth.uid() = user_id);
```

## Notes

- Adjust data types and constraints as needed for your specific use case.
- Consider adding additional indexes for fields frequently used in WHERE clauses.
- Update RLS policies based on your application's security requirements.
- Remember to set up appropriate backups for your database.