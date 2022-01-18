import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationsPopUpComponent } from './applications-pop-up.component';

describe('ApplicationsPopUpComponent', () => {
  let component: ApplicationsPopUpComponent;
  let fixture: ComponentFixture<ApplicationsPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationsPopUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationsPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
