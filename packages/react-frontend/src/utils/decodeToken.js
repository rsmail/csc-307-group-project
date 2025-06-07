
import {jwt} from 'jsonwebtoken';

export function getUserIdFromToken(token) {
    const decoded =  jwt.decode(token)
    return decoded.userId
  }