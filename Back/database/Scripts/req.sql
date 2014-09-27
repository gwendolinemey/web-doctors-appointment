
-- display booked rdv for all doctors
select "Rdv".*, "User".nom, "User".prenom 
from "Rdv", "User", "Praticien"
where "Rdv"."idUser_User" = "User"."idUser"
and "Rdv"."idPraticien_Praticien" = "Praticien"."idPraticien"

-- display booked rdv for doctor '1'
select "Rdv".*, "User".nom, "User".prenom 
from "Rdv", "User", "Praticien"
where "Rdv"."idUser_User" = "User"."idUser"
and "Rdv"."idPraticien_Praticien" = 1

-- display non-booked rdv for doctor '1'
select "Rdv".*, "User".nom, "User".prenom 
from "Rdv", "User", "Praticien"
where "Rdv"."idUser_User" = null
and "Rdv"."idPraticien_Praticien" = 1