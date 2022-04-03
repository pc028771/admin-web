--
-- PostgreSQL database dump
--

-- Dumped from database version 14.2 (Debian 14.2-1.pgdg110+1)
-- Dumped by pg_dump version 14.2 (Debian 14.2-1.pgdg110+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: novize; Type: DATABASE; Schema: -; Owner: novize
--

CREATE DATABASE novize WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.utf8';


ALTER DATABASE novize OWNER TO novize;

\connect novize

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: privilegeType; Type: TYPE; Schema: public; Owner: novize
--

CREATE TYPE public."privilegeType" AS ENUM (
    'page',
    'button',
    'api',
    'acl',
    'route'
);


ALTER TYPE public."privilegeType" OWNER TO novize;

--
-- Name: roleTypes; Type: TYPE; Schema: public; Owner: novize
--

CREATE TYPE public."roleTypes" AS ENUM (
    'user',
    'manager',
    'employee'
);


ALTER TYPE public."roleTypes" OWNER TO novize;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: privileges; Type: TABLE; Schema: public; Owner: novize
--

CREATE TABLE public.privileges (
    id integer NOT NULL,
    type public."privilegeType" NOT NULL,
    key character varying(32) NOT NULL,
    acl smallint DEFAULT 0 NOT NULL,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.privileges OWNER TO novize;

--
-- Name: privileges_id_seq; Type: SEQUENCE; Schema: public; Owner: novize
--

CREATE SEQUENCE public.privileges_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.privileges_id_seq OWNER TO novize;

--
-- Name: privileges_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: novize
--

ALTER SEQUENCE public.privileges_id_seq OWNED BY public.privileges.id;


--
-- Name: rolePrivilege; Type: TABLE; Schema: public; Owner: novize
--

CREATE TABLE public."rolePrivilege" (
    "privilegeId" integer NOT NULL,
    "roleId" integer NOT NULL
);


ALTER TABLE public."rolePrivilege" OWNER TO novize;

--
-- Name: roles; Type: TABLE; Schema: public; Owner: novize
--

CREATE TABLE public.roles (
    id integer NOT NULL,
    name character varying(64) NOT NULL,
    type public."roleTypes" NOT NULL,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.roles OWNER TO novize;

--
-- Name: roles_id_seq; Type: SEQUENCE; Schema: public; Owner: novize
--

CREATE SEQUENCE public.roles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.roles_id_seq OWNER TO novize;

--
-- Name: roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: novize
--

ALTER SEQUENCE public.roles_id_seq OWNED BY public.roles.id;


--
-- Name: userRole; Type: TABLE; Schema: public; Owner: novize
--

CREATE TABLE public."userRole" (
    "userId" integer NOT NULL,
    "roleId" integer NOT NULL
);


ALTER TABLE public."userRole" OWNER TO novize;

--
-- Name: users; Type: TABLE; Schema: public; Owner: novize
--

CREATE TABLE public.users (
    id integer NOT NULL,
    "firstName" character varying(32),
    "lastName" character varying(32),
    account character varying(128) NOT NULL,
    email character(320),
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.users OWNER TO novize;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: novize
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO novize;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: novize
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: privileges id; Type: DEFAULT; Schema: public; Owner: novize
--

ALTER TABLE ONLY public.privileges ALTER COLUMN id SET DEFAULT nextval('public.privileges_id_seq'::regclass);


--
-- Name: roles id; Type: DEFAULT; Schema: public; Owner: novize
--

ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('public.roles_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: novize
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: privileges privileges_pkey; Type: CONSTRAINT; Schema: public; Owner: novize
--

ALTER TABLE ONLY public.privileges
    ADD CONSTRAINT privileges_pkey PRIMARY KEY (id);


--
-- Name: rolePrivilege rolePrivilege_pkey; Type: CONSTRAINT; Schema: public; Owner: novize
--

ALTER TABLE ONLY public."rolePrivilege"
    ADD CONSTRAINT "rolePrivilege_pkey" PRIMARY KEY ("privilegeId", "roleId");


--
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: novize
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- Name: userRole userRole_pkey; Type: CONSTRAINT; Schema: public; Owner: novize
--

ALTER TABLE ONLY public."userRole"
    ADD CONSTRAINT "userRole_pkey" PRIMARY KEY ("userId", "roleId");


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: novize
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: rolePrivilege rolePrivilege_privilegeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: novize
--

ALTER TABLE ONLY public."rolePrivilege"
    ADD CONSTRAINT "rolePrivilege_privilegeId_fkey" FOREIGN KEY ("privilegeId") REFERENCES public.privileges(id) NOT VALID;


--
-- Name: rolePrivilege rolePrivilege_roleId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: novize
--

ALTER TABLE ONLY public."rolePrivilege"
    ADD CONSTRAINT "rolePrivilege_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES public.roles(id) NOT VALID;


--
-- Name: userRole userRole_roleId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: novize
--

ALTER TABLE ONLY public."userRole"
    ADD CONSTRAINT "userRole_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES public.roles(id) NOT VALID;


--
-- Name: userRole userRole_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: novize
--

ALTER TABLE ONLY public."userRole"
    ADD CONSTRAINT "userRole_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) NOT VALID;


--
-- PostgreSQL database dump complete
--

