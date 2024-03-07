import { Observable } from 'rxjs';
import { Command } from '../interfaces/command.interface';
import { User } from '../interfaces/user.interface';
import { UserRepository } from '../repositories/user.repository';

export class UpdateUserCommand implements Command<User[]> {
  constructor(private userRepository: UserRepository, private user: User) {}

  execute(): Observable<User[]> {
    return this.userRepository.update(this.user);
  }
}
