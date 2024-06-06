\c music_service

SELECT cron.schedule('delete_inactive_users', '*/10 * * * *',
    $$DELETE FROM public.users WHERE is_active = false AND created_at < NOW() - INTERVAL '5 minutes'$$);

SELECT cron.schedule('register_user','*/5 * * * *',
    $$INSERT INTO public.users (login, email, password) VALUES (now()::text, now()::text, now()::text)$$);

SELECT cron.schedule('dump_cron_job_log','*/15 * * * *',
    $$COPY cron.job_run_details TO '/db/logs/cron.txt'$$);