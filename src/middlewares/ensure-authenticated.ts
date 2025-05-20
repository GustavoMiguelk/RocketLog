import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import { authConfig } from "@/configs/auth";
import { AppError } from "@/utils/AppError";

interface TokenPayLoad{
    role: string
    sub: string
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction){
    try
    {   
        // Recupera o Token
        const authHeader = request.headers.authorization

        // Verifica a existencia do Token
        if(!authHeader){
            throw new AppError("JWT Token not found", 401)
        }

        // Separa o Token da palavra Bearer
        const [, token] = authHeader.split(" ")

        // Desestrutura e verifica se o token é válido
        const { role, sub: user_id } = verify(token, authConfig.jwt.secret) as TokenPayLoad

        // Envia na requisição os id do usuario e sua role
        request.user = {
            id: user_id,
            role,
        }

        return next()
    }
    catch(error)
    {
        throw new AppError("Invalid JWT Token", 401)
    }
}

