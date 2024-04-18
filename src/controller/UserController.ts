import { AppDataSource } from "../data-source";
import { Request } from "express";
import { User } from "../entity/User";

export class UserController {
  private userRepository = AppDataSource.getRepository(User);

  async all() {
    return this.userRepository.find();
  }

  async one(request: Request) {
    const id = parseInt(request.params.id);

    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      return "unregistered user";
    }
    return user;
  }

  async save(request: Request) {
    const { firstName, lastName, description } = request.body;

    const user = Object.assign(new User(), {
      firstName,
      lastName,
      description,
    });

    return this.userRepository.save(user);
  }

  async remove(request: Request) {
    const id = parseInt(request.params.id);

    let userToRemove = await this.userRepository.findOneBy({ id });

    if (!userToRemove) {
      return "this user does not exist";
    }

    await this.userRepository.remove(userToRemove);

    return "user has been removed";
  }

  async update(request: Request) {
    const id = parseInt(request.params.id);
    const { firstName, lastName, description } = request.body;

    let userToUpdate = await this.userRepository.findOneBy({ id });

    if (!userToUpdate) {
      return "this user does not exist";
    }

    return this.userRepository.save({
      id: userToUpdate.id,
      firstName: firstName ?? userToUpdate.firstName,
      lastName: lastName ?? userToUpdate.lastName,
      description: description ?? userToUpdate.description,
    });
  }
}
