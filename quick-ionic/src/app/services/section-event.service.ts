import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SectionEventService {
  deleteSection: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }
}
