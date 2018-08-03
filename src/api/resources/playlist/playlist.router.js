import express from 'express';
import playlistController from './playlist.controller';
export const  playListRouter = express.Router();

playListRouter.route('/')
.post(playlistController.create)