import express from 'express';
import userController from './user.controller';
import passport from 'passport';

export const userRouter = express.Router();


userRouter.post('/signup', userController.signup);
userRouter.post('/login', userController.login);
userRouter.get('/me', passport.authenticate('jwt', {session:false}) ,userController.authenticate);