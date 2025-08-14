import TodoModel from "../schemas/todo-list.schema";

interface CreateTodoDTO {
  title: string;
  description: string;
  done: boolean;
}

class TodoRepository {
  async findAll() {
    const result = await TodoModel.find({ archived: false });
    return result;
  }
  async create(todo: CreateTodoDTO) {
    const addedTodo = new TodoModel(todo);
    return await addedTodo.save();
  }
  async findById(_id: string) {
    const result = await TodoModel.findOne({ _id });
    return result;
  }
  async update(_id: string, todoChanges: Partial<CreateTodoDTO>) {
    const updateItem = await TodoModel.findOneAndUpdate(
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
  async delete(_id: string) {
    await TodoModel.findOneAndUpdate(
      { _id },
      {
        archived: true,
      },
    );
  }
}

const todoRepository = new TodoRepository();

export default todoRepository;
