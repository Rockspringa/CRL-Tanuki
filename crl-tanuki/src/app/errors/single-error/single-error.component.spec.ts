import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleErrorComponent } from './single-error.component';

describe('SingleErrorComponent', () => {
  let component: SingleErrorComponent;
  let fixture: ComponentFixture<SingleErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleErrorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
