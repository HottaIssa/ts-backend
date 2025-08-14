import express from "express";
import { ConnectDatabase } from "./database/database";
import { listItems, createItem, updateItem, removeItem } from "./todo-list";
import bodyParser from "body-parser";
import type { TTodoList } from "./todoList";

const app = express();

app.use(bodyParser.json());

const port = 3000;

ConnectDatabase();

app.get("/", async (req, res) => {
  try {
    const result = await listItems();
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.post("/test", async (req, res) => {
  const body = req.body;
  res.status(200).json({ body });
});

app.post("/", async (req, res) => {
  const { title, description, done } = req.body;
  try {
    const newTodo: TTodoList = {
      title,
      description,
      done,
    };
    const data = await createItem(newTodo);
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  try {
    const data = await updateItem(id, body);
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await removeItem(id);
    res.status(200).json({ status: "ok" });
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.listen(3000, () => {
  console.log(`Server running on port http://localhost:${port}`);
});
