import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationsItemComponent } from './applications-item.component';

describe('ApplicationsItemComponent', () => {
  let component: ApplicationsItemComponent;
  let fixture: ComponentFixture<ApplicationsItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationsItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
