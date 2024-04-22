import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SectionEventService {
  changeSaved: EventEmitter<any> = new EventEmitter<any>();
  sectionEdited: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }
}
