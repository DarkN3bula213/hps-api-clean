import { Request, Response, NextFunction } from "express";
import { verifyApiKey } from "./authService";
import { MiddlewareError, MiddlewareFunction } from "./utils";

// export function apiKeyValidator(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): MiddlewareFunction {
//   const apiKey = req.headers["x-api-key"];

//   if (!apiKey) {
//     return res.status(401).json({ error: "API key is required" });
//   }

//   if (!verifyApiKey(apiKey as string)) {
//     return res.status(403).json({ error: "Invalid API key" });
//   }

//   next();
// }
 
export const apiKeyValidator: MiddlewareFunction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Your authentication logic here
  const token = req.headers.authorization || req.query.token;

  if (!token) {
    const error = new Error("Authentication required") as MiddlewareError;
    error.statusCode = 401;
    error.code = "UNAUTHORIZED";
    throw error;
  }

  // Process token and set user in request
  // req.user = decodedUser;
  next();
};