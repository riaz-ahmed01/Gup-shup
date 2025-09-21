import express from 'express';
import { getMessages, sendMessage } from '../controllers/message.controller.js';
import { isAuthenticated } from '../middlewares/auth.middleware.js';


const router = express.Router();


router.route("/send/:receiverId").post(isAuthenticated, sendMessage);

router.route("/get-message/:otherParticipantId").get(isAuthenticated, getMessages);



export default router;