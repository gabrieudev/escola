import { ApiExpress } from "./infra/api/express/api.express";

import { prisma } from "./package/prisma/prisma";

import { AlunoRepositoryPrisma } from "./infra/repositories/aluno/aluno.repository.prisma";

import { CreateAlunoUsecase } from "./usecases/aluno/create.usecase";
import { UpdateAlunoUsecase } from "./usecases/aluno/update.usecase";
import { FindAllAlunoUsecase } from "./usecases/aluno/find-all.usecase";
import { FindByIdAlunoUsecase } from "./usecases/aluno/find-by-id.usecase";
import { DeleteAlunoUsecase } from "./usecases/aluno/delete.usecase";

import { UpdateAlunoRoute } from "./infra/api/express/routes/aluno/update.express.route";
import { CreateAlunoRoute } from "./infra/api/express/routes/aluno/create.express.route";
import { FindAllAlunoRoute } from "./infra/api/express/routes/aluno/find-all.express.route";
import { FindByIdAlunoRoute } from "./infra/api/express/routes/aluno/find-by-id.express.route";
import { DeleteAlunoRoute } from "./infra/api/express/routes/aluno/delete.express.route";

function main() {
    // REPOSITORIES
    const alunoRepository = AlunoRepositoryPrisma.create(prisma);

    // USECASES
    const createAlunoUsecase = CreateAlunoUsecase.create(alunoRepository);
    const updateAlunoUsecase = UpdateAlunoUsecase.create(alunoRepository);
    const findAllAlunoUsecase = FindAllAlunoUsecase.create(alunoRepository);
    const findByIdAlunoUsecase = FindByIdAlunoUsecase.create(alunoRepository);
    const deleteAlunoUsecase = DeleteAlunoUsecase.create(alunoRepository);

    // ROUTES
    const createAlunoRoute = CreateAlunoRoute.create(createAlunoUsecase);
    const updateAlunoRoute = UpdateAlunoRoute.create(updateAlunoUsecase);
    const findAllAlunoRoute = FindAllAlunoRoute.create(findAllAlunoUsecase);
    const findByIdAlunoRoute = FindByIdAlunoRoute.create(findByIdAlunoUsecase);
    const deleteAlunoRoute = DeleteAlunoRoute.create(deleteAlunoUsecase);

    // API
    const api = ApiExpress.create([
        createAlunoRoute,
        updateAlunoRoute,
        findAllAlunoRoute,
        findByIdAlunoRoute,
        deleteAlunoRoute,
    ]);
    const port = 3000;

    api.start(port);
}

main();
