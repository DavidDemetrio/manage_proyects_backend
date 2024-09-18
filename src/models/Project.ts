import mongoose, { Schema, Document } from "mongoose";

export interface IProject extends Document {
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
    clientName: {
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

const Project = mongoose.model<IProject>('Project', ProjectSchema);
export default Project;