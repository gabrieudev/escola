-- CRIANDO BANCO E SCHEMA
CREATE DATABASE escola;

\c escola

CREATE SCHEMA escola AUTHORIZATION admin;

-- CRIANDO TABELAS
CREATE TABLE escola.tipo_curso (
    id_tipo_curso SERIAL PRIMARY KEY,
    tx_descricao  VARCHAR(150) NOT NULL UNIQUE CONSTRAINT uk_tipo_curso_tx_descricao UNIQUE
);

CREATE TABLE escola.tipo_disciplina (
    id_tipo_disciplina SERIAL PRIMARY KEY,
    tx_descricao       VARCHAR(150) NOT NULL UNIQUE CONSTRAINT uk_tipo_disciplina_tx_descricao UNIQUE
);

CREATE TABLE escola.instituicao (
    id_instituicao  SERIAL PRIMARY KEY,
    tx_sigla        VARCHAR(15) NOT NULL UNIQUE CONSTRAINT uk_instituicao_tx_sigla UNIQUE,
    tx_descricao    VARCHAR(150) NOT NULL UNIQUE CONSTRAINT uk_instituicao_tx_descricao UNIQUE
);

CREATE TABLE escola.titulo (
    id_titulo     SERIAL PRIMARY KEY,
    tx_descricao  VARCHAR(150) NOT NULL UNIQUE CONSTRAINT uk_titulo_tx_descricao UNIQUE
);

CREATE TABLE escola.aluno (
    id_aluno      SERIAL PRIMARY KEY,
    tx_nome       VARCHAR(100) NOT NULL UNIQUE CONSTRAINT uk_aluno_tx_nome UNIQUE,
    tx_sexo       CHAR(1) NOT NULL CONSTRAINT ck_aluno_tx_sexo CHECK (tx_sexo IN ('m', 'f')),
    dt_nascimento DATE NOT NULL
);

CREATE TABLE escola.professor (
    id_professor    SERIAL PRIMARY KEY,
    id_titulo       INTEGER NOT NULL REFERENCES escola.titulo(id_titulo) ON UPDATE CASCADE ON DELETE CASCADE,
    tx_nome         VARCHAR(50) NOT NULL UNIQUE CONSTRAINT uk_professor_tx_nome UNIQUE,
    tx_sexo         CHAR(1) NOT NULL DEFAULT 'm' CONSTRAINT ck_professor_tx_sexo CHECK (tx_sexo IN ('m', 'f')),
    tx_estado_civil CHAR(1) NOT NULL DEFAULT 's' CONSTRAINT ck_professor_tx_estado_civil CHECK (tx_estado_civil IN ('s', 'c', 'd')),
    dt_nascimento   DATE NOT NULL,
    tx_telefone     VARCHAR(13) NOT NULL UNIQUE CONSTRAINT uk_professor_tx_telefone UNIQUE
);

CREATE TABLE escola.curso (
    id_curso       SERIAL PRIMARY KEY,
    id_instituicao INTEGER NOT NULL REFERENCES escola.instituicao(id_instituicao) ON UPDATE CASCADE ON DELETE CASCADE,
    id_tipo_curso  INTEGER NOT NULL REFERENCES escola.tipo_curso(id_tipo_curso) ON UPDATE CASCADE ON DELETE CASCADE,
    tx_descricao   VARCHAR(150) NOT NULL UNIQUE CONSTRAINT uk_curso_tx_descricao UNIQUE
);

CREATE TABLE escola.disciplina (
    id_disciplina      SERIAL PRIMARY KEY,
    id_curso           INTEGER REFERENCES escola.curso(id_curso) ON UPDATE CASCADE ON DELETE CASCADE,
    id_tipo_disciplina INTEGER NOT NULL REFERENCES escola.tipo_disciplina(id_tipo_disciplina) ON UPDATE CASCADE ON DELETE CASCADE,
    tx_sigla           VARCHAR(10) NOT NULL UNIQUE CONSTRAINT uk_disciplina_tx_sigla UNIQUE,
    tx_descricao       VARCHAR(150) NOT NULL UNIQUE CONSTRAINT uk_disciplina_tx_descricao UNIQUE,
    in_periodo         INTEGER NOT NULL CONSTRAINT ck_disciplina_in_periodo CHECK (in_periodo >= 1),
    in_carga_horaria   INTEGER NOT NULL CONSTRAINT ck_disciplina_in_carga_horaria CHECK (in_carga_horaria >= 40)
);

CREATE TABLE escola.leciona (
    id_professor  INTEGER NOT NULL REFERENCES escola.professor(id_professor) ON UPDATE CASCADE ON DELETE CASCADE,
    id_disciplina INTEGER NOT NULL REFERENCES escola.disciplina(id_disciplina) ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY (id_professor, id_disciplina)
);

CREATE TABLE escola.cursa (
    id_aluno      INTEGER NOT NULL REFERENCES escola.aluno(id_aluno) ON UPDATE CASCADE ON DELETE CASCADE,
    id_disciplina INTEGER NOT NULL REFERENCES escola.disciplina(id_disciplina) ON UPDATE CASCADE ON DELETE CASCADE,
    in_ano        INTEGER NOT NULL,
    in_semestre   INTEGER NOT NULL,
    in_faltas     INTEGER NOT NULL CONSTRAINT ck_cursa_in_faltas CHECK (in_faltas >= 0),
    nm_nota1      NUMERIC(4,2) CONSTRAINT ck_cursa_nm_nota1 CHECK (nm_nota1 >= 0),
    nm_nota2      NUMERIC(4,2) CONSTRAINT ck_cursa_nm_nota2 CHECK (nm_nota2 >= 0),
    nm_nota3      NUMERIC(4,2) CONSTRAINT ck_cursa_nm_nota3 CHECK (nm_nota3 >= 0),
    bl_aprovado   BOOLEAN NOT NULL DEFAULT false,
    PRIMARY KEY (id_aluno, id_disciplina, in_ano, in_semestre)
);

-- CRIANDO INDICES
CREATE INDEX idx_professor_id_titulo ON escola.professor(id_titulo);
CREATE INDEX idx_curso_id_instituicao ON escola.curso(id_instituicao);
CREATE INDEX idx_curso_id_tipo_curso ON escola.curso(id_tipo_curso);
CREATE INDEX idx_disciplina_id_curso ON escola.disciplina(id_curso);
CREATE INDEX idx_disciplina_id_tipo_disciplina ON escola.disciplina(id_tipo_disciplina);
CREATE INDEX idx_leciona_id_professor ON escola.leciona(id_professor);
CREATE INDEX idx_leciona_id_disciplina ON escola.leciona(id_disciplina);
CREATE INDEX idx_cursa_id_aluno ON escola.cursa(id_aluno);
CREATE INDEX idx_cursa_id_disciplina ON escola.cursa(id_disciplina);
