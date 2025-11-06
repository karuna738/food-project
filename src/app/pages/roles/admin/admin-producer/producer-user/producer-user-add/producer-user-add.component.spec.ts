import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducerUserAddComponent } from './producer-user-add.component';

describe('ProducerUserAddComponent', () => {
  let component: ProducerUserAddComponent;
  let fixture: ComponentFixture<ProducerUserAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProducerUserAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProducerUserAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
