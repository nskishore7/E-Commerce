import jwt from "jsonwebtoken"

const securitykey = "project2"


export function createToken(payload,optional){
    return jwt.sign(payload,securitykey,optional)
}