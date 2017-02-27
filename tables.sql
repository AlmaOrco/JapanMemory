CREATE DATABASE memory;

USE memory;

CREATE TABLE card (
	id SERIAL,
	name VARCHAR(20) NOT NULL,
	image VARCHAR(20) NOT NULL,
	description VARCHAR(50) NOT NULL
);

CREATE TABLE player (
	name VARCHAR(20) NOT NULL,
	score BIGINT NOT NULL
);

/* testing values*/

INSERT INTO card (name, image, description)
	VALUES("primera","primera.jpg","primera carta de prueba");

INSERT INTO card (name, image, description)
	VALUES("segunda","segunda.jpg","segunda carta de prueba");

INSERT INTO card (name, image, description)
	VALUES("tercera","tercera.jpg","tercera carta de prueba");

INSERT INTO player (name, score)
	VALUES("primero", 10000);

INSERT INTO player (name, score)
	VALUES("segundo", 20000);
