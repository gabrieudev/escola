import { ApiExpress } from "./infra/api/express/api.express";
import { AppDataSource } from "./package/typeorm/data-source";
import dotenv from "dotenv";

dotenv.config();

// Repositórios
import { AlunoRepository } from "./infra/repositories/aluno/aluno.repository";
import { TipoCursoRepository } from "./infra/repositories/tipo_curso/tipo-curso.repository";
import { CursoRepository } from "./infra/repositories/curso/curso.repository";
import { InstituicaoRepository } from "./infra/repositories/instituicao/instituicao.repository";
import { CursaRepository } from "./infra/repositories/cursa/cursa.repository";
import { DisciplinaRepository } from "./infra/repositories/disciplina/disciplina.repository";
import { TipoDisciplinaRepository } from "./infra/repositories/tipo_disciplina/tipo-disciplina.repository";
import { TituloRepository } from "./infra/repositories/titulo/titulo.repository";
import { LecionaRepository } from "./infra/repositories/leciona/leciona.repository";
import { ProfessorRepository } from "./infra/repositories/professor/professor.repository";

// Casos de Uso
import { CreateAlunoUsecase } from "./usecases/aluno/create.usecase";
import { UpdateAlunoUsecase } from "./usecases/aluno/update.usecase";
import { FindAllAlunoUsecase } from "./usecases/aluno/find-all.usecase";
import { FindByIdAlunoUsecase } from "./usecases/aluno/find-by-id.usecase";
import { DeleteAlunoUsecase } from "./usecases/aluno/delete.usecase";
import { CreateTipoCursoUsecase } from "./usecases/tipo_curso/create.usecase";
import { UpdateTipoCursoUsecase } from "./usecases/tipo_curso/update.usecase";
import { FindAllTipoCursoUsecase } from "./usecases/tipo_curso/find-all.usecase";
import { FindByIdTipoCursoUsecase } from "./usecases/tipo_curso/find-by-id.usecase";
import { DeleteTipoCursoUsecase } from "./usecases/tipo_curso/delete.usecase";
import { CreateInstituicaoUsecase } from "./usecases/instituicao/create.usecase";
import { UpdateInstituicaoUsecase } from "./usecases/instituicao/update.usecase";
import { FindAllInstituicaoUsecase } from "./usecases/instituicao/find-all.usecase";
import { FindByIdInstituicaoUsecase } from "./usecases/instituicao/find-by-id.usecase";
import { DeleteInstituicaoUsecase } from "./usecases/instituicao/delete.usecase";
import { CreateCursoUsecase } from "./usecases/curso/create.usecase";
import { UpdateCursoUsecase } from "./usecases/curso/update.usecase";
import { FindAllCursoUsecase } from "./usecases/curso/find-all.usecase";
import { FindByIdCursoUsecase } from "./usecases/curso/find-by-id.usecase";
import { DeleteCursoUsecase } from "./usecases/curso/delete.usecase";
import { CreateCursaUsecase } from "./usecases/cursa/create.usecase";
import { DeleteCursaUsecase } from "./usecases/cursa/delete.usecase";
import { FindAllCursaUsecase } from "./usecases/cursa/find-all.usecase";
import { FindByIdCursaUsecase } from "./usecases/cursa/find-by-id.usecase";
import { UpdateCursaUsecase } from "./usecases/cursa/update.usecase";
import { CreateDisciplinaUsecase } from "./usecases/disciplina/create.usecase";
import { DeleteDisciplinaUsecase } from "./usecases/disciplina/delete.usecase";
import { FindByIdDisciplinaUseCase } from "./usecases/disciplina/find-by-id.usecase";
import { FindAllDisciplinaUsecase } from "./usecases/disciplina/find-all.usecase";
import { UpdateDisciplinaUsecase } from "./usecases/disciplina/update.usecase";
import { CreateLecionaUsecase } from "./usecases/leciona/create.usecase";
import { CreateProfessorUsecase } from "./usecases/professor/create.usecase";
import { DeleteProfessorUsecase } from "./usecases/professor/delete.usecase";
import { CreateTituloUsecase } from "./usecases/titulo/create.usecase";
import { DeleteTituloUsecase } from "./usecases/titulo/delete.usecase";
import { FindAllTituloUsecase } from "./usecases/titulo/find-all.usecase";
import { FindByIdTituloUsecase } from "./usecases/titulo/find-by-id.usecase";
import { UpdateTituloUsecase } from "./usecases/titulo/update.usecase";
import { CreateTipoDisciplinaUsecase } from "./usecases/tipo_disciplina/create.usecase";
import { DeleteTipoDisciplinaUsecase } from "./usecases/tipo_disciplina/delete.usecase";
import { FindAllTipoDisciplinaUsecase } from "./usecases/tipo_disciplina/find-all.usecase";
import { FindByIdTipoDisciplinaUsecase } from "./usecases/tipo_disciplina/find-by-id.usecase";
import { UpdateTipoDisciplinaUsecase } from "./usecases/tipo_disciplina/update.usecase";
import { UpdateProfessorUsecase } from "./usecases/professor/update.usecase";
import { FindAllProfessorUsecase } from "./usecases/professor/find-all.usecase";
import { FindByIdProfessorUsecase } from "./usecases/professor/find-by-id.usecase";
import { DisciplinaCursoUsecase } from "./usecases/curso/disciplinas-curso";

