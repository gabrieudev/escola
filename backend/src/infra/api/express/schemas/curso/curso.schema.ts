import { z } from "zod";
import { updateInstituicaoSchema } from "../instituicao/instituicao.schema";
import { updateTipoCursoSchema } from "../tipo_curso/tipo-curso.schema";

export const createCursoSchema = z.object({
    descricao: z.string({ message: "A descrição é obrigatória" }).nonempty({
        message: "A descrição não pode ser vazia",
    }),
    instituicao: updateInstituicaoSchema,
    tipoCurso: updateTipoCursoSchema,
});

export const updateCursoSchema = z.object({
    idCurso: z.number({ message: "O id do curso é obrigatório" }),
    descricao: z.string({ message: "A descrição é obrigatória" }).nonempty({
        message: "A descrição não pode ser vazia",
    }),
});
