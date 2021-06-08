import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayUIComponent } from './play-ui.component';

describe('PlayUIComponent', () => {
  let component: PlayUIComponent;
  let fixture: ComponentFixture<PlayUIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayUIComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayUIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
