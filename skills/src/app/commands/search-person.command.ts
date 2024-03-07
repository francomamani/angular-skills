import { Observable } from 'rxjs';
import { Command } from '../interfaces/command';
import { PersonReceiver } from '../receivers/person.receiver';
import { Person } from '../interfaces/person';

export class SearchPersonCommand implements Command {
  constructor(
    private personReceiver: PersonReceiver,
    private people$: Observable<Person[]>,
    private text: string
  ) {}

  execute(): void {
    this.personReceiver.search(this.people$, this.text);
  }
}
