import { Instituicao } from "../../domain/instituicao/entity/instituicao";
import { InstituicaoGateway } from "../../domain/instituicao/gateway/instituicao.gateway";
import AppError from "../../utils/app-error";
import { Usecase } from "../usecase";

export type CreateInstituicaoInputDto = {
    descricao: string;
    sigla: string;
};

export type CreateInstituicaoOutputDto = {
    idInstituicao: number;
    descricao: string;
    sigla: string;
};

export class CreateInstituicaoUsecase
    implements Usecase<CreateInstituicaoInputDto, CreateInstituicaoOutputDto>
{
    constructor(private readonly instituicaoGateway: InstituicaoGateway) {}

    public static create(
        instituicaoGateway: InstituicaoGateway
    ): CreateInstituicaoUsecase {
        return new CreateInstituicaoUsecase(instituicaoGateway);
    }

    async execute(
        input: CreateInstituicaoInputDto
    ): Promise<CreateInstituicaoOutputDto> {
        const instituicao = Instituicao.create(
            null,
            input.descricao,
            input.sigla
        );

        const result = await this.instituicaoGateway.create(instituicao);

        if (!result) {
            throw new AppError("Erro ao criar instituição.", 500);
        }

        return this.presentOutput(result);
    }

    private presentOutput(result: Instituicao): CreateInstituicaoOutputDto {
        return {
            idInstituicao: result.idInstituicao!,
            descricao: result.descricao,
            sigla: result.sigla,
        };
    }
}
