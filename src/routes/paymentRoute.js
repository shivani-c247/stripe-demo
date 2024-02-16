import express from "express"
import { paymentController } from "../controllers/index.js"

const router = express.Router()

router.get("/products", paymentController.subscriptionPlans)
router.post(
    "/subscription",
    paymentController.createSubscription
)
// router.post(
//     "/webhook",
//     express.raw({ type: "application/json" }),
//     paymentController.createWebhook
// )

export default router
