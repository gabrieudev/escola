import { Instituicao } from "../../domain/instituicao/entity/instituicao";
import { InstituicaoGateway } from "../../domain/instituicao/gateway/instituicao.gateway";
import AppError from "../../utils/app-error";
import { Usecase } from "../usecase";

export type UpdateInstituicaoInputDto = {
    idInstituicao: number;
    descricao: string;
    sigla: string;
};

export type UpdateInstituicaoOutputDto = {
    idInstituicao: number;
    descricao: string;
    sigla: string;
};

export class UpdateInstituicaoUsecase
    implements Usecase<UpdateInstituicaoInputDto, UpdateInstituicaoOutputDto>
{
    constructor(private readonly instituicaoGateway: InstituicaoGateway) {}

    static create(
        instituicaoGateway: InstituicaoGateway
    ): UpdateInstituicaoUsecase {
        return new UpdateInstituicaoUsecase(instituicaoGateway);
    }

    async execute(
        input: UpdateInstituicaoInputDto
    ): Promise<UpdateInstituicaoOutputDto> {
        const instituicao = await this.instituicaoGateway.findById(
            input.idInstituicao
        );

        if (!instituicao) {
            throw new AppError("Instituição não encontrada.", 404);
        }

        instituicao.update(input.descricao, input.sigla);

        const result = await this.instituicaoGateway.update(instituicao);

        if (!result) {
            throw new AppError("Erro ao atualizar instituição.", 500);
        }

        return this.presentOutput(result);
    }

    private presentOutput(result: Instituicao): UpdateInstituicaoOutputDto {
        return {
            idInstituicao: result.idInstituicao!,
            descricao: result.descricao,
            sigla: result.sigla,
        };
    }
}
