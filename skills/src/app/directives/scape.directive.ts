import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appScape]',
  standalone: true,
})
export class ScapeDirective {
  constructor() {}

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  }
}
