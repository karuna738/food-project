import { Routes } from '@angular/router';
import { ProducerProductListComponent } from './producer-product-list/producer-product-list.component';
import { ProducerProductAddComponent } from './producer-product-add/producer-product-add.component';

export const adminProducerProductRouting: Routes = [
  { path: '', redirectTo: 'productlist', pathMatch: 'full' },
  {
    path: 'productlist',
    component: ProducerProductListComponent,
    data: {
      urls: [
        { title: 'Admin', url: '' },
        { title: 'Product', url: '' },
        { title: 'Product List', url: '' },
      ],
    },
  },
  {
    path: 'productadd',
    component: ProducerProductAddComponent,
    data: {
      urls: [
        { title: 'Admin', url: '' },
        { title: 'Product', url: '' },
        { title: 'Product Add', url: '' },
      ],
    },
  },
];
