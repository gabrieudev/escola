import { Request, Response } from "express";
import {
    CreateAlunoInputDto,
    CreateAlunoUsecase,
} from "../../../../../usecases/aluno/create.usecase";
import { HttpMethod, Route } from "../route";
import { createAlunoSchema } from "../../schemas/aluno.schema";

export type CreateAlunoResponseDto = {
    id_aluno: number;
    tx_nome: string;
    tx_sexo: string;
    dt_nascimento: Date;
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

    public getHandler() {
        return async (request: Request, response: Response) => {
            createAlunoSchema.parse({
                ...request.body,
                dt_nascimento: new Date(request.body.dt_nascimento),
            });

            const { tx_nome, tx_sexo, dt_nascimento }: CreateAlunoInputDto =
                request.body;

            const input: CreateAlunoInputDto = {
                tx_nome,
                tx_sexo,
                dt_nascimento,
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
            id_aluno: output.id_aluno,
            tx_nome: output.tx_nome,
            tx_sexo: output.tx_sexo,
            dt_nascimento: output.dt_nascimento,
        };

        return response;
    }
}
