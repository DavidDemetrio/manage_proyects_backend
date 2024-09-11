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
        res.send('Todos los proyectos');
    }
}