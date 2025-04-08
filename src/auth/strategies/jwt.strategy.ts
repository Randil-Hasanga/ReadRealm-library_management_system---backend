import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor() {
        // super({
        //     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        //     ignoreExpiration: false,
        //     secretOrKey: 'abc123'
        // });
        
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (req: Request) => {
                    let token = null;
                    if(req && req.cookies){
                        token = req.cookies['auth_token']
                    }
                    return token;
                }
            ]),
            ignoreExpiration: false,
            secretOrKey: `${process.env.JWT_SECRET}`
        });
    }
    
    validate(payload: any) {
        return payload;
    }
}