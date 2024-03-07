import { Observable, map } from 'rxjs';
import { Person } from '../interfaces/person';

export class PersonReceiver {
  search(people$: Observable<Person[]>, text: string): Observable<Person[]> {
    return people$.pipe(
      map((people) =>
        people.filter((person: Person) =>
          person.name.toLowerCase().includes(text.toLowerCase())
        )
      )
    );
  }

  delete(people$: Observable<Person[]>, id: string): Observable<Person[]> {
    return people$.pipe(
      map((people: Person[]) =>
        people.filter((person: Person) => person.id !== id)
      )
    );
  }
}
