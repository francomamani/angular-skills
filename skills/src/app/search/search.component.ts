import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { PeopleService } from '../services/people.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  startWith,
  switchMap,
  tap,
} from 'rxjs/operators';
import { Person } from '../interfaces/person';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScapeDirective } from '../directives/scape.directive';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ScapeDirective],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements OnInit {
  textControl: FormControl;
  source$ = new BehaviorSubject<Person[]>([]);
  people: Person[];

  textControl$ = new BehaviorSubject<string>('');

  constructor(private peopleService: PeopleService) {
    this.textControl = new FormControl('');
    this.people = [];
  }

  ngOnInit(): void {
    this.peopleService
      .getPeople()
      .subscribe((people: Person[]) => this.source$.next(people));

    this.textControl$
      .pipe(
        distinctUntilChanged(),
        debounceTime(300),
        startWith(''),
        tap((value) => console.info(value)),
        switchMap((text: string) =>
          this.peopleService.searchByName(this.source$, text)
        )
      )
      .subscribe((people) => (this.people = people));

    this.textControl.valueChanges.subscribe((value: string): void => {
      this.textControl$.next(value);
    });
  }

  delete(id: string): void {
    this.peopleService.deleteById(this.source$, id).subscribe((people) => {
      this.source$.next(people);
      this.people = people;
    });
  }
}
