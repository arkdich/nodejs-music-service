CREATE DATABASE music_service;
\c music_service

CREATE TABLE public.users (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY UNIQUE, 
    login character varying(100) NOT NULL,
    password character varying(100) NOT NULL,
    version character varying(100),
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

CREATE TABLE public.artist (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY UNIQUE,
    name character varying(100) NOT NULL,
    grammy boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

CREATE TABLE public.track (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY UNIQUE,
    name character varying(100) NOT NULL,
    artist_id uuid REFERENCES public.artist(id),
    album_id uuid REFERENCES public.artist(id),  
    duration integer NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

CREATE TABLE public.album (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY UNIQUE,
    name character varying(100) NOT NULL,
    year integer NOT NULL NOT NULL, 
    artist_id uuid REFERENCES public.artist(id),
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

CREATE TABLE public.favorite (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY UNIQUE,
    name character varying(100) NOT NULL,
    year integer NOT NULL NOT NULL, 
    artist_id uuid REFERENCES public.artist(id),
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);