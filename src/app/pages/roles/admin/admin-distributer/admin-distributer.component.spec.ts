import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDistributerComponent } from './admin-distributer.component';

describe('AdminDistributerComponent', () => {
  let component: AdminDistributerComponent;
  let fixture: ComponentFixture<AdminDistributerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminDistributerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDistributerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
