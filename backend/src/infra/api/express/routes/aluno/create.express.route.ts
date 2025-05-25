import { Request, Response } from "express";
import {
    CreateAlunoInputDto,
    CreateAlunoUsecase,
} from "../../../../../usecases/aluno/create.usecase";
import { HttpMethod, Route } from "../route";
import { createAlunoSchema } from "../../schemas/aluno/aluno.schema";

export type CreateAlunoResponseDto = {
    idAluno: number;
    nome: string;
    sexo: string;
    dtNascimento: Date;
};

export class CreateAlunoRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly createAlunoService: CreateAlunoUsecase
    ) {}

    public static create(createAlunoService: CreateAlunoUsecase) {
        return new CreateAlunoRoute(
            "/alunos",
            HttpMethod.POST,
            createAlunoService
        );
    }

    public getHandler(): (
        request: Request,
        response: Response
    ) => Promise<void> {
        return async (request: Request, response: Response) => {
            createAlunoSchema.parse({
                ...request.body,
                dtNascimento: new Date(request.body.dtNascimento),
            });

            const { nome, sexo, dtNascimento }: CreateAlunoInputDto =
                request.body;

            const input: CreateAlunoInputDto = {
                nome,
                sexo,
                dtNascimento,
            };

            const output: CreateAlunoResponseDto =
                await this.createAlunoService.execute(input);

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

    private present(output: CreateAlunoResponseDto): CreateAlunoResponseDto {
        const response = {
            idAluno: output.idAluno,
            nome: output.nome,
            sexo: output.sexo,
            dtNascimento: output.dtNascimento,
        };

        return response;
    }
}
