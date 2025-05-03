import { DataSource } from "typeorm";
import { Aluno } from "../../infra/api/express/entities/Aluno";
import { Cursa } from "../../infra/api/express/entities/Cursa";
import { Disciplina } from "../../infra/api/express/entities/Disciplina";
import { Professor } from "../../infra/api/express/entities/Professor";
import { Titulo } from "../../infra/api/express/entities/Titulo";
import { Curso } from "../../infra/api/express/entities/Curso";
import { Instituicao } from "../../infra/api/express/entities/Instituicao";
import { Leciona } from "../../infra/api/express/entities/Leciona";
import { TipoDisciplina } from "../../infra/api/express/entities/TipoDisciplina";
import { TipoCurso } from "../../infra/api/express/entities/TipoCurso";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.PGHOST,
    port: Number(process.env.PGPORT),
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDB,
    synchronize: true,
    logging: true,
    ssl: true,
    entities: [
        Aluno,
        Cursa,
        Disciplina,
        Professor,
        Titulo,
        Curso,
        Instituicao,
        Leciona,
        TipoDisciplina,
        TipoCurso,
    ],
});

AppDataSource.initialize()
    .then(() => {
        console.log("Conexão estabelecida com o banco de dados.");
    })
    .catch((err) => {
        console.error("Erro ao estabelecer conexão com o banco de dados:", err);
    });
