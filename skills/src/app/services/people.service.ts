import { Injectable } from '@angular/core';
import { Person } from '../interfaces/person';
import { HttpClient } from '@angular/common/http';
import { Observable, from, of } from 'rxjs';
import { concatMap, delay, filter, map, switchMap } from 'rxjs/operators';
import { generateId } from '../helpers/fake';

@Injectable({
  providedIn: 'root',
})
export class PeopleService {
  constructor(private http: HttpClient) {}

  getPeople(): Observable<Person[]> {
    return this.http
      .get('assets/people.json')
      .pipe(
        map((people: any) =>
          people.map((person: Person) => ({ ...person, id: generateId(10) }))
        )
      );
  }

  searchByName(
    people$: Observable<Person[]>,
    text: string
  ): Observable<Person[]> {
    return people$.pipe(
      map((people: Person[]) =>
        people.filter((person: Person) =>
          person.name.toLowerCase().includes(text.toLowerCase())
        )
      )
    );
  }

  deleteById(people$: Observable<Person[]>, id: string): Observable<Person[]> {
    return people$.pipe(
      map((people: Person[]) =>
        people.filter((person: Person) => person.id !== id)
      )
    );
  }
}
