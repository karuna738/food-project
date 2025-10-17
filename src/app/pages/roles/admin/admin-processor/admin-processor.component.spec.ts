import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProcessorComponent } from './admin-processor.component';

describe('AdminProcessorComponent', () => {
  let component: AdminProcessorComponent;
  let fixture: ComponentFixture<AdminProcessorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminProcessorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminProcessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
