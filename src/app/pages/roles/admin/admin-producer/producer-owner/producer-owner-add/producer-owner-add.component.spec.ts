import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducerOwnerAddComponent } from './producer-owner-add.component';

describe('ProducerOwnerAddComponent', () => {
  let component: ProducerOwnerAddComponent;
  let fixture: ComponentFixture<ProducerOwnerAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProducerOwnerAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProducerOwnerAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
