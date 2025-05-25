import { Request, Response } from "express";
import {
    UpdateProfessorInputDto,
    UpdateProfessorUsecase,
} from "../../../../../usecases/professor/update.usecase";
import { updateProfessorSchema } from "../../schemas/professor/professor.schema";
import { HttpMethod, Route } from "../route";
import { TituloProps } from "../../../../../domain/titulo/entity/titulo";

export type UpdateProfessorResponseDto = {
    idProfessor: number;
    titulo: TituloProps;
    nome: string;
    sexo: string;
    estadoCivil: string;
    dtNascimento: Date;
    telefone: string;
};

export class UpdateProfessorRoute implements Route {
    constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly updateProfessorService: UpdateProfessorUsecase
    ) {}

    public static create(
        updateProfessorService: UpdateProfessorUsecase
    ): UpdateProfessorRoute {
        return new UpdateProfessorRoute(
            "/professores",
            HttpMethod.PUT,
            updateProfessorService
        );
    }

    public getHandler(): (
        request: Request,
        response: Response
    ) => Promise<void> {
        return async (request: Request, response: Response) => {
            updateProfessorSchema.parse({
                ...request.body,
                dtNascimento: new Date(request.body.dtNascimento),
            });

            const {
                idProfessor,
                nome,
                sexo,
                estadoCivil,
                telefone,
                dtNascimento,
            }: UpdateProfessorInputDto = request.body;

            const input: UpdateProfessorInputDto = {
                idProfessor,
                nome,
                sexo,
                estadoCivil,
                telefone,
                dtNascimento,
            };

            const output: UpdateProfessorResponseDto =
                await this.updateProfessorService.execute(input);

            const responseBody = this.present(output);

            response.status(200).json(responseBody).send();
        };
    }

    public getMethod(): HttpMethod {
        return this.method;
    }

    public getPath(): string {
        return this.path;
    }

    private present(
        output: UpdateProfessorResponseDto
    ): UpdateProfessorResponseDto {
        const response = {
            idProfessor: output.idProfessor,
            titulo: output.titulo,
            nome: output.nome,
            sexo: output.sexo,
            estadoCivil: output.estadoCivil,
            dtNascimento: output.dtNascimento,
            telefone: output.telefone,
        };

        return response;
    }
}
