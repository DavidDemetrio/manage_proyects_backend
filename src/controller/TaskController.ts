import type { Request, Response } from "express";
import Project from "../models/Project";

export class TaskController {
    static createTask = async (req: Request, res: Response) => {
        try {
            const { projectId } = req.params;
            const project = await Project.findById(projectId);
            console.log("projectId >>>>>>>>>>>>>", project);

            if (!project) {
                const error = new Error("Projecto no encontrado");
                return res.status(400).json({
                    error: error.message
                });
            }
        } catch (error) {
            console.log(error);
        }
    }
}