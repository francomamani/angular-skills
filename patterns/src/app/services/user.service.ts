import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { map, switchMap, tap } from 'rxjs/operators';
import { generateId } from '../helpers/faker.helper';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  users: User[];
  constructor(private http: HttpClient) {
    this.users = [];
  }

  getUsers(): Observable<User[]> {
    return this.http.get('assets/users.json').pipe(
      map((users: any) =>
        users.map((user: User) => ({ ...user, id: generateId(10) }))
      ),
      switchMap((users: User[]) => {
        this.users = users;
        return of(users);
      })
    );
  }

  search(text: string): Observable<User[]> {
    return of(this.users).pipe(
      map((users: User[]) =>
        users.filter((user: User) =>
          user.name.toLowerCase().includes(text.toLowerCase())
        )
      )
    );
  }

  remove(id: string): Observable<User[]> {
    this.users = this.users.filter((user: User) => user.id !== id);
    return of(this.users);
  }

  update(userModified: User): Observable<User[]> {
    this.users = this.users.map((user: User) => {
      return user.id === userModified.id ? userModified : user;
    });
    return of(this.users);
  }
}
