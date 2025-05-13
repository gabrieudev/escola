import { z } from "zod";
import { updateTituloSchema } from "../titulo/titulo.schema";

export const createProfessorSchema = z.object({
    titulo: updateTituloSchema,
    nome: z.string({ message: "O nome é obrigatório" }).nonempty({
        message: "O nome não pode ser vazio",
    }),
    sexo: z.enum(["m", "f"], {
        message: "O sexo precisa ser 'm' ou 'f'",
    }),
    estadoCivil: z.enum(["s", "c", "d"], {
        message: "O estado civil precisa ser 's', 'c' ou 'd'",
    }),
    dtNascimento: z
        .date({
            message: "A data de nascimento é obrigatória",
        })
        .max(new Date(), {
            message: "A data de nascimento não pode ser futura",
        }),
    telefone: z.string({ message: "O telefone é obrigatório" }).nonempty({
        message: "O telefone não pode ser vazio",
    }),
});

export const updateProfessorSchema = z.object({
    idProfessor: z.number({ message: "O id do professor é obrigatório" }),
    titulo: updateTituloSchema,
    nome: z.string({ message: "O nome é obrigatório" }).nonempty({
        message: "O nome não pode ser vazio",
    }),
    sexo: z.enum(["m", "f"], {
        message: "O sexo precisa ser 'm' ou 'f'",
    }),
    estadoCivil: z.enum(["s", "c", "d"], {
        message: "O estado civil precisa ser 's', 'c' ou 'd'",
    }),
    dtNascimento: z
        .date({
            message: "A data de nascimento é obrigatória",
        })
        .max(new Date(), {
            message: "A data de nascimento não pode ser futura",
        }),
    telefone: z.string({ message: "O telefone é obrigatório" }).nonempty({
        message: "O telefone não pode ser vazio",
    }),
});
