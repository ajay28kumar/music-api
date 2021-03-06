import {ARTIST_ROLE} from '../resources/user/user.modal'
export const isArtist = (req, res,next) => {
    if(req.user.role !== ARTIST_ROLE){
        return res.json({err: 'unauthorized, not an artist'})
    }
    next();
}