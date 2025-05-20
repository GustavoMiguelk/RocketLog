import { Request, Response} from "express";
import { z } from "zod"
import { prisma } from "@/database/prisma";

// Importando a funcionalidade hash.
import { hash } from "bcrypt";
import { AppError } from "@/utils/AppError";

export class UsersController{
    async create(request: Request, response: Response){
        const bodySchema = z.object({
            name: z.string().trim().min(2),
            email: z.string().email(),
            password: z.string().min(6).trim(),
        })

        const {name, email, password} = bodySchema.parse(request.body)

        
        const userWithSameEmail = await prisma.user.findFirst({ where: { email }})
        
        if(userWithSameEmail){
            throw new AppError("User with same email already exists")
        }

        const hashedPassword = await hash(password, 8)

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            }
        })

        const { password: _, ...userWithoutPassword} = user

        response.status(201).json({ userWithoutPassword })
    }
}

