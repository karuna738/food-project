import { Routes } from '@angular/router';
import { ProducerOwnerListComponent } from './producer-owner-list/producer-owner-list.component';
import { ProducerOwnerAddComponent } from './producer-owner-add/producer-owner-add.component';

export const adminProducerOwnerRouting: Routes = [
  { path: '', redirectTo: 'ownerlist', pathMatch: 'full' },
  {
    path: 'ownerlist',
    component: ProducerOwnerListComponent,
    data: {
      urls: [
        { title: 'Admin', url: '' },
        { title: 'Owner', url: '' },
        { title: 'Owner List', url: '' },
      ],
    },
  },
  {
    path: 'owneradd',
    component: ProducerOwnerAddComponent,
    data: {
      urls: [
        { title: 'Admin', url: '' },
        { title: 'Owner', url: '' },
        { title: 'Owner Add', url: '' },
      ],
    },
  },
];
