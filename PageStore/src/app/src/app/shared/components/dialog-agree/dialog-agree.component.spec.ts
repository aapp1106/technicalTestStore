import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAgreeComponent } from './dialog-agree.component';

describe('DialogAgreeComponent', () => {
  let component: DialogAgreeComponent;
  let fixture: ComponentFixture<DialogAgreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAgreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAgreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
