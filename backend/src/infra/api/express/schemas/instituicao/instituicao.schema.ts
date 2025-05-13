import { z } from "zod";

export const createInstituicaoSchema = z.object({
    descricao: z.string({ message: "A descrição é obrigatória" }).nonempty({
        message: "A descrição não pode ser vazia",
    }),
    sigla: z.string({ message: "A sigla é obrigatória" }).nonempty({
        message: "A sigla não pode ser vazia",
    }),
});

export const updateInstituicaoSchema = z.object({
    idInstituicao: z.number({ message: "O id da instituição é obrigatório" }),
    descricao: z.string({ message: "A descrição é obrigatória" }).nonempty({
        message: "A descrição não pode ser vazia",
    }),
    sigla: z.string({ message: "A sigla é obrigatória" }).nonempty({
        message: "A sigla não pode ser vazia",
    }),
});
