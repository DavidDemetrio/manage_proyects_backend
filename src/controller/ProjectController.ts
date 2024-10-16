import { Request, Response } from "express";
import Project from "../models/Project";
import logger from "../shared/logger";

export class ProjectController {
    static createProject = async (req: Request, res: Response) => {
        const project = new Project(req.body);  // 1rst option instance project of Project
        // this form you can more option when create instance
        try {
            await project.save(); // save de object
            // await Project.create(req.body); // second option create de project from create method static
            res.send('Proyecto creado con éxito.');
        } catch (error) {
            logger.error(error as string);
        }
    }

    static getAllProjects = async (req: Request, res: Response) => {
        try {
            const projects = await Project.find({});
            res.json(projects);
        } catch (error) {
            console.log(error);
        }
    }

    static getProjectById = async (req: Request, res: Response) => {
        const { id } = req.params;

        try {
            const project = await Project.findById(id).populate('tasks');

            if (!project) {
                const error = new Error("Projecto no encontrado")

                return res.status(400).json({
                    error: error.message
                });
            }

            res.json(project);
        } catch (error) {
            console.log(error);
        }
    }

    static updateProject = async (req: Request, res: Response) => {
        const { id } = req.params;

        try {
            const project = await Project.findByIdAndUpdate(id, req.body);

            if (!project) {
                const error = new Error("Projecto no encontrado")

                return res.status(400).json({
                    error: error.message
                });
            }

            await project.save();

            res.send('Proyecto actualizado')
        } catch (error) {
            console.log(error);
        }
    }

    static deleteProject = async (req: Request, res: Response) => {
        const { id } = req.params;

        try {
            const project = await Project.findById(id);

            /**
             * Es importante el manejo de los errores, porque en express
             * al no manejarlos, se truena la aplicación
            */
            if (!project) {
                const error = new Error("Projecto no encontrado")

                return res.status(400).json({
                    error: error.message
                });
            }

            await project.deleteOne();

            res.send('Proyecto eliminado');
        } catch (error) {
            console.log(error);
        }
    }
}