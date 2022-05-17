import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionAstComponent } from './function-ast.component';

describe('FunctionAstComponent', () => {
  let component: FunctionAstComponent;
  let fixture: ComponentFixture<FunctionAstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FunctionAstComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FunctionAstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
