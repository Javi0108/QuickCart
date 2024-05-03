import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SectionEventService {
  
  moveSectionDown: EventEmitter<any> = new EventEmitter<any>();
  moveSectionUp: EventEmitter<any> = new EventEmitter<any>();
  deleteSection: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }
}
