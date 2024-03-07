import { Injectable } from '@angular/core';
import { Command } from '../interfaces/command.interface';
import { User } from '../interfaces/user.interface';
import { Observable } from 'rxjs';
import { UserRepository } from '../repositories/user.repository';

export class RemoveUserCommand implements Command<User[]> {
  constructor(
    private userRepository: UserRepository,
    private id: string
  ) {}

  execute(): Observable<User[]> {
    return this.userRepository.remove(this.id);
  }
}
