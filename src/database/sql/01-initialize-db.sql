CREATE DATABASE music_service;
\c music_service

CREATE TABLE public.users (
    id uuid PRIMARY KEY NOT NULL UNIQUE DEFAULT gen_random_uuid(), 
    login character varying(100) NOT NULL,
    password character varying(100) NOT NULL,
    version integer NOT NULL DEFAULT 1,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now()
);


CREATE TABLE public.artist (
    id uuid PRIMARY KEY NOT NULL UNIQUE DEFAULT gen_random_uuid(), 
    name character varying(100) NOT NULL UNIQUE,
    grammy boolean NOT NULL DEFAULT false,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE TABLE public.album (
    id uuid PRIMARY KEY NOT NULL UNIQUE DEFAULT gen_random_uuid(), 
    name character varying(100) NOT NULL,
    year integer NOT NULL, 
    artist_id uuid REFERENCES public.artist(id),
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE TABLE public.track (
    id uuid PRIMARY KEY NOT NULL UNIQUE DEFAULT gen_random_uuid(), 
    name character varying(100) NOT NULL,
    artist_id uuid REFERENCES public.artist(id),
    album_id uuid REFERENCES public.album(id),  
    duration integer NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE TABLE public.favorite (
    id uuid PRIMARY KEY NOT NULL UNIQUE DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES public.users(id) NOT NULL UNIQUE, 
    artists uuid[] NOT NULL,
    albums uuid[] NOT NULL,
    tracks uuid[] NOT NULL
);