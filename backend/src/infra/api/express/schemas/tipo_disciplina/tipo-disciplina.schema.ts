import { z } from "zod";

export const createTipoDisciplinaSchema = z.object({
    descricao: z.string({ message: "A descrição é obrigatória" }).nonempty({
        message: "A descrição não pode ser vazia",
    }),
});

export const updateTipoDisciplinaSchema = z.object({
    idTipoDisciplina: z.number({
        message: "O id do tipo de disciplina é obrigatório",
    }),
    descricao: z.string({ message: "A descrição é obrigatória" }).nonempty({
        message: "A descrição não pode ser vazia",
    }),
});
