--
-- PostgreSQL database dump
--

-- Dumped from database version 14.4
-- Dumped by pg_dump version 14.4

-- Started on 2022-10-30 16:04:24

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 214 (class 1259 OID 277345)
-- Name: environment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.environment (
    environment character varying(100) NOT NULL
);


ALTER TABLE public.environment OWNER TO postgres;

--
-- TOC entry 210 (class 1259 OID 277322)
-- Name: exercise; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.exercise (
    exercise_id integer NOT NULL,
    exercise_name character varying(1000),
    weight_from double precision,
    weight_to double precision,
    weight_increment double precision,
    reps integer,
    sets integer
);


ALTER TABLE public.exercise OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 277321)
-- Name: exercise_exercise_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.exercise_exercise_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.exercise_exercise_id_seq OWNER TO postgres;

--
-- TOC entry 3375 (class 0 OID 0)
-- Dependencies: 209
-- Name: exercise_exercise_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.exercise_exercise_id_seq OWNED BY public.exercise.exercise_id;


--
-- TOC entry 218 (class 1259 OID 277392)
-- Name: exercise_in_workout; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.exercise_in_workout (
    workout_id integer NOT NULL,
    exercise_id integer NOT NULL
);


ALTER TABLE public.exercise_in_workout OWNER TO postgres;

--
-- TOC entry 212 (class 1259 OID 277335)
-- Name: muscle_group; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.muscle_group (
    muscle_group character varying(100) NOT NULL
);


ALTER TABLE public.muscle_group OWNER TO postgres;

--
-- TOC entry 213 (class 1259 OID 277340)
-- Name: time_of_day; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.time_of_day (
    time_of_day character varying(100) NOT NULL
);


ALTER TABLE public.time_of_day OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 277351)
-- Name: workout; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.workout (
    workout_id integer NOT NULL,
    name character varying(1000),
    workout_type character varying(100),
    duration interval,
    rest_interval interval,
    time_of_day character varying(100),
    weekday integer,
    water_intake_l double precision,
    environment character varying(100),
    CONSTRAINT workout_weekday_check CHECK (((weekday >= 1) AND (weekday <= 7)))
);


ALTER TABLE public.workout OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 277377)
-- Name: workout_target_muscle_group; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.workout_target_muscle_group (
    workout_id integer NOT NULL,
    target_muscle_group character varying(100) NOT NULL
);


ALTER TABLE public.workout_target_muscle_group OWNER TO postgres;

--
-- TOC entry 211 (class 1259 OID 277330)
-- Name: workout_type; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.workout_type (
    workout_type character varying(100) NOT NULL
);


ALTER TABLE public.workout_type OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 277350)
-- Name: workout_workout_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.workout_workout_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.workout_workout_id_seq OWNER TO postgres;

--
-- TOC entry 3376 (class 0 OID 0)
-- Dependencies: 215
-- Name: workout_workout_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.workout_workout_id_seq OWNED BY public.workout.workout_id;


--
-- TOC entry 3193 (class 2604 OID 277325)
-- Name: exercise exercise_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.exercise ALTER COLUMN exercise_id SET DEFAULT nextval('public.exercise_exercise_id_seq'::regclass);


--
-- TOC entry 3194 (class 2604 OID 277354)
-- Name: workout workout_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workout ALTER COLUMN workout_id SET DEFAULT nextval('public.workout_workout_id_seq'::regclass);


--
-- TOC entry 3365 (class 0 OID 277345)
-- Dependencies: 214
-- Data for Name: environment; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.environment (environment) FROM stdin;
gym
home
outdoors
\.


