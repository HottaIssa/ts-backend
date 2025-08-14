import TodoListModel, { type TTodoList } from "./todoList";

export async function listItems() {
  return await TodoListModel.find();
}

export async function createItem(todo: TTodoList) {
  const addedTodo = new TodoListModel(todo);

  return await addedTodo.save();
}
export async function updateItem(_id: string, todoChanges: Partial<TTodoList>) {
  const updateItem = await TodoListModel.findOneAndUpdate(
    { _id },
    {
      $set: todoChanges,
    },
    {
      new: true,
    },
  );

  return updateItem;
}
export async function removeItem(_id: string) {
  await TodoListModel.findOneAndDelete({ _id });
}
