import { z } from "zod";

export const createTipoCursoSchema = z.object({
    descricao: z.string({ message: "A descrição é obrigatória" }).nonempty({
        message: "A descrição não pode ser vazia",
    }),
});

export const updateTipoCursoSchema = z.object({
    idTipoCurso: z.number({ message: "O id do tipo de curso é obrigatório" }),
    descricao: z.string({ message: "A descrição é obrigatória" }).nonempty({
        message: "A descrição não pode ser vazia",
    }),
});
