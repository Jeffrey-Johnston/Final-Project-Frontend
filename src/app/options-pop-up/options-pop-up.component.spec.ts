import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionsPopUpComponent } from './options-pop-up.component';

describe('OptionsPopUpComponent', () => {
  let component: OptionsPopUpComponent;
  let fixture: ComponentFixture<OptionsPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OptionsPopUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionsPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
