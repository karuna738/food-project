import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRetailerComponent } from './admin-retailer.component';

describe('AdminRetailerComponent', () => {
  let component: AdminRetailerComponent;
  let fixture: ComponentFixture<AdminRetailerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminRetailerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminRetailerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
