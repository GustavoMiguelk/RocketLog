import { Request, Response, NextFunction } from "express";
import { AppError } from "@/utils/AppError";

export function verifyUserAuthorization(role: string[]): any{
    return (request: Request, response: Response, next: NextFunction) => {
        // Verifica a existência de um usuário
        if(!request.user){
            throw new AppError("Unauthorized", 401)
        }

        // Verifica a existência de uma role
        if(!role.includes(request.user.role)){
            throw new AppError("Unauthorized", 401)
        }

        return next()
    }
}