import { Injectable } from '@angular/core';
import { AnalyzeError } from "@crl-rocks/crl-compiler";

@Injectable({
  providedIn: 'root'
})
export class ErrorsService {
  private readonly errors: AnalyzeError[] = [];

  constructor() {}

  postErrors(errors: AnalyzeError[]): void {
    this.errors.length = 0;
    this.errors.push(...errors);
  }

  getErrors(): AnalyzeError[] {
    return [...this.errors];
  }
}