// Rotas
import { CreateAlunoRoute } from "./infra/api/express/routes/aluno/create.express.route";
import { UpdateAlunoRoute } from "./infra/api/express/routes/aluno/update.express.route";
import { FindAllAlunoRoute } from "./infra/api/express/routes/aluno/find-all.express.route";
import { FindByIdAlunoRoute } from "./infra/api/express/routes/aluno/find-by-id.express.route";
import { DeleteAlunoRoute } from "./infra/api/express/routes/aluno/delete.express.route";
import { CreateTipoCursoRoute } from "./infra/api/express/routes/tipo_curso/create.express.route";
import { UpdateTipoCursoRoute } from "./infra/api/express/routes/tipo_curso/update.express.route";
import { FindAllTipoCursoRoute } from "./infra/api/express/routes/tipo_curso/find-all.express.route";
import { FindByIdTipoCursoRoute } from "./infra/api/express/routes/tipo_curso/find-by-id.express.route";
import { DeleteTipoCursoRoute } from "./infra/api/express/routes/tipo_curso/delete.express.route";
import { CreateInstituicaoRoute } from "./infra/api/express/routes/instituicao/create.express.route";
import { UpdateInstituicaoRoute } from "./infra/api/express/routes/instituicao/update.express.route";
import { FindAllInstituicaoRoute } from "./infra/api/express/routes/instituicao/find-all.express.route";
import { FindByIdInstituicaoRoute } from "./infra/api/express/routes/instituicao/find-by-id.express.route";
import { DeleteInstituicaoRoute } from "./infra/api/express/routes/instituicao/delete.express.route";
import { CreateCursoRoute } from "./infra/api/express/routes/curso/create.express.route";
import { UpdateCursoRoute } from "./infra/api/express/routes/curso/update.express.route";
import { FindAllCursoRoute } from "./infra/api/express/routes/curso/find-all.express.route";
import { FindByIdCursoRoute } from "./infra/api/express/routes/curso/find-by-id.express.route";
import { DeleteCursoRoute } from "./infra/api/express/routes/curso/delete.express.route";
import { CreateCursaRoute } from "./infra/api/express/routes/cursa/create.express.route";
import { DeleteCursaRoute } from "./infra/api/express/routes/cursa/delete.express.route";
import { FindAllCursaRoute } from "./infra/api/express/routes/cursa/find-all.express.route";
import { FindByIdCursaRoute } from "./infra/api/express/routes/cursa/find-by-id.express.route";
import { UpdateCursaRoute } from "./infra/api/express/routes/cursa/update.express.route";
import { CreateDisciplinaRoute } from "./infra/api/express/routes/disciplina/create.express.route";
import { DeleteDisciplinaRoute } from "./infra/api/express/routes/disciplina/delete.express.route";
import { FindByIdDisciplinaRoute } from "./infra/api/express/routes/disciplina/find-by-id.express.route";
import { FindAllDisciplinaRoute } from "./infra/api/express/routes/disciplina/find-all.express.route";
import { UpdateDisciplinaRoute } from "./infra/api/express/routes/disciplina/update.express.route";
import { CreateTipoDisciplinaRoute } from "./infra/api/express/routes/tipo_disciplina/create.express.route";
import { DeleteTipoDisciplinaRoute } from "./infra/api/express/routes/tipo_disciplina/delete.express.route";
import { FindByIdTipoDisciplinaRoute } from "./infra/api/express/routes/tipo_disciplina/find-by-id.express.route";
import { FindAllTipoDisciplinaRoute } from "./infra/api/express/routes/tipo_disciplina/find-all.express.route";
import { UpdateTipoDisciplinaRoute } from "./infra/api/express/routes/tipo_disciplina/update.express.route";
import { CreateTituloRoute } from "./infra/api/express/routes/titulo/create.express.route";
import { DeleteTituloRoute } from "./infra/api/express/routes/titulo/delete.express.route";
import { FindByIdTituloRoute } from "./infra/api/express/routes/titulo/find-by-id.express.route";
import { FindAllTituloRoute } from "./infra/api/express/routes/titulo/find-all.express.route";
import { UpdateTituloRoute } from "./infra/api/express/routes/titulo/update.express.route";
import { CreateLecionaRoute } from "./infra/api/express/routes/leciona/create.express.route";
import { CreateProfessorRoute } from "./infra/api/express/routes/professor/create.express.route";
import { UpdateProfessorRoute } from "./infra/api/express/routes/professor/update.express.route";
import { FindAllProfessorRoute } from "./infra/api/express/routes/professor/find-all.express.route";
import { FindByIdProfessorRoute } from "./infra/api/express/routes/professor/find-by-id.express.route";
import { DeleteProfessorRoute } from "./infra/api/express/routes/professor/delete.express.route";
import { DisciplinasCursoRoute } from "./infra/api/express/routes/curso/disciplinas-curso.express.route";

