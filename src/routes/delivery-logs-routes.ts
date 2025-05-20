import { Router } from "express";

import { DeliveryLogsController } from "@/controllers/delivery-logs-controller";

import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";
import { verifyUserAuthorization } from "@/middlewares/verify-user-auth";

export const deliveryLogRoutes = Router()
const deliveryLogsController = new DeliveryLogsController

deliveryLogRoutes.post(
    "/", 
    ensureAuthenticated,
    verifyUserAuthorization(["sale"]),
    deliveryLogsController.create,
)

deliveryLogRoutes.get(
    "/:delivery_id/show",
    ensureAuthenticated,
    verifyUserAuthorization(["sale", "customer"]),
    deliveryLogsController.show
)
