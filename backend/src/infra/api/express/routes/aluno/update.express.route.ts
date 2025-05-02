import { Request, Response } from "express";
import {
    UpdateAlunoInputDto,
    UpdateAlunoUsecase,
} from "../../../../../usecases/aluno/update.usecase";
import { HttpMethod, Route } from "../route";

export type UpdateAlunoResponseDto = {
    id_aluno: number;
    tx_nome: string;
    tx_sexo: string;
    dt_nascimento: Date;
};

export class UpdateAlunoRoute implements Route {
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly updateAlunoService: UpdateAlunoUsecase
    ) {}

    public static create(updateAlunoService: UpdateAlunoUsecase) {
        return new UpdateAlunoRoute(
            "/alunos",
            HttpMethod.PUT,
            updateAlunoService
        );
    }

    public getHandler() {
        return async (request: Request, response: Response) => {
            const {
                id_aluno,
                tx_nome,
                tx_sexo,
                dt_nascimento,
            }: UpdateAlunoInputDto = request.body;

            const input: UpdateAlunoInputDto = {
                id_aluno,
                tx_nome,
                tx_sexo,
                dt_nascimento,
            };

            const output: UpdateAlunoResponseDto =
                await this.updateAlunoService.execute(input);

            const responseBody = this.present(output);

            response.status(200).json(responseBody).send();
        };
    }

    public getPath(): string {
        return this.path;
    }

    public getMethod(): HttpMethod {
        return this.method;
    }

    private present(output: UpdateAlunoResponseDto): UpdateAlunoResponseDto {
        const response = {
            id_aluno: output.id_aluno,
            tx_nome: output.tx_nome,
            tx_sexo: output.tx_sexo,
            dt_nascimento: output.dt_nascimento,
        };

        return response;
    }
}
