import type { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

/**
 * Funciones que se ejecutan en las peticiones
 * http, antes de enviar al controlador
*/
export const handleInputErrors = (req:Request, res:Response, next:NextFunction) => {
    // Se manda a req, porque este middleware se ejecuta en el archivo de routes
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array() // convert errors in a array
        });
    }

    next();
}