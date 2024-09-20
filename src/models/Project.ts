import mongoose, { Schema, Document, PopulatedDoc, Types } from "mongoose";
import { ITask } from "./Task";

/* Nota: TypeScript trabaja complejamente los documentos
ya en proyectos grandes, para solucionar esto, hacemos uso
de los populetedDoc, que es "una forma de hacer join
en este caso a Tasks y traer toto del docoumento de task" */
export interface IProject extends Document {
    projectName: string
    clientName: string
    description: string
    tasks: PopulatedDoc<ITask & Document>[] // se pone [], porque un proyecto puede tener múltiple tareas
};

const ProjectSchema: Schema = new Schema({
    projectName: {
        type: String,
        require: true, // este campo es obligatorio
        trim: true // hacer operaciones internas
    },
    clientName: {
        type: String,
        require: true, // este campo es obligatorio
        trim: true // hacer operaciones internas
    },
    description: {
        type: String,
        require: true, // este campo es obligatorio
        trim: true // hacer operaciones internas
    },
    tasks: [
        {
            type: Types.ObjectId,
            ref: 'Task'
        }
    ]
}, { timestamps: true });

const Project = mongoose.model<IProject>('Project', ProjectSchema);
export default Project;