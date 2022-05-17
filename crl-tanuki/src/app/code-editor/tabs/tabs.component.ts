import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { TabModel } from "../../../model/tab.model";

@Component({
  selector: "app-tabs",
  templateUrl: "./tabs.component.html",
  styleUrls: ["./tabs.component.css"],
})
export class TabsComponent implements OnInit {
  @Input() tabs: TabModel[] = [];
  @Output() open = new EventEmitter<number>();
  @Output() close = new EventEmitter<number>();
  @Output() addTab = new EventEmitter<never>();
  @Output() addFiles = new EventEmitter<TabModel[]>();
  @Output() renameFile = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {}

  async handleFiles(event: any): Promise<void> {
    if (event.files) {
      const files = [...event.files].filter((file: File) =>
        /\.crl$/.test(file.name)
      );

      if (!files.length) {
        return alert("No se encontraron archivos CRL.");
      }
      this.addFiles.emit(
        await Promise.all(
          files.map(
            async (file: File): Promise<TabModel> => ({
              name: file.name,
              code: await file.text(),
              active: false,
            })
          )
        )
      );
      if (files.length !== (event.files as FileList).length) {
        alert("No se cargaron todos los archivos, ya que, no todos son archivos CRL");
      }
    }
  }
}
