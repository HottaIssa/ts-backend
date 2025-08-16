import type { Request, Response } from "express";
import UserServices from "../services/user.service";
import OtpServices from "../services/otp.service";
import { ValidateToken } from "../utils/jwt.util";
import { compare } from "../utils/encript";
import otpRepository from "../repository/otp.repository";
import otpService from "../services/otp.service";

class AuthController {
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const token = await UserServices.login(email, password);
      res.status(200).json({ token: token });
    } catch (error) {
      res.status(500).json({ error });
    }
  }
  async refreshToken(req: Request, res: Response) {
    try {
      const header = req.header("Authorization") || "";
      const old_token = header.split(" ")[1] || "";
      const { refresh_token } = req.body;
      const actual_token = (await ValidateToken(refresh_token)) as {
        token: string;
      };
      const user = (await ValidateToken(old_token)) as {
        _id: string;
        email: string;
      };

      if (actual_token.token === old_token) {
        const newToken = await UserServices.refreshToken({
          _id: user._id,
          email: user.email,
        });
        res.status(200).json(newToken);
      } else {
        res.status(403).json({ error: "Token no valido" });
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  async register(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;
      await UserServices.create({ email, name, password });
      await OtpServices.create(email);
      res.status(200).json({ data: "ok" });
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  async generateNewOtp(req: Request, res: Response) {
    try {
      const { email } = req.body;
      await otpService.create(email);
      res.status(200).json({ data: "ok" });
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  async validateOtp(req: Request, res: Response) {
    try {
      const { email, code } = req.body;
      const user = await UserServices.getByEmail(email);
      if (!user) {
        res.status(404).json({ error: "user not found" });
      }
      const found = await otpRepository.find(email);
      if (!found) {
        res.status(404).json({ error: "code not found" });
      }
      const isValid = await compare(code, found.code ?? "");
      if (!isValid) {
        res.status(403).json({ error: "code not correct" });
      }
      await UserServices.update(user?._id.toString() ?? "", { verified: true });
      res.status(200).json({ data: "user verified" });
    } catch (error) {
      res.status(500).json({ error });
    }
  }
}

const authController = new AuthController();
export default authController;
