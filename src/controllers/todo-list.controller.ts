import { Request, Response } from "express";
import TodoServices from "../services/todo-list.service";

class TodoController {
  async get(req: Request, res: Response) {
    try {
      const todos = await TodoServices.getAll();
      res.status(200).json({ data: todos });
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { title, description, done } = req.body;
      const todos = await TodoServices.create({ title, description, done });
      res.status(200).json({ data: todos });
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
      const { title, description, done } = req.body;
      const todos = await TodoServices.update(id, { title, description, done });
      res.status(200).json({ data: todos });
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
      await TodoServices.remove(id);
      res.status(200).json({ data: "ok" });
    } catch (error) {
      res.status(500).json({ error });
    }
  }
}

const todoController = new TodoController();

export default todoController;
