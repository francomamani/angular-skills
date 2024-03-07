import { Component, OnInit } from '@angular/core';
import { UserInvokerService } from '../../services/user-invoker.service';
import { User } from '../../interfaces/user.interface';
import { RetrieveUsersCommand } from '../../ commands/retrieve-users.command';
import { UserRepository } from '../../repositories/user.repository';
import { Command } from '../../interfaces/command.interface';
import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  of,
  startWith,
  switchMap,
} from 'rxjs';
import { SearchUsersCommand } from '../../ commands/search-users.command';
import { RemoveUserCommand } from '../../ commands/remove-user.command';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UpdateUserCommand } from '../../ commands/update-user.command';
import { generateId } from '../../helpers/faker.helper';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit {
  users: User[];
  searchControl: FormControl;
  userGroup: FormGroup;
  updating: boolean;

  constructor(
    private userInvoker: UserInvokerService,
    private userRepository: UserRepository,
    private fb: FormBuilder
  ) {
    this.users = [];
    this.searchControl = new FormControl('');
    this.updating = false;

    this.userGroup = fb.group({
      name: new FormControl(''),
      age: new FormControl(),
      id: new FormControl(),
    });
  }

  ngOnInit() {
    this.load();
    this.searchControl.valueChanges
      .pipe(distinctUntilChanged(), debounceTime(300), startWith(''))
      .subscribe((text: string) => {
        this.search(text);
      });
  }

  load(): void {
    const retrieveUsersCommand = new RetrieveUsersCommand(this.userRepository);
    this.executeCommand(retrieveUsersCommand);
  }

  updateUser(user: User) {
    this.updating = true;
    this.userGroup.patchValue(user);
  }

  search(text: string): void {
    const searchUsersCommand = new SearchUsersCommand(
      this.userRepository,
      text
    );
    this.executeCommand(searchUsersCommand);
  }

  remove(id: string): void {
    const removeUserCommand = new RemoveUserCommand(this.userRepository, id);
    this.executeCommand(removeUserCommand);
    this
  }

  update(): void {
    const user: User = this.userGroup.value;
    const updateUserCommand = new UpdateUserCommand(this.userRepository, user);
    this.executeCommand(updateUserCommand);
    this.updating = false;
  }

  private executeCommand<T>(command: Command<T>): void {
    this.userInvoker.executeCommand(command).subscribe((list: T) => {
      if (list instanceof Array) {
        this.users = list;
      }
    });
  }
}
