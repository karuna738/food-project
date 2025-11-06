import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducerProductListComponent } from './producer-product-list.component';

describe('ProducerProductListComponent', () => {
  let component: ProducerProductListComponent;
  let fixture: ComponentFixture<ProducerProductListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProducerProductListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProducerProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
