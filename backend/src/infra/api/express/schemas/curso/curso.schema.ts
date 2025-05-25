import { z } from "zod";

export const createCursoSchema = z.object({
    descricao: z.string({ message: "A descrição é obrigatória" }).nonempty({
        message: "A descrição não pode ser vazia",
    }),
    idTipoCurso: z.number({ message: "O ID do tipo de curso é obrigatório" }),
});

export const updateCursoSchema = z.object({
    idCurso: z.number({ message: "O id do curso é obrigatório" }),
    descricao: z.string({ message: "A descrição é obrigatória" }).nonempty({
        message: "A descrição não pode ser vazia",
    }),
});
