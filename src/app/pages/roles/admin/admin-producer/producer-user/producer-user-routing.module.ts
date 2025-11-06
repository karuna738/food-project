import { Routes } from '@angular/router';
import { ProducerUserListComponent } from './producer-user-list/producer-user-list.component';
import { ProducerUserAddComponent } from './producer-user-add/producer-user-add.component';

export const adminProducerUserRouting: Routes = [
  { path: '', redirectTo: 'userlist', pathMatch: 'full' },
  {
    path: 'userlist',
    component: ProducerUserListComponent,
    data: {
      urls: [
        { title: 'Admin', url: '' },
        { title: 'Producer', url: '' },
        { title: 'Producer List', url: '' },
      ],
    },
  },
  {
    path: 'useradd',
    component: ProducerUserAddComponent,
    data: {
      urls: [
        { title: 'Admin', url: '' },
        { title: 'Producer', url: '' },
        { title: 'Producer Add', url: '' },
      ],
    },
  },
];
