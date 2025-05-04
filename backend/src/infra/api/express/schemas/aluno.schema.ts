import { z } from "zod";

export const alunoSchema = z.object({
    nome: z.string({ message: "O nome é obrigatório" }).nonempty({
        message: "O nome não pode ser vazio",
    }),
    sexo: z.enum(["m", "f"], {
        message: "O sexo precisa ser 'm' ou 'f'",
    }),
    dtNascimento: z
        .date({
            message: "A data de nascimento é obrigatória",
        })
        .max(new Date(), {
            message: "A data de nascimento não pode ser futura",
        }),
});
