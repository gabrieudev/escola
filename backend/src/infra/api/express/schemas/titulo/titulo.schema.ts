import { z } from "zod";

export const createTituloSchema = z.object({
    descricao: z.string({ message: "A descrição é obrigatória" }).nonempty({
        message: "A descrição não pode ser vazia",
    }),
});

export const updateTituloSchema = z.object({
    idTitulo: z.number({ message: "O id do título é obrigatório" }),
    descricao: z.string({ message: "A descrição é obrigatória" }).nonempty({
        message: "A descrição não pode ser vazia",
    }),
});