function main() {
    // ==================== INICIALIZAÇÃO DE REPOSITÓRIOS ====================

    const alunoRepository = AlunoRepository.create(AppDataSource);
    const tipoCursoRepository = TipoCursoRepository.create(AppDataSource);
    const cursoRepository = CursoRepository.create(AppDataSource);
    const instituicaoRepository = InstituicaoRepository.create(AppDataSource);
    const cursaRepository = CursaRepository.create(AppDataSource);
    const disciplinaRepository = DisciplinaRepository.create(AppDataSource);
    const tipoDisciplinaRepository =
        TipoDisciplinaRepository.create(AppDataSource);
    const tituloRepository = TituloRepository.create(AppDataSource);
    const lecionaRepository = LecionaRepository.create(AppDataSource);
    const professorRepository = ProfessorRepository.create(AppDataSource);

    // ==================== CONFIGURAÇÃO DE CASOS DE USO ====================

    // Aluno
    const createAlunoUsecase = CreateAlunoUsecase.create(alunoRepository);
    const updateAlunoUsecase = UpdateAlunoUsecase.create(alunoRepository);
    const findAllAlunoUsecase = FindAllAlunoUsecase.create(alunoRepository);
    const findByIdAlunoUsecase = FindByIdAlunoUsecase.create(alunoRepository);
    const deleteAlunoUsecase = DeleteAlunoUsecase.create(alunoRepository);

    // Tipo Curso
    const createTipoCursoUsecase =
        CreateTipoCursoUsecase.create(tipoCursoRepository);
    const updateTipoCursoUsecase =
        UpdateTipoCursoUsecase.create(tipoCursoRepository);
    const findAllTipoCursoUsecase =
        FindAllTipoCursoUsecase.create(tipoCursoRepository);
    const findByIdTipoCursoUsecase =
        FindByIdTipoCursoUsecase.create(tipoCursoRepository);
    const deleteTipoCursoUsecase = DeleteTipoCursoUsecase.create(
        tipoCursoRepository,
        cursoRepository
    );

    // Instituição
    const createInstituicaoUsecase = CreateInstituicaoUsecase.create(
        instituicaoRepository
    );
    const updateInstituicaoUsecase = UpdateInstituicaoUsecase.create(
        instituicaoRepository
    );
    const findAllInstituicaoUsecase = FindAllInstituicaoUsecase.create(
        instituicaoRepository
    );
    const findByIdInstituicaoUsecase = FindByIdInstituicaoUsecase.create(
        instituicaoRepository
    );
    const deleteInstituicaoUsecase = DeleteInstituicaoUsecase.create(
        instituicaoRepository,
        cursoRepository
    );

    // Curso
    const createCursoUsecase = CreateCursoUsecase.create(
        cursoRepository,
        instituicaoRepository,
        tipoCursoRepository
    );
    const updateCursoUsecase = UpdateCursoUsecase.create(cursoRepository);
    const findAllCursoUsecase = FindAllCursoUsecase.create(cursoRepository);
    const findByIdCursoUsecase = FindByIdCursoUsecase.create(cursoRepository);
    const deleteCursoUsecase = DeleteCursoUsecase.create(cursoRepository);

    // Disciplina
    const createDisciplinaUsecase = CreateDisciplinaUsecase.create(
        disciplinaRepository,
        cursoRepository,
        tipoDisciplinaRepository
    );
    const deleteDisciplinaUsecase =
        DeleteDisciplinaUsecase.create(disciplinaRepository);
    const updateDisciplinaUsecase =
        UpdateDisciplinaUsecase.create(disciplinaRepository);
    const findAllDisciplinaUsecase =
        FindAllDisciplinaUsecase.create(disciplinaRepository);
    const findByIdDisciplinaUsecase =
        FindByIdDisciplinaUseCase.create(disciplinaRepository);

    // Titulo
    const createTituloUsecase = CreateTituloUsecase.create(tituloRepository);
    const deleteTituloUsecase = DeleteTituloUsecase.create(
        tituloRepository,
        professorRepository
    );
    const updateTituloUsecase = UpdateTituloUsecase.create(tituloRepository);
    const findAllTituloUsecase = FindAllTituloUsecase.create(tituloRepository);
    const findByIdTituloUsecase =
        FindByIdTituloUsecase.create(tituloRepository);

    // Tipo Disciplina
    const createTipoDisciplinaUsecase = CreateTipoDisciplinaUsecase.create(
        tipoDisciplinaRepository
    );
    const deleteTipoDisciplinaUsecase = DeleteTipoDisciplinaUsecase.create(
        tipoDisciplinaRepository,
        disciplinaRepository
    );
    const updateTipoDisciplinaUsecase = UpdateTipoDisciplinaUsecase.create(
        tipoDisciplinaRepository
    );
    const findAllTipoDisciplinaUsecase = FindAllTipoDisciplinaUsecase.create(
        tipoDisciplinaRepository
    );
    const findByIdTipoDisciplinaUsecase = FindByIdTipoDisciplinaUsecase.create(
        tipoDisciplinaRepository
    );

    // Cursa
    const createCursaUsecase = CreateCursaUsecase.create(
        cursaRepository,
        alunoRepository,
        disciplinaRepository
    );
    const deleteCursaUsecase = DeleteCursaUsecase.create(cursaRepository);
    const updateCursaUsecase = UpdateCursaUsecase.create(
        cursaRepository,
        alunoRepository,
        disciplinaRepository
    );
    const findAllCursaUsecase = FindAllCursaUsecase.create(cursaRepository);
    const findByIdCursaUsecase = FindByIdCursaUsecase.create(cursaRepository);

    // Professor
    const createProfessorUsecase = CreateProfessorUsecase.create(
        professorRepository,
        tituloRepository
    );
    const updateProfessorUsecase =
        UpdateProfessorUsecase.create(professorRepository);
    const findAllProfessorUsecase =
        FindAllProfessorUsecase.create(professorRepository);
    const findByIdProfessorUsecase =
        FindByIdProfessorUsecase.create(professorRepository);
    const deleteProfessorUsecase =
        DeleteProfessorUsecase.create(professorRepository);

    // Leciona
    const createLecionaUsecase = CreateLecionaUsecase.create(
        lecionaRepository,
        disciplinaRepository,
        professorRepository
    );

    const disciplinaCursoUsecase = DisciplinaCursoUsecase.create(
        cursoRepository,
        disciplinaRepository
    );

    // ==================== CONFIGURAÇÃO DE ROTAS ====================

    // Aluno
    const createAlunoRoute = CreateAlunoRoute.create(createAlunoUsecase);
    const updateAlunoRoute = UpdateAlunoRoute.create(updateAlunoUsecase);
    const findAllAlunoRoute = FindAllAlunoRoute.create(findAllAlunoUsecase);
    const findByIdAlunoRoute = FindByIdAlunoRoute.create(findByIdAlunoUsecase);
    const deleteAlunoRoute = DeleteAlunoRoute.create(deleteAlunoUsecase);

    // Tipo Curso
    const createTipoCursoRoute = CreateTipoCursoRoute.create(
        createTipoCursoUsecase
    );
    const updateTipoCursoRoute = UpdateTipoCursoRoute.create(
        updateTipoCursoUsecase
    );
    const findAllTipoCursoRoute = FindAllTipoCursoRoute.create(
        findAllTipoCursoUsecase
    );
    const findByIdTipoCursoRoute = FindByIdTipoCursoRoute.create(
        findByIdTipoCursoUsecase
    );
    const deleteTipoCursoRoute = DeleteTipoCursoRoute.create(
        deleteTipoCursoUsecase
    );

    // Instituicao
    const createInstituicaoRoute = CreateInstituicaoRoute.create(
        createInstituicaoUsecase
    );
    const updateInstituicaoRoute = UpdateInstituicaoRoute.create(
        updateInstituicaoUsecase
    );
    const findAllInstituicaoRoute = FindAllInstituicaoRoute.create(
        findAllInstituicaoUsecase
    );
    const findByIdInstituicaoRoute = FindByIdInstituicaoRoute.create(
        findByIdInstituicaoUsecase
    );
    const deleteInstituicaoRoute = DeleteInstituicaoRoute.create(
        deleteInstituicaoUsecase
    );

    // Curso
    const createCursoRoute = CreateCursoRoute.create(createCursoUsecase);
    const updateCursoRoute = UpdateCursoRoute.create(updateCursoUsecase);
    const findAllCursoRoute = FindAllCursoRoute.create(findAllCursoUsecase);
    const findByIdCursoRoute = FindByIdCursoRoute.create(findByIdCursoUsecase);
    const deleteCursoRoute = DeleteCursoRoute.create(deleteCursoUsecase);

    // Cursa
    const createCursaRoute = CreateCursaRoute.create(createCursaUsecase);
    const deleteCursaRoute = DeleteCursaRoute.create(deleteCursaUsecase);
    const findAllCursaRoute = FindAllCursaRoute.create(findAllCursaUsecase);
    const findByIdCursaRoute = FindByIdCursaRoute.create(findByIdCursaUsecase);
    const updateCursaRoute = UpdateCursaRoute.create(updateCursaUsecase);

    // Disciplina
    const createDisciplinaRoute = CreateDisciplinaRoute.create(
        createDisciplinaUsecase
    );
    const deleteDisciplinaRoute = DeleteDisciplinaRoute.create(
        deleteDisciplinaUsecase
    );
    const findAllDisciplinaRoute = FindAllDisciplinaRoute.create(
        findAllDisciplinaUsecase
    );
    const findByIdDisciplinaRoute = FindByIdDisciplinaRoute.create(
        findByIdDisciplinaUsecase
    );
    const updateDisciplinaRoute = UpdateDisciplinaRoute.create(
        updateDisciplinaUsecase
    );

    // Tipo Disciplina
    const createTipoDisciplinaRoute = CreateTipoDisciplinaRoute.create(
        createTipoDisciplinaUsecase
    );
    const deleteTipoDisciplinaRoute = DeleteTipoDisciplinaRoute.create(
        deleteTipoDisciplinaUsecase
    );
    const findAllTipoDisciplinaRoute = FindAllTipoDisciplinaRoute.create(
        findAllTipoDisciplinaUsecase
    );
    const findByIdTipoDisciplinaRoute = FindByIdTipoDisciplinaRoute.create(
        findByIdTipoDisciplinaUsecase
    );
    const updateTipoDisciplinaRoute = UpdateTipoDisciplinaRoute.create(
        updateTipoDisciplinaUsecase
    );

    // Titulo
    const createTituloRoute = CreateTituloRoute.create(createTituloUsecase);
    const deleteTituloRoute = DeleteTituloRoute.create(deleteTituloUsecase);
    const findAllTituloRoute = FindAllTituloRoute.create(findAllTituloUsecase);
    const findByIdTituloRoute = FindByIdTituloRoute.create(
        findByIdTituloUsecase
    );
    const updateTituloRoute = UpdateTituloRoute.create(updateTituloUsecase);

    // Professor
    const createProfessorRoute = CreateProfessorRoute.create(
        createProfessorUsecase
    );
    const updateProfessorRoute = UpdateProfessorRoute.create(
        updateProfessorUsecase
    );
    const findAllProfessorRoute = FindAllProfessorRoute.create(
        findAllProfessorUsecase
    );
    const findByIdProfessorRoute = FindByIdProfessorRoute.create(
        findByIdProfessorUsecase
    );
    const deleteProfessorRoute = DeleteProfessorRoute.create(
        deleteProfessorUsecase
    );

    // Leciona
    const createLecionaRoute = CreateLecionaRoute.create(createLecionaUsecase);

    const disciplinasCursoRoute = DisciplinasCursoRoute.create(
        disciplinaCursoUsecase
    );

    // ==================== INICIALIZAÇÃO DA API ====================

    const api = ApiExpress.create([
        // Aluno
        createAlunoRoute,
        updateAlunoRoute,
        findAllAlunoRoute,
        findByIdAlunoRoute,
        deleteAlunoRoute,

        // Tipo Curso
        createTipoCursoRoute,
        updateTipoCursoRoute,
        findAllTipoCursoRoute,
        findByIdTipoCursoRoute,
        deleteTipoCursoRoute,

        // Instituição
        createInstituicaoRoute,
        updateInstituicaoRoute,
        findAllInstituicaoRoute,
        findByIdInstituicaoRoute,
        deleteInstituicaoRoute,

        // Curso
        createCursoRoute,
        updateCursoRoute,
        findAllCursoRoute,
        findByIdCursoRoute,
        deleteCursoRoute,

        // Cursa
        createCursaRoute,
        deleteCursaRoute,
        findAllCursaRoute,
        findByIdCursaRoute,
        updateCursaRoute,

        // Disciplinas
        createDisciplinaRoute,
        deleteDisciplinaRoute,
        findAllDisciplinaRoute,
        findByIdDisciplinaRoute,
        updateDisciplinaRoute,

        // Tipos de Disciplina
        findAllTipoDisciplinaRoute,
        findByIdTipoDisciplinaRoute,
        updateTipoDisciplinaRoute,
        createTipoDisciplinaRoute,
        deleteTipoDisciplinaRoute,

        // Titulos
        createTituloRoute,
        deleteTituloRoute,
        findAllTituloRoute,
        findByIdTituloRoute,
        updateTituloRoute,

        // Professor
        createProfessorRoute,
        updateProfessorRoute,
        findAllProfessorRoute,
        findByIdProfessorRoute,
        deleteProfessorRoute,

        // Leciona
        createLecionaRoute,

        // Disciplina Curso
        disciplinasCursoRoute,
    ]);
    const port = Number(process.env.PORT) || 3000;

    api.start(port);
}

main();
