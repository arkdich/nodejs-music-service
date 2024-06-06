\c music_service

CREATE EXTENSION IF NOT EXISTS pg_cron;

CREATE RULE protect_root_user AS
ON DELETE TO public.users
WHERE login = 'root'
DO INSTEAD NOTHING; 