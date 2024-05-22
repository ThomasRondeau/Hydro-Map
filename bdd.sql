
-- voir si le type POINT est pris en charge et voir également si cela ne serait pas mieux de faire une zone, ou bien de faire des règles de restriction plutot que des points d'intérêts potentiels

CREATE DATABASE hydroMap;
USE courtier;

CREATE TABLE contributor(
   id_contributor INT AUTO_INCREMENT,
   firstName VARCHAR(100),
   lastName VARCHAR(100),
   email VARCHAR(100) UNIQUE,
   password VARCHAR(100),
   institution VARCHAR(100),
   PRIMARY KEY(id_client)
);

CREATE TABLE PCH(
   id_pch INT AUTO_INCREMENT,
   position POINT,
   PCHName VARCHAR(100),
   technology VARCHAR(100),
   presentation VARCHAR(1000),
   id_contributor INT,
   PRIMARY KEY(id_banque),
   FOREIGN KEY (id_contributor) REFERENCES contributor(id_contributor)
);

CREATE TABLE InterestPoint(
   id_contrat INT AUTO_INCREMENT,
   position POINT,
   installablePower INT,
   presentation VARCHAR(1000),
   id_contributor INT,
   PRIMARY KEY(id_contrat),
   FOREIGN KEY (id_contributor) REFERENCES contributor(id_contributor)
);
