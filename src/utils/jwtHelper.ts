import jwt from "jsonwebtoken";

const generateToken = async (userId: number): Promise<string> => {
  return jwt.sign({ userId }, "signature", { expiresIn: "12d" });
};

const getUserInfoFromToken = async (token: string) => {
  try {
    const userData = jwt.verify(token, "signature") as {
      userId: number;
    };
    return userData;
  } catch (error) {
    return null;
  }
};

export const jwtHelper = {
    generateToken,
    getUserInfoFromToken,
}