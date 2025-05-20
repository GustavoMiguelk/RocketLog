import { Request, Response } from "express";
import { prisma } from "@/database/prisma";
import { compare } from "bcrypt";
import { z } from "zod"
import { authConfig } from "@/configs/auth";
import { sign } from "jsonwebtoken";
import { AppError } from "@/utils/AppError";

export class SessionsController{
    async create(request: Request, response: Response){
        const bodySchema = z.object({
            email: z.string().email(),
            password: z.string().min(6),
        })

        const { email, password} = bodySchema.parse(request.body)

        // Encontra o primeiro usuário com o email inserido
        const user = await prisma.user.findFirst({
            where: { email },
        })

        // Verifica se existe um usuário
        if(!user){
            throw new AppError("Invalid Email or Password", 401)
        }

        // Compara o hash gerado pelo bcrypt com a senha inserida
        const passowordMatched = await compare(password, user.password)

        // Verifica a senha
        if(!passowordMatched){
            throw new AppError("Invalid Email or Password", 401)
        }

        // Desestruturando AuthConfig
        const { secret, expiresIn } = authConfig.jwt

        const token = sign({ role: user.role ?? "customer"}, secret, {
            subject: user.id,
            expiresIn,
        })

        // Recuperando o dados do usuário sem exibir senha.
        const { password: hashedPassword, ...userWithoutPassword} = user


        response.json({ token, user: userWithoutPassword })
    }
}

