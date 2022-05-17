import { Component, OnDestroy, OnInit } from "@angular/core";
import { TabModel } from "../../model/tab.model";
import { BuildService } from "../services/build.service";
import { OpenedTabsService } from "../services/opened-tabs.service";

@Component({
  selector: "app-code-editor",
  templateUrl: "./code-editor.component.html",
  styleUrls: ["./code-editor.component.css"],
})
export class CodeEditorComponent implements OnInit, OnDestroy {
  readonly hrefContent = "data:text/plain;charset=utf-8,";

  tabs: TabModel[] = [];
  activeTab?: TabModel;

  constructor(
    private openedTabsService: OpenedTabsService,
    private buildService: BuildService
  ) {}

  private static nameTab(tab: TabModel): void {
    const name = prompt("Ingrese el nuevo nombre del archivo.");
    if (name) {
      tab.name = name + (/\.crl$/.test(name) ? "" : ".crl");
    }
  }

  ngOnInit(): void {
    this.tabs = this.openedTabsService.getTabs();
    this.activeTab = this.tabs[0];
    if (this.activeTab) {
      this.activeTab.active = true;
    }
  }

  ngOnDestroy(): void {
    if (this.activeTab) {
      this.activeTab.active = false;
    }
    this.openedTabsService.postTabs(...this.tabs);
  }

  addTab(): void {
    const tab: TabModel = {
      name: "",
      active: true,
      code: "",
    };
    CodeEditorComponent.nameTab(tab);
    if (tab.name) {
      this.changeActiveTab(tab);
      this.tabs.unshift(tab);
    }
  }

  addTabs(tabs: TabModel[]): void {
    if (tabs.length) {
      this.changeActiveTab(tabs[0]);
      this.tabs.unshift(...tabs);
    }
  }

  openTab(index: number): void {
    const tab = this.tabs[index];
    if (tab) {
      this.changeActiveTab(tab);
    }
  }

  deleteTab(index: number): void {
    const tab = this.tabs[index];
    if (tab) {
      this.tabs.splice(index, 1);
      if (tab.active) {
        this.activeTab = this.tabs[0];
        if (this.tabs.length) {
          this.activeTab.active = true;
        }
      }
    }
  }

  renameTab(index: number): void {
    const tab = this.tabs[index];
    if (tab) {
      CodeEditorComponent.nameTab(tab);
    }
  }

  downloadFile() {
    if (this.activeTab) {
      const downloader = document.getElementById("downloader");
      if (downloader) {
        downloader.setAttribute(
          "href",
          this.hrefContent + encodeURIComponent(this.activeTab.code)
        );
        downloader.click();
      }
    }
  }

  buildCode() {
    if (this.activeTab) {
      this.buildService.buildCode(this.activeTab, this.tabs);
    }
  }

  private changeActiveTab(tab: TabModel): void {
    if (this.activeTab) {
      this.activeTab.active = false;
    }
    tab.active = true;
    this.activeTab = tab;
  }
}
