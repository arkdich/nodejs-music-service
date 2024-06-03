\c music_service

DO $$
DECLARE
   row RECORD;
   first_user_id uuid;
   second_user_id uuid;
BEGIN
    SELECT id INTO first_user_id FROM public.users LIMIT 1;
    SELECT id INTO second_user_id FROM public.users OFFSET 1 LIMIT 1;

    FOR row IN
        SELECT public.track.id as track_id, public.artist.id as artist_id
        FROM public.track
        JOIN public.artist ON public.track.artist_id = public.artist.id
        WHERE public.artist.name = 'Red Hot Chilli Peppers'
    LOOP
        INSERT INTO public.favorite_track (user_id,track_id)
        VALUES (first_user_id,row.track_id)
        ON CONFLICT DO NOTHING;
    END LOOP;

    INSERT INTO public.favorite_artist (user_id,artist_id)
    VALUES (second_user_id,row.artist_id)
    ON CONFLICT DO NOTHING;

    FOR row IN
        SELECT public.track.id as track_id, public.artist.id as artist_id, public.album.id as album_id
        FROM public.track
        LEFT JOIN public.artist ON public.artist.id = public.track.artist_id
        LEFT JOIN public.album ON public.album.id = public.track.album_id
        WHERE public.artist.name = 'Twenty One Pilots'
    LOOP
        INSERT INTO public.favorite_track (user_id,track_id)
        VALUES (second_user_id,row.track_id)
        ON CONFLICT DO NOTHING;
    END LOOP;

    INSERT INTO public.favorite_artist (user_id,artist_id)
    VALUES (second_user_id,row.artist_id)
    ON CONFLICT DO NOTHING;
END $$