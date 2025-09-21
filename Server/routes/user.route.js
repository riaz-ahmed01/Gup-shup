import express from 'express';
import { getOtherUser, getUserProfile, loginUser, logoutUser, registerUser } from '../controllers/user.controller.js';
import { isAuthenticated } from '../middlewares/auth.middleware.js';

const router = express.Router();

//  route for user registration

router.route('/register').post(registerUser);

// route for user login
router.route('/login').post(loginUser);

// logout user securely using isAuthenticated middleware

router.route('/logout').post(isAuthenticated,logoutUser)

// route for getting user profile securely using isAuthenticated middleware

router.route('/get-profile').get(isAuthenticated,getUserProfile)

router.route('/get-other-users').get(isAuthenticated,getOtherUser)





export default router;
// router.get('/user',registerUser);

