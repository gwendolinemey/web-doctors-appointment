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
	"idPraticien" serial,
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
	CONSTRAINT pk_praticien PRIMARY KEY ("idPraticien")

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
	"idSpecialite_Specialite" integer,
	"idPraticien_Praticien" integer,
	CONSTRAINT "Possede_pk" PRIMARY KEY ("idSpecialite_Specialite","idPraticien_Praticien")

);
-- ddl-end --
-- object: "Praticien_fk" | type: CONSTRAINT --
-- ALTER TABLE public."Possede" DROP CONSTRAINT "Praticien_fk";
ALTER TABLE public."Possede" ADD CONSTRAINT "Praticien_fk" FOREIGN KEY ("idPraticien_Praticien")
REFERENCES public."Praticien" ("idPraticien") MATCH FULL
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
	"idRdv" bigserial NOT NULL,
	motif text,
	title text NOT NULL,
	"allDay" boolean,
	startEvent timestamptz NOT NULL,
	endEvent timestamptz,
	url text,
	"classeName" text,
	editable boolean,
	"startEditable" boolean,
	"durationEditable" boolean,
	color text,
	"backgroundColor" text,
	"borderColor" text,
	"textColor" text,
	"idPraticien_Praticien" integer NOT NULL,
	"idUser_User" integer,
	CONSTRAINT pk_rdv PRIMARY KEY ("idRdv")

);
-- ddl-end --
-- object: "Praticien_fk" | type: CONSTRAINT --
-- ALTER TABLE public."Rdv" DROP CONSTRAINT "Praticien_fk";
ALTER TABLE public."Rdv" ADD CONSTRAINT "Praticien_fk" FOREIGN KEY ("idPraticien_Praticien")
REFERENCES public."Praticien" ("idPraticien") MATCH FULL
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
-- object: public."Propose" | type: TABLE --
-- DROP TABLE public."Propose";
CREATE TABLE public."Propose"(
	"idPraticien_Praticien" integer,
	"idPaiement_Paiements" integer,
	CONSTRAINT "Propose_pk" PRIMARY KEY ("idPraticien_Praticien","idPaiement_Paiements")

);
-- ddl-end --
-- object: "Praticien_fk" | type: CONSTRAINT --
-- ALTER TABLE public."Propose" DROP CONSTRAINT "Praticien_fk";
ALTER TABLE public."Propose" ADD CONSTRAINT "Praticien_fk" FOREIGN KEY ("idPraticien_Praticien")
REFERENCES public."Praticien" ("idPraticien") MATCH FULL
ON DELETE CASCADE ON UPDATE CASCADE;
-- ddl-end --


-- object: "Paiements_fk" | type: CONSTRAINT --
-- ALTER TABLE public."Propose" DROP CONSTRAINT "Paiements_fk";
ALTER TABLE public."Propose" ADD CONSTRAINT "Paiements_fk" FOREIGN KEY ("idPaiement_Paiements")
REFERENCES public."Paiements" ("idPaiement") MATCH FULL
ON DELETE CASCADE ON UPDATE CASCADE;
-- ddl-end --



