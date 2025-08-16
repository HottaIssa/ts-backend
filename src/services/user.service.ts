import UserRepository from "../repository/user.repository";
import { compare, encrypt } from "../utils/encript";
import { Sign } from "../utils/jwt.util";

interface CreateUserDTO {
  email: string;
  password: string;
  name: string;
  active?: boolean;
  verified?: boolean;
}

class UserServices {
  async getAll() {
    return UserRepository.findAll();
  }

  async getById(id: string) {
    return UserRepository.findById(id);
  }

  async getByEmail(email: string) {
    return UserRepository.findByEmail(email);
  }

  async create(createDTO: CreateUserDTO) {
    const hashed = await encrypt(createDTO.password);
    return UserRepository.create({
      ...createDTO,
      password: hashed,
    });
  }

  async update(_id: string, updateDTO: Partial<CreateUserDTO>) {
    return UserRepository.update(_id, updateDTO);
  }

  async remove(id: string) {
    return UserRepository.delete(id);
  }

  async getTodosByUser(user: string) {
    return UserRepository.getTodosByUser(user);
  }

  async login(email: string, password: string) {
    const user = await UserRepository.findByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }
    const correct = await compare(password, user.password ?? "");
    if (!correct) {
      throw new Error("incorrect user / password");
    }

    const token = await Sign({
      _id: user.id.toString(),
      email: user.email ?? "",
    });
    return token;
  }

  async refreshToken(user: { _id: string; email: string }) {
    const token = await Sign(user);
    return token;
  }
}

const userService = new UserServices();

export default userService;
