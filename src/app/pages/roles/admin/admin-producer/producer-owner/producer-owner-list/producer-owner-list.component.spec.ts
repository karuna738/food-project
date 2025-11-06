import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducerOwnerListComponent } from './producer-owner-list.component';

describe('ProducerOwnerListComponent', () => {
  let component: ProducerOwnerListComponent;
  let fixture: ComponentFixture<ProducerOwnerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProducerOwnerListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProducerOwnerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
