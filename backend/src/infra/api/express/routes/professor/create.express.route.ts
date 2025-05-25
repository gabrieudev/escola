import { Request, Response } from "express";
import {
    CreateProfessorInputDto,
    CreateProfessorUsecase,
} from "../../../../../usecases/professor/create.usecase";
import { createProfessorSchema } from "../../schemas/professor/professor.schema";
import { HttpMethod, Route } from "../route";

export type CreateProfessorOutputDto = {
    idProfessor: number;
    nome: string;
    sexo: string;
    dtNascimento: Date;
};

export class CreateProfessorRoute implements Route {
    constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly createProfessorService: CreateProfessorUsecase
    ) {}

    public static create(
        createProfessorService: CreateProfessorUsecase
    ): CreateProfessorRoute {
        return new CreateProfessorRoute(
            "/professores",
            HttpMethod.POST,
            createProfessorService
        );
    }

    public getHandler(): (
        request: Request,
        response: Response
    ) => Promise<void> {
        return async (request, response) => {
            createProfessorSchema.parse(request.body);

            const {
                idTitulo,
                nome,
                sexo,
                estadoCivil,
                telefone,
                dtNascimento,
            }: CreateProfessorInputDto = request.body;

            const input: CreateProfessorInputDto = {
                idTitulo,
                nome,
                sexo,
                estadoCivil,
                telefone,
                dtNascimento,
            };

            const output: CreateProfessorOutputDto =
                await this.createProfessorService.execute(input);

            const responseBody = this.present(output);

            response.status(201).json(responseBody).send();
        };
    }

    public getPath(): string {
        return this.path;
    }

    public getMethod(): HttpMethod {
        return this.method;
    }

    private present(
        output: CreateProfessorOutputDto
    ): CreateProfessorOutputDto {
        return {
            idProfessor: output.idProfessor,
            nome: output.nome,
            sexo: output.sexo,
            dtNascimento: output.dtNascimento,
        };
    }
}
