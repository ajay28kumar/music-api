import userService from "./user.service";
import User from './user.modal';
import jwt from "../../helpers/jwt";
export default {
   async signup(req,res){
       try {
        const {value,error} = userService.validateSignup(req.body);
        if(error){
            return res.status(400).json(error);
        }
        const hashedPassword = userService.encryptPassword(value.password);
        console.log(hashedPassword);
        const user = await User.create({
            email: value.email,
            password: hashedPassword,
            firstName: value.firstName,
            lastName: value.lastName,
            role: value.role
        });
        return res.json({success: true})
    }catch(error){
        console.error(error);
        return res.status(500).send(error);
    }
    },
    async login (req,res){
        try {
            const {value,error} = userService.validateLogin(req.body);
            if(error){
                return res.status(400).json(error);
            }
            const user = await User.findOne({email: value.email});
            if(!user){
                return res.status(401).json({msg: "user not found", err: "not valid user"});
            }
            const authenticated = userService.comparePassword(value.password, user.password);
            if(!authenticated){
                return res.status(401).json({msg: "password is wrong", err: "not valid user"});
            }
            const token = jwt.issue({id: user._id},'1d');
            res.json({token}) //send jwt

        } catch(error){
        console.error(error);
        return res.status(500).send(error);
    }
    },
    authenticate(req,res){
        return res.json(req.user)
    }
}