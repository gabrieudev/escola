import { CursoGateway } from "../../domain/curso/gateway/curso.gateway";
import AppError from "../../utils/app-error";
import { Usecase } from "../usecase";

export type DeleteCursoInputDto = {
    idCurso: number;
};

export type DeleteCursoOutputDto = {
    data: null;
};

export class DeleteCursoUsecase
    implements Usecase<DeleteCursoInputDto, DeleteCursoOutputDto>
{
    constructor(private cursoGateway: CursoGateway) {}

    public static create(cursoGateway: CursoGateway) {
        return new DeleteCursoUsecase(cursoGateway);
    }

    async execute(input: DeleteCursoInputDto): Promise<DeleteCursoOutputDto> {
        if (!(await this.cursoGateway.existsById(input.idCurso))) {
            throw new AppError("Curso não encontrado", 404);
        }

        const result = await this.cursoGateway.delete(input.idCurso);

        if (!result) {
            throw new AppError("Erro ao deletar curso", 500);
        }

        return this.presentOutput();
    }

    private presentOutput(): DeleteCursoOutputDto {
        return {
            data: null,
        };
    }
}
