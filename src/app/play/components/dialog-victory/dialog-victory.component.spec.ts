import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogVictoryComponent } from './dialog-victory.component';

describe('DialogVictoryComponent', () => {
  let component: DialogVictoryComponent;
  let fixture: ComponentFixture<DialogVictoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogVictoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogVictoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
