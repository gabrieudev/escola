import { Request, Response } from "express";
import {
    FindProfessorByIdInputDto,
    FindByIdProfessorUsecase,
} from "../../../../../usecases/professor/find-by-id.usecase";
import { HttpMethod, Route } from "../route";
import { TituloProps } from "../../../../../domain/titulo/entity/titulo";

export type FindByIdProfessorResponseDto = {
    idProfessor: number;
    titulo: TituloProps;
    nome: string;
    sexo: string;
    estadoCivil: string;
    dtNascimento: Date;
    telefone: string;
};

export class FindByIdProfessorRoute implements Route {
    constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly findProfessorByIdService: FindByIdProfessorUsecase
    ) {}

    public static create(
        findProfessorByIdService: FindByIdProfessorUsecase
    ): FindByIdProfessorRoute {
        return new FindByIdProfessorRoute(
            "/professores/:idProfessor",
            HttpMethod.GET,
            findProfessorByIdService
        );
    }

    public getHandler(): (
        request: Request,
        response: Response
    ) => Promise<void> {
        return async (request: Request, response: Response) => {
            const { idProfessor } = request.params;

            const input: FindProfessorByIdInputDto = {
                idProfessor: parseInt(idProfessor),
            };

            const output: FindByIdProfessorResponseDto =
                await this.findProfessorByIdService.execute(input);

            response.status(200).json(this.present(output));
        };
    }

    public getPath(): string {
        return this.path;
    }

    public getMethod(): HttpMethod {
        return this.method;
    }

    private present(
        output: FindByIdProfessorResponseDto
    ): FindByIdProfessorResponseDto {
        return {
            idProfessor: output.idProfessor,
            titulo: output.titulo,
            nome: output.nome,
            sexo: output.sexo,
            estadoCivil: output.estadoCivil,
            dtNascimento: output.dtNascimento,
            telefone: output.telefone,
        };
    }
}
