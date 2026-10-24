import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token manquant." });
  }
  const token = authHeader.split(" ")[1];
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token invalide ou expiré." });
  }
};

export const authorize = (...rolesAutorises) => (req, res, next) => {
  if (!rolesAutorises.includes(req.user.role)) {
    return res.status(403).json({ message: "Accès refusé pour ce rôle." });
  }
  next();
};