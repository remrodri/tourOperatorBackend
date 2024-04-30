import jwt from "jsonwebtoken";

const jwtSecret = "mipasswordsecreto1";

const verifyToken = (req, res, next) => {
  const accesToken = req.headers.authorization.split(" ")[1]; 

  if (!accesToken) {
    
    return res.status(401).json({ message: "Token no proporcionado" });
  }
  try {
    const decoded = jwt.verify(accesToken, jwtSecret);

    //verificar si el token esta cerca de caducar
    const currentTime = Math.floor(Date.now() / 1000);
    const expirationTime = decoded.exp;
    const expirationBuffer = 5 * 60; //5 minutos en segundos
    const shouldRenewToken = expirationTime - currentTime< expirationBuffer;

    if (shouldRenewToken) { 
      const newAccesToken = jwt.sign(
        { userId: decoded.userId, email: decoded.email },
        jwtSecret, { expiresIn: '2h' }
      );
        res.setHeader("Authorization",`Bearer ${newAccesToken}`);
      
    }

    req.user = decoded;
    next();
  } catch (error) {
    let errorMessage = 'Token invalido';
  
    if (error.name === 'TokenExpired') {
      errorMessage = 'Token expirado';
    } else {
      if (error.message ==='JsonWebTokenError') {
        errorMessage='Token invalido'
      }
    }
    return res.status(401).json({ message: "Token invalido" });
  }
};

export default  {verifyToken};