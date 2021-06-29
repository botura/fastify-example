CREATE TABLE public.manufacturers (
	id serial NOT NULL,
	name text NOT NULL,
	CONSTRAINT manufacturers_name_key UNIQUE (name),
	CONSTRAINT manufacturers_pkey PRIMARY KEY (id)
);

CREATE TABLE public.users (
	id serial NOT NULL,
	email text NOT NULL,
	"password" text NOT NULL,
	"name" text NULL,
	birthday date NULL,
	"role" text NOT NULL,
	CONSTRAINT users_email_key UNIQUE (email),
	CONSTRAINT users_pkey PRIMARY KEY (id)
);

CREATE TABLE public.vehicles (
	id serial NOT NULL,
	userid int4 NOT NULL,
	manufacturerid int4 NOT NULL,
	"year" int4 NULL,
	price numeric(9, 2) NULL,
	firstowner bool NULL,
	CONSTRAINT vehicles_pkey PRIMARY KEY (id)
);
