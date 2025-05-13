import { TipoCursoGateway } from "../../domain/tipo_curso/gateway/tipo-curso.gateway";
import AppError from "../../utils/app-error";
import { Usecase } from "../usecase";
import { CursoGateway } from "../../domain/curso/gateway/curso.gateway";

export type DeleteTipoCursoInputDto = {
    idTipoCurso: number;
};

export type DeleteTipoCursoOutputDto = {
    data: null;
};

export class DeleteTipoCursoUsecase
    implements Usecase<DeleteTipoCursoInputDto, DeleteTipoCursoOutputDto>
{
    constructor(
        private readonly tipoCursoGateway: TipoCursoGateway,
        private readonly cursoGateway: CursoGateway
    ) {}

    public static create(
        tipoCursoGateway: TipoCursoGateway,
        CursoGateway: CursoGateway
    ) {
        return new DeleteTipoCursoUsecase(tipoCursoGateway, CursoGateway);
    }

    async execute({
        idTipoCurso,
    }: DeleteTipoCursoInputDto): Promise<DeleteTipoCursoOutputDto> {
        if (!(await this.tipoCursoGateway.existsById(idTipoCurso))) {
            throw new AppError("Tipo de curso não encontrado.", 404);
        }

        if (await this.cursoGateway.existsByIdTipoCurso(idTipoCurso)) {
            throw new AppError("Tipo de curso possui cursos cadastrados.", 409);
        }

        const result = await this.tipoCursoGateway.delete(idTipoCurso);

        if (!result) {
            throw new AppError("Erro ao deletar tipo de curso.", 500);
        }

        return this.presentOutput();
    }

    private presentOutput(): DeleteTipoCursoOutputDto {
        return {
            data: null,
        };
    }
}