--
-- TOC entry 3361 (class 0 OID 277322)
-- Dependencies: 210
-- Data for Name: exercise; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.exercise (exercise_id, exercise_name, weight_from, weight_to, weight_increment, reps, sets) FROM stdin;
1	Flat Barbell Bench Press	40	50	2.5	10	4
2	Incline Dumbell Bench Press	30	30	0	10	4
3	Cable Crossover	20	25	1.5	10	3
4	Barbell Row	50	57.5	2.5	10	3
5	Lat pulldown	40	55	5	10	3
6	Deadlift	70	80	5	8	3
7	Barbell Squat	65	80	5	10	4
8	Romanian Deadlift	40	40	0	10	4
9	Barbell Calf Raise	30	40	2.5	10	4
10	Running	0	0	0	1	1
11	Squats	0	0	0	30	4
12	Pushups	0	0	0	30	4
13	Inverted Table Row	0	0	0	30	4
14	Pike Pushups	0	0	0	30	4
15	Crunches	0	0	0	30	4
16	Dumbell Curl	10	10	0	10	4
17	EZ-Bar Skullcrusher	20	20	0	10	4
18	Standing Wrist Curls	20	20	0	10	4
19	Standing Wrist Extensions	20	20	0	10	4
20	Dragon Flag	0	0	0	10	3
21	Lying Leg Raise	0	0	0	10	3
22	Ab-Wheel Rollout	0	0	0	10	3
23	Crunch	0	0	0	10	3
24	Plank	0	0	0	1	1
25	Incline Dumbell Press	30	40	2.5	10	4
26	Chest Supported Row	30	40	2.5	10	4
27	Overhead Press	30	40	2.5	10	4
28	Pull-ups	0	0	0	8	3
29	Incline Dumbell Curls	12	12	0	12	2
30	Incline Dumbell Extensions	10	10	0	12	2
31	Barbell Back Squat	80	100	5	5	5
32	Romaninan Deadlift	50	50	0	8	3
33	Bulgarian Split Squat	30	40	2.5	10	4
34	Glute Ham Raise	40	50	2.5	8	3
35	Standing Single Leg Calf Raise	16	16	0	10	3
36	Military Press	25	35	2.5	8	4
37	Lateral DUmbell Raise	8	8	0	10	4
38	Rear Delt Dumbell Raise	4	4	0	10	4
\.


--
-- TOC entry 3369 (class 0 OID 277392)
-- Dependencies: 218
-- Data for Name: exercise_in_workout; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.exercise_in_workout (workout_id, exercise_id) FROM stdin;
1	1
1	2
1	3
2	4
2	5
2	6
3	7
3	8
3	9
4	10
5	11
5	12
5	13
5	14
5	15
6	16
6	17
6	18
6	19
7	20
7	21
7	22
7	23
7	24
8	25
8	26
8	27
8	28
8	29
8	30
9	31
9	32
9	33
9	34
9	35
10	36
10	37
10	38
\.


--
-- TOC entry 3363 (class 0 OID 277335)
-- Dependencies: 212
-- Data for Name: muscle_group; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.muscle_group (muscle_group) FROM stdin;
chest
back
arms
shoulders
legs
abs
\.


--
-- TOC entry 3364 (class 0 OID 277340)
-- Dependencies: 213
-- Data for Name: time_of_day; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.time_of_day (time_of_day) FROM stdin;
morning
noon
afternoon
evening
night
\.


--
-- TOC entry 3367 (class 0 OID 277351)
-- Dependencies: 216
-- Data for Name: workout; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.workout (workout_id, name, workout_type, duration, rest_interval, time_of_day, weekday, water_intake_l, environment) FROM stdin;
1	Short chest workout	hypertrophy	00:30:00	00:01:00	afternoon	1	1.5	gym
2	Short back workout	hypertrophy	00:30:00	00:01:00	afternoon	2	1.5	gym
3	Short leg workout	hypertrophy	00:30:00	00:01:00	afternoon	3	2	gym
4	Long run	cardio	01:00:00	00:05:00	morning	4	2.5	outdoors
5	Home full body workout	hypertrophy	01:00:00	00:01:30	evening	1	1.5	home
6	Short arms workout	hypertrophy	00:30:00	00:01:00	afternoon	5	1.5	gym
7	Abs workout	hypertrophy	00:15:00	00:01:00	morning	6	0.5	home
8	Upper body workout	strength	01:30:00	00:02:00	morning	2	2.5	gym
9	Lower body workout	strength	01:30:00	00:02:00	morning	4	2.5	gym
10	Short shoulder workout	hypertrophy	00:30:00	00:01:00	afternoon	5	1.5	gym
\.


--
-- TOC entry 3368 (class 0 OID 277377)
-- Dependencies: 217
-- Data for Name: workout_target_muscle_group; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.workout_target_muscle_group (workout_id, target_muscle_group) FROM stdin;
1	chest
2	back
3	legs
4	legs
5	chest
5	back
5	arms
5	shoulders
5	legs
5	abs
6	arms
7	abs
8	chest
8	back
8	shoulders
8	arms
9	legs
10	shoulders
\.


--
-- TOC entry 3362 (class 0 OID 277330)
-- Dependencies: 211
-- Data for Name: workout_type; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.workout_type (workout_type) FROM stdin;
hypertrophy
strength
cardio
\.


