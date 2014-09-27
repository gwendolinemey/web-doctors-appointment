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
            motif, title, "allDay", startevent, endevent, url, "classeName", 
            editable, "startEditable", "durationEditable", color, "backgroundColor", 
            "borderColor", "textColor", "idPraticien_Praticien", "idUser_User")
    VALUES ('motif1', 'title1', false, '2014-09-26T16:00:00+02:00', '2014-09-26T16:30:00+02:00', 'www.rapidocteur.fr', 'class', true, true, true, '', '', '', '', 1, 1), 
    ('motif2', 'title2', false, '2014-09-26T16:30:00+02:00', '2014-09-26T17:00:00+02:00', 'www.rapidocteur.fr', 'class', true, true, true, '', '', '', '', 2, 2),
    ('motif3', 'title3', false, '2014-09-26T17:00:00+02:00', '2014-09-26T17:30:00+02:00', 'www.rapidocteur.fr', 'class', true, true, true, '', '', '', '', 2, 3),
    ('motif4', 'title4', false, '2014-09-26T14:00:00+02:00', '2014-09-26T14:30:00+02:00', 'www.rapidocteur.fr', 'class', true, true, true, '', '', '', '', 3, 1),
    ('motif5', 'title5', false, '2014-09-26T14:30:00+02:00', '2014-09-26T15:00:00+02:00', 'www.rapidocteur.fr', 'class', true, true, true, '', '', '', '', 3, 4),
    ('motif6', 'title6', false, '2014-09-26T15:00:00+02:00', '2014-09-26T15:30:00+02:00', 'www.rapidocteur.fr', 'class', true, true, true, '', '', '', '', 3, 5),
    ('motif7', 'title7', false, '2014-09-27T16:00:00+02:00', '2014-09-27T16:30:00+02:00', 'www.rapidocteur.fr', 'class', true, true, true, '', '', '', '', 4, 2),
    ('motif8', 'title8', false, '2014-09-27T09:00:00+02:00', '2014-09-27T09:30:00+02:00', 'www.rapidocteur.fr', 'class', true, true, true, '', '', '', '', 4, 6),
    ('motif9', 'title9', false, '2014-09-27T10:00:00+02:00', '2014-09-27T10:30:00+02:00', 'www.rapidocteur.fr', 'class', true, true, true, '', '', '', '', 5, 3),
    ('motif10', 'title10', false, '2014-09-27T11:00:00+02:00', '2014-09-27T11:30:00+02:00', 'www.rapidocteur.fr', 'class', true, true, true, '', '', '', '', 5, 5),
    ('motif11', 'title11', false, '2014-09-27T18:00:00+02:00', '2014-09-27T18:30:00+02:00', 'www.rapidocteur.fr', 'class', true, true, true, '', '', '', '', 1, 3),
    ('motif12', 'title12', false, '2014-09-27T19:00:00+02:00', '2014-09-27T19:30:00+02:00', 'www.rapidocteur.fr', 'class', true, true, true, '', '', '', '', 1, 6);


INSERT INTO "Specialite"(
            "labelSpecialite")
    VALUES ('KINESITHERAPEUTE'),('GENERALISTE'),('OSTHEOPATHE'),('DENTISTE'),('GYNECOLOGUE');


INSERT INTO "Possede"(
            "idPraticien_Praticien", "idSpecialite_Specialite")
    VALUES (1, 1),(2,2),(3,3),(4,4),(5,5),(1,3);


INSERT INTO "Paiements"(
            "labelPaiement")
    VALUES ('CB'),('LIQUIDE'),('CHEQUE');


