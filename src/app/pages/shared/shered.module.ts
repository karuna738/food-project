import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { HeaderComponent } from '../common/header/header.component';
import { LayoutComponent } from '../common/layout/layout.component';
import { SidebarComponent } from '../common/sidebar/sidebar.component';
import { LoaderComponent } from '../common/loader/loader.component';
import { BreadcrumbsComponent } from '../common/breadcrumbs/breadcrumbs.component';
import { TranslateModule } from '@ngx-translate/core';
import { PaginatorComponent } from '../common/paginator/paginator.component';
import { AdminDashboardComponent } from '../roles/admin/admin-dashboard/admin-dashboard.component';
import { ProducerUserListComponent } from '../roles/admin/admin-producer/producer-user/producer-user-list/producer-user-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

export const sheredModule: any = [
  // modules
  CommonModule,
  RouterLink,
  RouterOutlet,
  RouterModule,
  FormsModule,
  ReactiveFormsModule,
  NgSelectModule,
  TranslateModule,
  NgbModule,
  MatDatepickerModule,
  MatInputModule,
  MatFormFieldModule,
  MatNativeDateModule,

  // Components
  HeaderComponent,
  LayoutComponent,
  SidebarComponent,
  LoaderComponent,
  BreadcrumbsComponent,
  PaginatorComponent,
  HeaderComponent,
  AdminDashboardComponent,
  ProducerUserListComponent
];
