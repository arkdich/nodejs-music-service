\c music_service

SELECT cron.schedule('delete_inactive_users', '*/15 * * * *',
    $$DELETE FROM public.users WHERE is_active = false AND created_at < NOW() - INTERVAL '5 minutes'$$);

SELECT cron.schedule('dump_cron_job_log','*/30 * * * *',
    $$COPY cron.job_run_details TO '/db/logs/cron.txt'$$);