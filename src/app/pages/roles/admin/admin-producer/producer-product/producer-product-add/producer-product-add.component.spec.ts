import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducerProductAddComponent } from './producer-product-add.component';

describe('ProducerProductAddComponent', () => {
  let component: ProducerProductAddComponent;
  let fixture: ComponentFixture<ProducerProductAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProducerProductAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProducerProductAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
