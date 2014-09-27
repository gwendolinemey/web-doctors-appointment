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
CREATE EXTENSION postgis;
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
	tarif text,
	carte_vitale boolean,
	ascenseur boolean NOT NULL,
	acces_handicap boolean NOT NULL,
	num_tab_ordre text NOT NULL,
	coord geometry(POINT, 3857),
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


-- object: public."Rdv" | type: TABLE --
-- DROP TABLE public."Rdv";
CREATE TABLE public."Rdv"(
	"Idrdv" bigserial NOT NULL,
	date date NOT NULL,
	heure_deb time NOT NULL,
	motif text,
	"IdPraticien_Praticien" integer NOT NULL,
	"idUser_User" integer,
	CONSTRAINT pk_rdv PRIMARY KEY ("Idrdv")

);
-- ddl-end --
-- object: "Praticien_fk" | type: CONSTRAINT --
-- ALTER TABLE public."Rdv" DROP CONSTRAINT "Praticien_fk";
ALTER TABLE public."Rdv" ADD CONSTRAINT "Praticien_fk" FOREIGN KEY ("IdPraticien_Praticien")
REFERENCES public."Praticien" ("IdPraticien") MATCH FULL
ON DELETE CASCADE ON UPDATE CASCADE;
-- ddl-end --


-- object: "User_fk" | type: CONSTRAINT --
-- ALTER TABLE public."Rdv" DROP CONSTRAINT "User_fk";
ALTER TABLE public."Rdv" ADD CONSTRAINT "User_fk" FOREIGN KEY ("idUser_User")
REFERENCES public."User" ("idUser") MATCH FULL
ON DELETE CASCADE ON UPDATE CASCADE;
-- ddl-end --


-- object: public."Paiements" | type: TABLE --
-- DROP TABLE public."Paiements";
CREATE TABLE public."Paiements"(
	"idPaiement" serial NOT NULL,
	"labelPaiement" text NOT NULL,
	CONSTRAINT pk_paiement PRIMARY KEY ("idPaiement")

);
-- ddl-end --
-- object: public.propose | type: TABLE --
-- DROP TABLE public.propose;
CREATE TABLE public.propose(
	"IdPraticien_Praticien" integer,
	"idPaiement_Paiements" integer,
	CONSTRAINT propose_pk PRIMARY KEY ("IdPraticien_Praticien","idPaiement_Paiements")

);
-- ddl-end --
-- object: "Praticien_fk" | type: CONSTRAINT --
-- ALTER TABLE public.propose DROP CONSTRAINT "Praticien_fk";
ALTER TABLE public.propose ADD CONSTRAINT "Praticien_fk" FOREIGN KEY ("IdPraticien_Praticien")
REFERENCES public."Praticien" ("IdPraticien") MATCH FULL
ON DELETE CASCADE ON UPDATE CASCADE;
-- ddl-end --


-- object: "Paiements_fk" | type: CONSTRAINT --
-- ALTER TABLE public.propose DROP CONSTRAINT "Paiements_fk";
ALTER TABLE public.propose ADD CONSTRAINT "Paiements_fk" FOREIGN KEY ("idPaiement_Paiements")
REFERENCES public."Paiements" ("idPaiement") MATCH FULL
ON DELETE CASCADE ON UPDATE CASCADE;
-- ddl-end --



