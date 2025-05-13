import { Instituicao } from "../../domain/instituicao/entity/instituicao";
import { InstituicaoGateway } from "../../domain/instituicao/gateway/instituicao.gateway";
import AppError from "../../utils/app-error";
import { Usecase } from "../usecase";

export type FindByIdInstituicaoInputDto = {
    idInstituicao: number;
};

export type FindByIdInstituicaoOutputDto = {
    idInstituicao: number;
    descricao: string;
    sigla: string;
};

export class FindByIdInstituicaoUsecase
    implements
        Usecase<FindByIdInstituicaoInputDto, FindByIdInstituicaoOutputDto>
{
    constructor(private readonly instituicaoGateway: InstituicaoGateway) {}

    static create(
        instituicaoGateway: InstituicaoGateway
    ): FindByIdInstituicaoUsecase {
        return new FindByIdInstituicaoUsecase(instituicaoGateway);
    }

    async execute(
        input: FindByIdInstituicaoInputDto
    ): Promise<FindByIdInstituicaoOutputDto> {
        const instituicao = await this.instituicaoGateway.findById(
            input.idInstituicao
        );

        if (!instituicao) {
            throw new AppError("Instituição não encontrada.", 404);
        }

        return this.presentOutput(instituicao);
    }

    private presentOutput(
        instituicao: Instituicao
    ): FindByIdInstituicaoOutputDto {
        return {
            idInstituicao: instituicao.idInstituicao!,
            descricao: instituicao.descricao,
            sigla: instituicao.sigla,
        };
    }
}
