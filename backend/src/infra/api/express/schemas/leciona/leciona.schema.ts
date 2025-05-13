import { z } from "zod";
import { updateDisciplinaSchema } from "../disciplina/disciplina.schema";
import { updateProfessorSchema } from "../professor/professor.schema";

export const createLecionaSchema = z.object({
    disciplina: updateDisciplinaSchema,
    professor: updateProfessorSchema,
});
