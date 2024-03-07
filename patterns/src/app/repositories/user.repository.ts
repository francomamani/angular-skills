import { Injectable } from '@angular/core';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserRepository {
  constructor(private userService: UserService) {}

  getAll(): Observable<User[]> {
    return this.userService.getUsers();
  }

  search(text: string): Observable<User[]> {
    return this.userService.search(text);
  }

  remove(id: string): Observable<User[]> {
    return this.userService.remove(id);
  }

  update(user: User): Observable<User[]> {
    return this.userService.update(user);
  }
}
