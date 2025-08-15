import UserModel from "../schemas/user.schema";
import TodoModel from "../schemas/todo-list.schema";

interface UserDTO {
  email: string;
  password: string;
  name: string;
  active?: boolean;
  verified?: boolean;
}

class UserRepository {
  async findAll() {
    const result = await UserModel.find({ active: true });
    return result;
  }
  async create(todo: UserDTO) {
    const addedTodo = new UserModel(todo);
    return await addedTodo.save();
  }
  async findById(_id: string) {
    const result = await UserModel.findOne({ _id, active: true });
    return result;
  }
  async findByEmail(email: string) {
    const result = await UserModel.findOne({ email, active: true });
    return result;
  }
  async update(_id: string, userChanges: Partial<UserDTO>) {
    const updateItem = await UserModel.findOneAndUpdate(
      { _id },
      {
        $set: userChanges,
      },
      {
        new: true,
      },
    );

    return updateItem;
  }
  async delete(_id: string) {
    await UserModel.findOneAndUpdate(
      { _id },
      {
        active: false,
      },
    );
  }
  async getTodosByUser(user: string) {
    return TodoModel.find({ user });
  }
}

const userRepository = new UserRepository();

export default userRepository;
