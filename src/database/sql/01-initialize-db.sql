CREATE DATABASE music_service;
\c music_service

CREATE TABLE public.users (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(), 
    login character varying(100) NOT NULL UNIQUE,
    password character varying(100) NOT NULL,
    version integer NOT NULL DEFAULT 1,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE TABLE public.artist (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(), 
    name character varying(100) NOT NULL UNIQUE,
    grammy boolean NOT NULL DEFAULT false,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE TABLE public.album (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(), 
    name character varying(100) NOT NULL,
    year integer NOT NULL, 
    artist_id uuid REFERENCES public.artist(id),
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now(),
    UNIQUE (name, year, artist_id)
);

CREATE TABLE public.track (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(), 
    name character varying(100) NOT NULL,
    artist_id uuid REFERENCES public.artist(id),
    album_id uuid REFERENCES public.album(id),  
    duration integer NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE TABLE public.favorite_artist (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(), 
    user_id uuid REFERENCES public.users(id) NOT NULL, 
    artist_id uuid REFERENCES public.artist(id),
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now(),
    UNIQUE (user_id, artist_id)
);

CREATE TABLE public.favorite_album (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(), 
    user_id uuid REFERENCES public.users(id) NOT NULL, 
    album_id uuid REFERENCES public.album(id),
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now(),
    UNIQUE (user_id, album_id)
);

CREATE TABLE public.favorite_track (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(), 
    user_id uuid REFERENCES public.users(id) NOT NULL, 
    track_id uuid REFERENCES public.track(id),
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now(),
    UNIQUE (user_id, track_id)
);
