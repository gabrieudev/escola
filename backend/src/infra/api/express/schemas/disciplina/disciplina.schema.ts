import { z } from "zod";
import { updateCursoSchema } from "../curso/curso.schema";
import { updateTipoDisciplinaSchema } from "../tipo_disciplina/tipo-disciplina.schema";

export const createDisciplinaSchema = z.object({
    curso: updateCursoSchema,
    tipoDisciplina: updateTipoDisciplinaSchema,
    sigla: z.string({ message: "A sigla é obrigatória" }).nonempty({
        message: "A sigla não pode ser vazia",
    }),
    descricao: z.string({ message: "A descrição é obrigatória" }).nonempty({
        message: "A descrição não pode ser vazia",
    }),
    periodo: z.number({ message: "O período é obrigatório" }).min(1, {
        message: "O período não pode ser menor que 1",
    }),
    cargaHoraria: z
        .number({ message: "A carga horária é obrigatória" })
        .min(1, {
            message: "A carga horária não pode ser menor que 1",
        }),
});

export const updateDisciplinaSchema = z.object({
    idDisciplina: z.number({ message: "O id da disciplina é obrigatório" }),
    curso: updateCursoSchema,
    tipoDisciplina: updateTipoDisciplinaSchema,
    sigla: z.string({ message: "A sigla é obrigatória" }).nonempty({
        message: "A sigla não pode ser vazia",
    }),
    descricao: z.string({ message: "A descrição é obrigatória" }).nonempty({
        message: "A descrição não pode ser vazia",
    }),
    periodo: z.number({ message: "O período é obrigatório" }).min(1, {
        message: "O período não pode ser menor que 1",
    }),
    cargaHoraria: z
        .number({ message: "A carga horária é obrigatória" })
        .min(1, {
            message: "A carga horária não pode ser menor que 1",
        }),
});
