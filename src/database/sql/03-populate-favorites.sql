\c music_service

DO $$
DECLARE
    v_track_id uuid;
    v_user_id uuid;
    v_artist_id uuid;
    v_album_id uuid;
    v_track_ids uuid[] := '{}';
BEGIN
    SELECT id INTO v_user_id FROM public.users WHERE login = 'artesha';
    SELECT id INTO v_artist_id FROM public.artist WHERE name = 'Arctic Monkeys';
    SELECT id INTO v_album_id FROM public.album WHERE name = 'Favorite Worst Nightmare';

    IF v_artist_id IS NULL OR v_album_id IS NULL THEN
        RAISE EXCEPTION 'Artist with id % or album with id % not found', v_artist_id, v_album_id;
    END IF;

    FOR v_track_id IN
        SELECT id FROM public.track WHERE artist_id = v_artist_id
    LOOP
        v_track_ids := array_append(v_track_ids,v_track_id);
    END LOOP;
        
    INSERT INTO public.favorite (user_id,artists,albums,tracks) VALUES
        (v_user_id,ARRAY[v_artist_id],ARRAY[v_album_id],v_track_ids);
END $$