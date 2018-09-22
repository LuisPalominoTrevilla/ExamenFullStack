CREATE TABLE role (
	id TINYINT UNSIGNED NOT NULL AUTO_INCREMENT,
	description VARCHAR(32) NOT NULL,
	PRIMARY KEY (id)
) ENGINE=INNODB CHARACTER SET=UTF8;

INSERT INTO role (description) VALUES ('admin'), ('manager'), ('accounting'), ('employee');

CREATE TABLE company (
	id INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
	nombre_legal VARCHAR(128) NOT NULL,
	nombre_comercial VARCHAR(128),
	rfc CHAR(12) NOT NULL,
	telefono VARCHAR(16) NOT NULL,
	fecha_registro DATE NOT NULL,
	PRIMARY KEY (id)
) ENGINE=INNODB CHARACTER SET=UTF8;

CREATE TABLE user (
	id INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
	nombre VARCHAR(64) NOT NULL,
	apellido VARCHAR(64) NOT NULL,
	correo VARCHAR(64) NOT NULL,
	password VARCHAR(255) NOT NULL,
	rol_id TINYINT UNSIGNED NOT NULL,
	company_id INTEGER UNSIGNED NOT NULL,
	PRIMARY KEY(id),
	FOREIGN KEY (rol_id) REFERENCES role(id)
	ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (company_id) REFERENCES company(id)
	ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=INNODB CHARACTER SET=UTF8;