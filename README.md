# MR-Project
Projekat iz mobilnog racunarstva - mobilna aplikacija za oglasavanje udzbenika

OPIS APLIKACIJE Aplikacija je namenjena studentima koji žele da prodaju svoje polovne ili nove udžbenike.
Na početnom ekranu se nalaze dva dugmeta gde jedno vodi ka login, a drugo ga signup (register) stranici.
Ulogovanom korisniku se prikazuje početna stranica sa svim postavljenim udžbenicima, koja je jedna od 3 dostupnih na tab-u.
Druge dve su omiljeni udženici (oni koje je korisnik označio kao omiljeni) i moji udžbenici (svi udžbenici koje je korisnik dodao).
Na stranici moji užbenici korisnik može da izmeni podatke o udžbeniku ili da ga obriše, kao i da doda nov udžbenik.
Klikom na meni na raspolaganju su dve opcije: prikaz podataka o korisniku i logout opcija.

OPIS BAZE U FIREBASE-U Postoje dve tabele gde jedna čuva podatke o udžbeniku (naziv, godina izdanja, cena, url slike, fakultet, smer,
godina studija, da li je korišćen i ako jeste da li je oštećen, kao i id korisnika koji je dodao užbenik), a druga dodatne podatke o korisniku
pored onih osnovnih koji se čuvaju prilikom autentikacije (ime, prezime, datum rođenja, email, fakultet, broj telefona i listu omiljenih
užbenika ukoliko ih ima).
