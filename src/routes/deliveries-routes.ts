import { Router } from "express";
import { DeliveryController } from "@/controllers/deliveries-controller";
import { DeliveryStatusController } from "@/controllers/deliveris-status-controller";

import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";
import { verifyUserAuthorization } from "@/middlewares/verify-user-auth";

export const deliveryRoutes = Router()

const deliveryController = new DeliveryController()
const deliveryStatusController = new DeliveryStatusController()

deliveryRoutes.use(ensureAuthenticated)

// Especifica que somente vendedores podem acessar a rota.
deliveryRoutes.use(verifyUserAuthorization(["sale"]))

deliveryRoutes.get("/", deliveryController.index)
deliveryRoutes.post("/", deliveryController.create)

deliveryRoutes.patch("/:id/status", deliveryStatusController.update)