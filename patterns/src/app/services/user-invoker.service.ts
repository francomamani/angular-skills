import { Injectable } from '@angular/core';
import { Command } from '../interfaces/command.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserInvokerService {
  executeCommand<T>(command: Command<T>): Observable<T> {
    return command.execute();
  }
}
