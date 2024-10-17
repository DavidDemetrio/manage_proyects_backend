import type { Request, Response } from "express";
import Task from "../models/Task";

export class TaskController {
    static createTask = async (req: Request, res: Response) => {
        try {
            const task = new Task(req.body);
            task.project = req.project.id;
            req.project.tasks.push(task.id);
            await Promise.allSettled([task.save(), req.project.save()]);
            res.send("Tarea creada correctamente")
        } catch (error) {
            // desarrollo (debugear)
            // console.log(error);
            res.status(500).json({ error: 'hubo un error' });
        }
    }

    static getProjectTasks = async (req: Request, res: Response) => {
        try {
            const tasks = await Task.find({ project: req.project.id }).populate('project');

            res.json(tasks);
        } catch (error) {
            // logear solo para desarrollo.
            // console.log(error)
            /**
             * Nota: Ha diferencia de console.log. Con res.status(500).json(error),
             * lo que hacemos es decirle al servidor que se ha producido un error
             * y por ende no puede realizar la petición del usuario. Pero esto no
             * detiene la ejecución del programa.
             * 
             * 500 (error de servidor interno): Es muy usado para indicarle al cliente
             * que hubo un error de  manera genérica (no detallado el error).
             * 
             * Utilizar para producción
            */
            res.status(500).json({ error: 'Hubo un error' });
        }
    }

    static getTaskById = async (req: Request, res: Response) => {
        try {
            const { taskId } = req.params;

            const task = await Task.findById(taskId);

            if (!task) {
                const error = new Error('Tarea no encontrada');
                /**
                 * 404 (404 Not Found): Indica que el servidor no pudo
                 * encontrar el recurso solicitado por el cliente.
                 * BUENA OPCIÓN PARA INDICAR QUE EL RECURSO SOLICITADO
                 * NO SE SE SABE SI ESTÁ TEMPORALMENTE O PERMANENTEMENTE
                 * INACCESIBLE. (410) es lo contrario
                */
                return res.status(404).json({ error: error.message });
            }

            if (task.project.toString() !== req.project.id) {
                const error = new Error('Acción no válida');

                return res.status(400).json({ error: error.message });
            }

            res.json(task);
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error' });
        }
    }

    static updateTask = async (req: Request, res: Response) => {
        try {
            const { taskId } = req.params;

            const task = await Task.findByIdAndUpdate(taskId, req.body);

            if (!task) {
                const error = new Error('Tarea no encontrada');

                return res.status(404).json({ error: error.message });
            }

            if (task.project.toString() !== req.project.id) {
                const error = new Error('Acción no válida');

                res.status(400).json({ error: error.message });
            }

            res.send("Tarea actualizada correctamente");
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error' });
        }
    }
}