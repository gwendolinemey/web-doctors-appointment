-- Database generated with pgModeler (PostgreSQL Database Modeler).
-- pgModeler  version: 0.7.2
-- PostgreSQL version: 9.3
-- Project Site: pgmodeler.com.br
-- Model Author: ---

SET check_function_bodies = false;
-- ddl-end --


-- Database creation must be done outside an multicommand file.
-- These commands were put in this file only for convenience.
-- -- object: rapidocteur | type: DATABASE --
-- -- DROP DATABASE rapidocteur;
-- CREATE DATABASE rapidocteur
-- ;
-- -- ddl-end --
-- 

-- object: public."Praticien" | type: TABLE --
-- DROP TABLE public."Praticien";
CREATE TABLE public."Praticien"(
	"IdPraticien" serial,
	email text NOT NULL,
	num_tel text,
	nom text NOT NULL,
	prenom text NOT NULL,
	adresse text NOT NULL,
	code_postal text NOT NULL,
	ville text NOT NULL,
	CONSTRAINT pk_praticien PRIMARY KEY ("IdPraticien")

);
-- ddl-end --
-- object: public."User" | type: TABLE --
-- DROP TABLE public."User";
CREATE TABLE public."User"(
	"idUser" serial NOT NULL,
	email text NOT NULL,
	num_tel text,
	nom text NOT NULL,
	prenom text NOT NULL,
	password text NOT NULL,
	CONSTRAINT pk_user PRIMARY KEY ("idUser"),
	CONSTRAINT unique_mail_user UNIQUE (email)

);
-- ddl-end --
-- object: public."Jours" | type: TABLE --
-- DROP TABLE public."Jours";
CREATE TABLE public."Jours"(
	"idJour" serial NOT NULL,
	"labelJour" text NOT NULL,
	CONSTRAINT pk_jours PRIMARY KEY ("idJour"),
	CONSTRAINT unique_jour_label_jours UNIQUE ("labelJour")

);
-- ddl-end --
-- object: public."Consulte" | type: TABLE --
-- DROP TABLE public."Consulte";
CREATE TABLE public."Consulte"(
	"idUser_User" integer,
	"IdPraticien_Praticien" integer,
	date date NOT NULL,
	heure_deb time NOT NULL,
	CONSTRAINT "Consulte_pk" PRIMARY KEY ("idUser_User","IdPraticien_Praticien")

);
-- ddl-end --
-- object: "User_fk" | type: CONSTRAINT --
-- ALTER TABLE public."Consulte" DROP CONSTRAINT "User_fk";
ALTER TABLE public."Consulte" ADD CONSTRAINT "User_fk" FOREIGN KEY ("idUser_User")
REFERENCES public."User" ("idUser") MATCH FULL
ON DELETE CASCADE ON UPDATE CASCADE;
-- ddl-end --


-- object: "Praticien_fk" | type: CONSTRAINT --
-- ALTER TABLE public."Consulte" DROP CONSTRAINT "Praticien_fk";
ALTER TABLE public."Consulte" ADD CONSTRAINT "Praticien_fk" FOREIGN KEY ("IdPraticien_Praticien")
REFERENCES public."Praticien" ("IdPraticien") MATCH FULL
ON DELETE CASCADE ON UPDATE CASCADE;
-- ddl-end --


-- object: public.assure | type: TABLE --
-- DROP TABLE public.assure;
CREATE TABLE public.assure(
	"IdPraticien_Praticien" integer,
	"idJour_Jours" integer,
	heure_deb time NOT NULL,
	heure_fin time NOT NULL,
	CONSTRAINT assure_pk PRIMARY KEY ("IdPraticien_Praticien","idJour_Jours")

);
-- ddl-end --
-- object: "Praticien_fk" | type: CONSTRAINT --
-- ALTER TABLE public.assure DROP CONSTRAINT "Praticien_fk";
ALTER TABLE public.assure ADD CONSTRAINT "Praticien_fk" FOREIGN KEY ("IdPraticien_Praticien")
REFERENCES public."Praticien" ("IdPraticien") MATCH FULL
ON DELETE CASCADE ON UPDATE CASCADE;
-- ddl-end --


-- object: "Jours_fk" | type: CONSTRAINT --
-- ALTER TABLE public.assure DROP CONSTRAINT "Jours_fk";
ALTER TABLE public.assure ADD CONSTRAINT "Jours_fk" FOREIGN KEY ("idJour_Jours")
REFERENCES public."Jours" ("idJour") MATCH FULL
ON DELETE CASCADE ON UPDATE CASCADE;
-- ddl-end --


-- object: public."Specialite" | type: TABLE --
-- DROP TABLE public."Specialite";
CREATE TABLE public."Specialite"(
	"idSpecialite" serial NOT NULL,
	"labelSpecialite" text NOT NULL,
	CONSTRAINT pk_specialite PRIMARY KEY ("idSpecialite")

);
-- ddl-end --
-- object: public."Possede" | type: TABLE --
-- DROP TABLE public."Possede";
CREATE TABLE public."Possede"(
	"IdPraticien_Praticien" integer,
	"idSpecialite_Specialite" integer,
	CONSTRAINT "Possede_pk" PRIMARY KEY ("IdPraticien_Praticien","idSpecialite_Specialite")

);
-- ddl-end --
-- object: "Praticien_fk" | type: CONSTRAINT --
-- ALTER TABLE public."Possede" DROP CONSTRAINT "Praticien_fk";
ALTER TABLE public."Possede" ADD CONSTRAINT "Praticien_fk" FOREIGN KEY ("IdPraticien_Praticien")
REFERENCES public."Praticien" ("IdPraticien") MATCH FULL
ON DELETE CASCADE ON UPDATE CASCADE;
-- ddl-end --


-- object: "Specialite_fk" | type: CONSTRAINT --
-- ALTER TABLE public."Possede" DROP CONSTRAINT "Specialite_fk";
ALTER TABLE public."Possede" ADD CONSTRAINT "Specialite_fk" FOREIGN KEY ("idSpecialite_Specialite")
REFERENCES public."Specialite" ("idSpecialite") MATCH FULL
ON DELETE CASCADE ON UPDATE CASCADE;
-- ddl-end --



