import { Request, Response } from "express";
import {
    CreateLecionaInputDto,
    CreateLecionaUsecase,
} from "../../../../../usecases/leciona/create.usecase";
import { createLecionaSchema } from "../../schemas/leciona/leciona.schema";
import { HttpMethod, Route } from "../route";
import { DisciplinaProps } from "../../../../../domain/disciplina/entity/disciplina";
import { ProfessorProps } from "../../../../../domain/professor/entity/professor";

export type CreateLecionaOutputDto = {
    disciplina: DisciplinaProps;
    professor: ProfessorProps;
};

export class CreateLecionaRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly createLecionaService: CreateLecionaUsecase
    ) {}

    public static create(
        createLecionaService: CreateLecionaUsecase
    ): CreateLecionaRoute {
        return new CreateLecionaRoute(
            "/disciplinas/:idDisciplina/professores",
            HttpMethod.POST,
            createLecionaService
        );
    }

    public getHandler(): (
        request: Request,
        response: Response
    ) => Promise<void> {
        return async (request, response) => {
            createLecionaSchema.parse(request.body);

            const { idDisciplina } = request.params;
            const { idProfessor } = request.body;

            const input: CreateLecionaInputDto = {
                idDisciplina: parseInt(idDisciplina),
                idProfessor,
            };

            const output = await this.createLecionaService.execute(input);

            response.status(201).json(this.present(output));
        };
    }

    public getPath(): string {
        return this.path;
    }

    public getMethod(): HttpMethod {
        return this.method;
    }

    private present(output: CreateLecionaOutputDto): CreateLecionaOutputDto {
        const response = {
            disciplina: output.disciplina,
            professor: output.professor,
        };

        return response;
    }
}
