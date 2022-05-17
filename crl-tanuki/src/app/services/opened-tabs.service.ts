import { Injectable } from '@angular/core';
import {TabModel} from "../../model/tab.model";

@Injectable({
  providedIn: 'root'
})
export class OpenedTabsService {
  private readonly tabs: TabModel[] = [];

  constructor() { }

  postTabs(...tabs: TabModel[]): void {
    this.tabs.length = 0;
    this.tabs.push(...tabs);
  }

  getTabs(): TabModel[] {
    return [...this.tabs];
  }
}
