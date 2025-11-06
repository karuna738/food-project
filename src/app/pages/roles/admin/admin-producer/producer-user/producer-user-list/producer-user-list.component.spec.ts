import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducerUserListComponent } from './producer-user-list.component';

describe('ProducerUserListComponent', () => {
  let component: ProducerUserListComponent;
  let fixture: ComponentFixture<ProducerUserListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProducerUserListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProducerUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
