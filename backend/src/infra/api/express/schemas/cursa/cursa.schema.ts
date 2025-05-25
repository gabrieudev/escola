import { z } from "zod";

export const createCursaSchema = z.object({
    idDisciplina: z.number({ message: "O id da disciplina é obrigatório" }),
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
    idAluno: z.number({ message: "O id do aluno é obrigatório" }),
    idDisciplina: z.number({ message: "O id da disciplina é obrigatório" }),
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
    nota1: z
        .number()
        .min(0, { message: "A nota não pode ser menor que 0" })
        .max(10, { message: "A nota não pode ser maior que 10" })
        .nullable(),
    nota2: z
        .number()
        .min(0, { message: "A nota não pode ser menor que 0" })
        .max(10, { message: "A nota não pode ser maior que 10" })
        .nullable(),
    nota3: z
        .number()
        .min(0, { message: "A nota não pode ser menor que 0" })
        .max(10, { message: "A nota não pode ser maior que 10" })
        .nullable(),
    isAprovado: z.boolean({ message: "O atributo 'isAprovado' é obrigatório" }),
});
