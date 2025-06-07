import jwt_decode from "jwt-decode";

export function getUserIdFromToken(token) {
  if (!token) return null;
  try {
    const decoded = jwt_decode(token);
    return decoded.user_id;
  } catch (e) {
    console.error("Failed to decode token:", e);
    return null;
  }
}