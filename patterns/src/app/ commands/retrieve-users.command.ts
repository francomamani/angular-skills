import { Observable } from 'rxjs';
import { Command } from '../interfaces/command.interface';
import { User } from '../interfaces/user.interface';
import { UserRepository } from '../repositories/user.repository';

export class RetrieveUsersCommand implements Command<User[]> {
  constructor(private userRepository: UserRepository) {}

  execute(): Observable<User[]> {
    return this.userRepository.getAll();
  }
}
