import { Router } from "express";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/validation";
import { validateProjectExists } from "../middleware/project";
import { taskExist } from "../middleware/task";
import { ProjectController } from "../controller/ProjectController";
import { TaskController } from "../controller/TaskController";

const router = Router();

// donde se use :projectId params, primero se ejecuta este middleware
router.param("projectId", validateProjectExists);

/**
 * Me quedé en llamar a este middleware en las rutas donde se
 * envía :taskId y sustituir el código. También me falta ver el
 * último video de backend.
*/
router.param('taskId', taskExist);

/* ROUTES PROJECT */
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

/* ROUTES TASKS */
router.post('/:projectId/tasks',  //Nested Resource Routing / Enrutamiento de Recursos Anidados
    body('name')
        .notEmpty().withMessage('El nombre de la tarea es Obligatoria'),
    body('description')
        .notEmpty().withMessage('El nombre de la descripción es Obligatoria'),
    handleInputErrors,
    TaskController.createTask);

router.get('/:projectId/tasks',
    TaskController.getProjectTasks
);

router.get('/:projectId/tasks/:taskId',
    param('taskId').isMongoId().withMessage("ID no válido"),
    handleInputErrors,
    TaskController.getTaskById
);

router.put('/:projectId/tasks/:taskId',
    param('taskId').isMongoId().withMessage('ID no válido'),
    body('name').notEmpty().withMessage('El nombre de la tarea es obligatorio'),
    body('description').notEmpty().withMessage('La descripción de la tarea es obligatoria'),
    handleInputErrors,
    TaskController.updateTask
)

router.delete('/:projectId/tasks/:taskId',
    param('taskId').isMongoId().withMessage('ID no válido'),
    handleInputErrors,
    TaskController.deleteTask
)

router.post('/:projectId/tasks/:taskId/status',
    param('taskId').isMongoId().withMessage('ID no válido'),
    body('status').notEmpty().withMessage('El estado es obligatorio'),
    handleInputErrors,
    TaskController.updateStatus
);

export default router;