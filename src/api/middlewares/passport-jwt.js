import Passport from 'passport';
import PassportJWT from 'passport-jwt';
import {devConfig} from '../../config/env/developement'
import User from '../resources/user/user.modal';

export const configJWTStrategy = () => {
    const option = {
        jwtFromRequest: PassportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: devConfig.secret
    };
    Passport.use(new PassportJWT.Strategy(option, (payload,done)=>{
        User.findOne({_id: payload.id},(err,user) => {
            if(err){
                return done(err);
            }
            if(user){
                return done(null, user);
            }
            return done(null,false); // unautharized user
        });
    })
);
};

/*
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';
opts.issuer = 'accounts.examplesoft.com';
opts.audience = 'yoursite.net';
*/