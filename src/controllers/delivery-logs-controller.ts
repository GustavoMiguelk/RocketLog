import { Request, Response } from "express";
import { z } from "zod";
import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/AppError";

export class DeliveryLogsController{
    async create(request: Request, response: Response):Promise<any>{
        const bodySchema = z.object({
            delivery_id: z.string().uuid(),
            description: z.string()
        })

        const { delivery_id, description } = bodySchema.parse(request.body)

        const delivery = await prisma.delivery.findUnique({
            where: { id: delivery_id }
        })

        if(!delivery){
            throw new AppError("Delivery Not Found", 404)
        }
        
        if(delivery.status === "delivered"){
            throw new AppError("This order has already been delivered")
        }

        if(delivery.status === "processing"){
            throw new AppError("Change status to Shipped")
        }

        await prisma.deliveryLog.create({
            data:{
                deliveryId: delivery_id,
                description
            }
        })

        return response.status(201).json()
    }

    async show(request:Request, response:Response):Promise<any>{
        const paramsSchema = z.object({
            delivery_id: z.string().uuid()
        })

        const { delivery_id } = paramsSchema.parse(request.params)
        
        // Seleciona e Exibe o Dados do Usuário e os Logs
        const delivery = await prisma.delivery.findUnique({
            where: { id: delivery_id },
            include: {
                user: { select: { name: true, email: true}},
                DeliveryLog: true,
            }
        })

        if(request.user?.role === "customer" && request.user.id !== delivery?.userId){
            throw new AppError("The user can only view their deliveries", 401)
        }

        return response.json(delivery)
    }
}
