import { SessionsController } from "@/controllers/sessions-controller";
import { Router } from "express";

export const sesionsRoutes = Router()

const sessionsController = new SessionsController()

sesionsRoutes.post("/", sessionsController.create)
