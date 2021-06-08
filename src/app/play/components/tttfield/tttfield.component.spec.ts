import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TTTFieldComponent } from './tttfield.component';

describe('TTTFieldComponent', () => {
  let component: TTTFieldComponent;
  let fixture: ComponentFixture<TTTFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TTTFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TTTFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
