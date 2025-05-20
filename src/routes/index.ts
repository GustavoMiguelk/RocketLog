import { Router } from "express"

import { userRoutes } from "./users-routes"
import { sesionsRoutes } from "./sessions-routes"
import { deliveryRoutes } from "./deliveries-routes"
import { deliveryLogRoutes } from "./delivery-logs-routes"

export const routes = Router()

routes.use("/users", userRoutes)
routes.use("/sessions", sesionsRoutes)
routes.use("/deliveries", deliveryRoutes)
routes.use("/delivery-logs", deliveryLogRoutes)
