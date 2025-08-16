import { Request, Response } from "express";
import UserServices from "../services/user.service";

class UserController {
  async get(req: Request, res: Response) {
    try {
      const todos = await UserServices.getAll();
      res.status(200).json({ data: todos });
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { email, password, name } = req.body;
      const user = await UserServices.create({ email, password, name });
      // envio de correo

      res.status(200).json({ data: user });
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({ error: "id is required" });
        return;
      }
      const { email, password, name } = req.body;
      const user = await UserServices.update(id, { email, password, name });
      res.status(200).json({ data: user });
    } catch (error) {
      res.status(500).json({ error });
    }
  }
  async remove(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(404).json({ error: "id is not found" });
        return;
      }
      await UserServices.remove(id);
      res.status(200).json({ data: "ok" });
    } catch (error) {
      res.status(500).json({ error });
    }
  }
  async getTodosByuser(req: Request, res: Response) {
    try {
      const user = req.headers.user_id as string;
      if (!user) {
        res.status(404).json({ error: "user is not found" });
        return;
      }
      const todos = await UserServices.getTodosByUser(user);
      res.status(200).json({ data: todos });
    } catch (error) {
      res.status(500).json({ error });
    }
  }
}

const userController = new UserController();

export default userController;
