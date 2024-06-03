\c music_service

CREATE RULE protect_root_user AS
ON DELETE TO public.users
WHERE login = 'root'
DO INSTEAD NOTHING; 