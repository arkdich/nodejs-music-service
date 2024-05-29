\c music_service

DO $$
DECLARE
    twenty_one_pilots VARCHAR(100) := 'Twenty One Pilots';
    arctic_monkeys VARCHAR(100) := 'Arctic Monkeys';
    the_neighbourhood VARCHAR(100) := 'The Neighbourhood';
    red_hot_chilli_peppers VARCHAR(100) := 'Red Hot Chilli Peppers';

    twenty_one_pilots_id uuid;
    arctic_monkeys_id uuid;
    the_neighbourhood_id uuid;
    red_hot_chilli_peppers_id uuid;

    artesha_id uuid;
BEGIN
    INSERT INTO public.users (login,password) VALUES
        ('root','admin');

    INSERT INTO public.users (login,password) VALUES
        ('artesha','qwerty')
    RETURNING id INTO artesha_id;

    INSERT INTO public.artist (name,grammy) VALUES
        (twenty_one_pilots,true)
    RETURNING id INTO twenty_one_pilots_id;

    INSERT INTO public.artist (name,grammy) VALUES
        (arctic_monkeys,true)
    RETURNING id INTO arctic_monkeys_id;

    INSERT INTO public.artist (name,grammy) VALUES
        (the_neighbourhood,false)
    RETURNING id INTO the_neighbourhood_id;

    INSERT INTO public.artist (name,grammy) VALUES
        (red_hot_chilli_peppers,true)
    RETURNING id INTO red_hot_chilli_peppers_id;

    INSERT INTO public.album (name,artist_id,year) VALUES
        ('Blurryface',twenty_one_pilots_id,2015),
        ('Trench',twenty_one_pilots_id,2018),
        ('I Love You',the_neighbourhood_id,2013),
        ('Wiped Out!',the_neighbourhood_id,2015),
        ('Favorite Worst Nightmare',arctic_monkeys_id,2007),
        ('AM',arctic_monkeys_id,2013),
        ('By the Way',red_hot_chilli_peppers_id,2002),
        ('Californication',red_hot_chilli_peppers_id,1999);

    INSERT INTO public.track (name,artist_id,duration) VALUES
        ('Stressed Out',twenty_one_pilots_id,200),
        ('Heavydirtysoul',twenty_one_pilots_id,234),
        ('Heathens',twenty_one_pilots_id,190),
        ('Levitate',twenty_one_pilots_id,190),
        ('R.I.P. 2 My Youth',the_neighbourhood_id,190),
        ('Daddy Issues',the_neighbourhood_id,200),
        ('Do I Wanna Know?',arctic_monkeys_id,200),
        ('R U Mine?',arctic_monkeys_id,190),
        ('505',arctic_monkeys_id,190),
        ('By the Way',red_hot_chilli_peppers_id,200),
        ('Can''t Stop',red_hot_chilli_peppers_id,190);
END $$