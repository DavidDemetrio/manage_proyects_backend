import mongoose, { Schema, Document } from "mongoose";

export type ProjectType = Document & {
    projectName: string
    clientName: string
    description: string
};

const ProjectSchema: Schema = new Schema({
    projectName: {
        type: String,
        require: true, // este campo es obligatorio
        trim: true // hacer operaciones internas
    },
    clienttName: {
        type: String,
        require: true, // este campo es obligatorio
        trim: true // hacer operaciones internas
    },
    description: {
        type: String,
        require: true, // este campo es obligatorio
        trim: true // hacer operaciones internas
    }
});

const Project = mongoose.model<ProjectType>('Project', ProjectSchema);
export default Project;