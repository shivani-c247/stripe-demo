import express from "express";
import paymentRoute from "./paymentRoute.js";

const router = express.Router();

router.use("/", paymentRoute);

export default router;