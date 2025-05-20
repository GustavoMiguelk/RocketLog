import { Router } from "express"

import { userRoutes } from "./users-routes"
import { sesionsRoutes } from "./sessions-routes"


export const routes = Router()
routes.use("/users", userRoutes)
routes.use("/sessions", sesionsRoutes)
