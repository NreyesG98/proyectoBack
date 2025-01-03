CREATE TABLE cursos (
  id_curso VARCHAR(255) PRIMARY KEY,
  nombre_curso VARCHAR(255) NOT NULL,
  nivel_curso VARCHAR(255) NOT NULL,
  profesor_curso VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO cursos (id_curso, nombre_curso, nivel_curso, profesor_curso) 
  VALUES ('1v2as3', 'Pre-Kinder D', 'preescolar', 'Casimiro Gonzales'),
  ('1v2s4', 'Pre-Kinder C', 'preescolar', 'Romualdo Ramirez');

SELECT * FROM cursos;