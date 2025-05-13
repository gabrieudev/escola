import { z } from "zod";
import { updateAlunoSchema } from "../aluno/aluno.schema";
import { updateCursoSchema } from "../curso/curso.schema";

export const createCursaSchema = z.object({
    aluno: updateAlunoSchema,
    curso: updateCursoSchema,
    ano: z
        .number({ message: "O ano é obrigatório" })
        .min(1, {
            message: "O ano não pode ser menor que 1",
        })
        .max(new Date().getFullYear(), {
            message: "O ano não pode ser maior que o ano atual",
        }),
    semestre: z
        .number({ message: "O semestre é obrigatório" })
        .min(1, {
            message: "O semestre não pode ser menor que 1",
        })
        .max(2, {
            message: "O semestre não pode ser maior que 2",
        }),
    faltas: z.number({ message: "As faltas são obrigatórias" }).min(0, {
        message: "As faltas não podem ser menores que 0",
    }),
});

export const updateCursaSchema = z.object({
    idCursa: z.number({ message: "O id da matrícula é obrigatório" }),
    ano: z
        .number({ message: "O ano é obrigatório" })
        .min(1, {
            message: "O ano não pode ser menor que 1",
        })
        .max(new Date().getFullYear(), {
            message: "O ano não pode ser maior que o ano atual",
        }),
    semestre: z
        .number({ message: "O semestre é obrigatório" })
        .min(1, {
            message: "O semestre não pode ser menor que 1",
        })
        .max(2, {
            message: "O semestre não pode ser maior que 2",
        }),
    faltas: z.number({ message: "As faltas são obrigatórias" }).min(0, {
        message: "As faltas não podem ser menores que 0",
    }),
});
