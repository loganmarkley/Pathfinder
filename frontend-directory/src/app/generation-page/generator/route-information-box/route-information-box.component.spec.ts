import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteInformationBoxComponent } from './route-information-box.component';

describe('RouteInformationBoxComponent', () => {
  let component: RouteInformationBoxComponent;
  let fixture: ComponentFixture<RouteInformationBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouteInformationBoxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RouteInformationBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