--
-- TOC entry 3377 (class 0 OID 0)
-- Dependencies: 209
-- Name: exercise_exercise_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.exercise_exercise_id_seq', 38, true);


--
-- TOC entry 3378 (class 0 OID 0)
-- Dependencies: 215
-- Name: workout_workout_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.workout_workout_id_seq', 10, true);


--
-- TOC entry 3205 (class 2606 OID 277349)
-- Name: environment environment_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.environment
    ADD CONSTRAINT environment_pkey PRIMARY KEY (environment);


--
-- TOC entry 3213 (class 2606 OID 277396)
-- Name: exercise_in_workout exercise_in_workout_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.exercise_in_workout
    ADD CONSTRAINT exercise_in_workout_pkey PRIMARY KEY (workout_id, exercise_id);


--
-- TOC entry 3197 (class 2606 OID 277329)
-- Name: exercise exercise_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.exercise
    ADD CONSTRAINT exercise_pkey PRIMARY KEY (exercise_id);


--
-- TOC entry 3201 (class 2606 OID 277339)
-- Name: muscle_group muscle_group_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.muscle_group
    ADD CONSTRAINT muscle_group_pkey PRIMARY KEY (muscle_group);


--
-- TOC entry 3203 (class 2606 OID 277344)
-- Name: time_of_day time_of_day_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.time_of_day
    ADD CONSTRAINT time_of_day_pkey PRIMARY KEY (time_of_day);


--
-- TOC entry 3207 (class 2606 OID 277361)
-- Name: workout workout_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workout
    ADD CONSTRAINT workout_name_key UNIQUE (name);


--
-- TOC entry 3209 (class 2606 OID 277359)
-- Name: workout workout_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workout
    ADD CONSTRAINT workout_pkey PRIMARY KEY (workout_id);


--
-- TOC entry 3211 (class 2606 OID 277381)
-- Name: workout_target_muscle_group workout_target_muscle_group_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workout_target_muscle_group
    ADD CONSTRAINT workout_target_muscle_group_pkey PRIMARY KEY (workout_id, target_muscle_group);


--
-- TOC entry 3199 (class 2606 OID 277334)
-- Name: workout_type workout_type_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workout_type
    ADD CONSTRAINT workout_type_pkey PRIMARY KEY (workout_type);


--
-- TOC entry 3220 (class 2606 OID 277402)
-- Name: exercise_in_workout exercise_in_workout_exercise_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.exercise_in_workout
    ADD CONSTRAINT exercise_in_workout_exercise_id_fkey FOREIGN KEY (exercise_id) REFERENCES public.exercise(exercise_id);


--
-- TOC entry 3219 (class 2606 OID 277397)
-- Name: exercise_in_workout exercise_in_workout_workout_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.exercise_in_workout
    ADD CONSTRAINT exercise_in_workout_workout_id_fkey FOREIGN KEY (workout_id) REFERENCES public.workout(workout_id);


--
-- TOC entry 3216 (class 2606 OID 277372)
-- Name: workout workout_environment_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workout
    ADD CONSTRAINT workout_environment_fkey FOREIGN KEY (environment) REFERENCES public.environment(environment);


--
-- TOC entry 3218 (class 2606 OID 277387)
-- Name: workout_target_muscle_group workout_target_muscle_group_target_muscle_group_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workout_target_muscle_group
    ADD CONSTRAINT workout_target_muscle_group_target_muscle_group_fkey FOREIGN KEY (target_muscle_group) REFERENCES public.muscle_group(muscle_group);


--
-- TOC entry 3217 (class 2606 OID 277382)
-- Name: workout_target_muscle_group workout_target_muscle_group_workout_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workout_target_muscle_group
    ADD CONSTRAINT workout_target_muscle_group_workout_id_fkey FOREIGN KEY (workout_id) REFERENCES public.workout(workout_id);


--
-- TOC entry 3215 (class 2606 OID 277367)
-- Name: workout workout_time_of_day_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workout
    ADD CONSTRAINT workout_time_of_day_fkey FOREIGN KEY (time_of_day) REFERENCES public.time_of_day(time_of_day);


--
-- TOC entry 3214 (class 2606 OID 277362)
-- Name: workout workout_workout_type_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.workout
    ADD CONSTRAINT workout_workout_type_fkey FOREIGN KEY (workout_type) REFERENCES public.workout_type(workout_type);


-- Completed on 2022-10-30 16:04:25

--
-- PostgreSQL database dump complete
--

