import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScopeSymbolsComponent } from './scope-symbols.component';

describe('ScopeSymbolsComponent', () => {
  let component: ScopeSymbolsComponent;
  let fixture: ComponentFixture<ScopeSymbolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScopeSymbolsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScopeSymbolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
