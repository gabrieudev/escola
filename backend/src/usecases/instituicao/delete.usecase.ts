import { CursoGateway } from "../../domain/curso/gateway/curso.gateway";
import { InstituicaoGateway } from "../../domain/instituicao/gateway/instituicao.gateway";
import AppError from "../../utils/app-error";
import { Usecase } from "../usecase";

export type DeleteInstituicaoInputDto = {
    idInstituicao: number;
};

export type DeleteInstituicaoOutputDto = {
    data: null;
};

export class DeleteInstituicaoUsecase
    implements Usecase<DeleteInstituicaoInputDto, DeleteInstituicaoOutputDto>
{
    constructor(
        private readonly instituicaoGateway: InstituicaoGateway,
        private readonly cursoGateway: CursoGateway
    ) {}

    static create(
        instituicaoGateway: InstituicaoGateway,
        cursoGateway: CursoGateway
    ): DeleteInstituicaoUsecase {
        return new DeleteInstituicaoUsecase(instituicaoGateway, cursoGateway);
    }

    async execute(
        input: DeleteInstituicaoInputDto
    ): Promise<DeleteInstituicaoOutputDto> {
        if (!(await this.instituicaoGateway.existsById(input.idInstituicao))) {
            throw new AppError("Instituição não encontrada.", 404);
        }

        if (
            await this.cursoGateway.existsByIdInstituicao(input.idInstituicao)
        ) {
            throw new AppError("Instituição possui cursos cadastrados.", 409);
        }

        const result = await this.instituicaoGateway.delete(
            input.idInstituicao
        );

        if (!result) {
            throw new AppError("Erro ao deletar instituição.", 500);
        }

        return this.presentOutput();
    }

    private presentOutput(): DeleteInstituicaoOutputDto {
        return {
            data: null,
        };
    }
}
