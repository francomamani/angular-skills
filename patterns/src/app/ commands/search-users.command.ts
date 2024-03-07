import { Observable } from 'rxjs';
import { Command } from '../interfaces/command.interface';
import { User } from '../interfaces/user.interface';
import { UserRepository } from '../repositories/user.repository';

export class SearchUsersCommand implements Command<User[]> {
  constructor(
    private userRepository: UserRepository,
    private text: string
  ) {}

  execute(): Observable<User[]> {
    return this.userRepository.search(this.text);
  }
}
