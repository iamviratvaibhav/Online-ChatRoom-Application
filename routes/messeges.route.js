import express from "express";
import {getmessage, sendmessage} from "../controller/messages.controller.js";
import secureRoute from "../middleware/secureRoute.js";

const router=express.Router();
router.post("/sendmessage/:id", secureRoute, sendmessage);
router.get("/getmessage/:id", secureRoute, getmessage);

export default router

