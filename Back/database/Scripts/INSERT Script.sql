INSERT INTO "User"(
            email, num_tel, nom, prenom, password)
    VALUES ('josiane@gmail.com', '0639393038', 'Doelode', 'Josiane', 'cryptedsomething'),
    ('thierry@gmail.com', '0620302038', 'Sanchez', 'Thierry', 'cryptedsomething'),
    ('hugues@gmail.com', '0623927658', 'Greudo', 'Hugues', 'cryptedsomething'),
    ('laetitia@gmail.com', '0632392038', 'Ioputre', 'Laetitia', 'cryptedsomething'),
    ('dominique@gmail.com', '0623392038', 'Folin', 'Dominique', 'cryptedsomething'),
    ('christian@gmail.com', '0629992038', 'Perez', 'Christian', 'cryptedsomething');


INSERT INTO "Praticien"(
            email, num_tel, nom, prenom, adresse, code_postal, 
            ville, tarif, carte_vitale, ascenseur, acces_handicap, num_tab_ordre)
    VALUES ('dr.souques@gmail.com', '0563288393', 'Souques', 'Pierre', '10 rue des lavandes', '31000', 
            'Toulouse', '23€', 'true', 'false', 'true', 938203440),
	    	('dr.xin@gmail.com', '0567688393', 'Xin', 'Jiu', '3 avenue de Metz', '31000', 
            'Toulouse', '23€', 'true', 'false', 'false', 938849440),
            ('dr.reoduno@gmail.com', '0563288393', 'Reoduno', 'Henri', '2 place de la libération', '31000', 
            'Toulouse', '23€', 'true', 'true', 'true', 938203990),
            ('dr.xavier@gmail.com', '0563239333', 'Xavier', 'Alonso', '4 chemin de la coquinette', '31000', 
            'Toulouse', '23€', 'false', 'true', 'true', 966203440),
            ('dr.frotubo@gmail.com', '0563288393', 'Frotubo', 'Michel', '2 rue des boulangers', '31000', 
            'Toulouse', '23€', 'true', 'false', 'false', 988203440);


INSERT INTO "Rdv"(
            date, heure_deb, motif, "IdPraticien_Praticien", "idUser_User")
    VALUES ('2014-09-11', '15:00', '', 1, 1), 
    ('2014-09-11', '17:00', '', 2, 2),
    ('2014-09-11', '16:00', '', 2, 3),
    ('2014-09-12', '10:00', '', 3, 1),
    ('2014-09-12', '14:00', '', 3, 4),
    ('2014-09-12', '15:00', '', 3, 5),
    ('2014-09-15', '10:30', '', 4, 2),
    ('2014-09-15', '11:00', '', 4, 6),
    ('2014-09-15', '16:00', '', 5, 3),
    ('2014-09-16', '16:00', '', 5, 5),
    ('2014-09-16', '16:00', '', 1, 3),
    ('2014-09-16', '16:20', '', 1, 6);


INSERT INTO "Specialite"(
            "labelSpecialite")
    VALUES ('KINESITHERAPEUTE'),('GENERALISTE'),('OSTHEOPATHE'),('DENTISTE'),('GYNECOLOGUE');


INSERT INTO "Possede"(
            "IdPraticien_Praticien", "idSpecialite_Specialite")
    VALUES (1, 1),(2,2),(3,3),(4,4),(5,5),(1,3);


INSERT INTO "Paiements"(
            "labelPaiement")
    VALUES ('CB'),('LIQUIDE'),('CHEQUE');


