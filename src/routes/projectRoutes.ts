import { Router } from "express";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/validation";
import { ProjectController } from "../controller/ProjectController";
import { TaskController } from "../controller/TaskController";

const router = Router();

router.post('/',
    body('projectName')
        .notEmpty().withMessage('El nombre del Proyecto es Obligatorio'),
    body('clientName')
        .notEmpty().withMessage('El nombre del Cliente es Obligatorio'),
    body('description')
        .notEmpty().withMessage('La descripción es Obligatoria'),
    handleInputErrors,
    ProjectController.createProject);

router.get('/', ProjectController.getAllProjects);

router.get('/:id',
    param('id').isMongoId().withMessage("ID no válido"),
    handleInputErrors,
    ProjectController.getProjectById);

router.put('/:id',
    param('id').isMongoId().withMessage("ID no válido"),
    body('projectName')
        .notEmpty().withMessage('El nombre del Proyecto es Obligatorio'),
    body('clientName')
        .notEmpty().withMessage('El nombre del Cliente es Obligatorio'),
    body('description')
        .notEmpty().withMessage('La descripción es Obligatoria'),

    handleInputErrors,
    ProjectController.updateProject);

router.delete('/:id',
    param('id').isMongoId().withMessage("ID no válido"),
    handleInputErrors,
    ProjectController.deleteProject);

/* ROUTES TO TASKS */
router.post('/:projectId/tasks',  //Nested Resource Routing / Enrutamiento de Recursos Anidados
    TaskController.createTask);

export default router;