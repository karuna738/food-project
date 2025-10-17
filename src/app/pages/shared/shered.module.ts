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
import { AdminProducerComponent } from '../roles/admin/admin-producer/admin-producer.component';
import { AdminProcessorComponent } from '../roles/admin/admin-processor/admin-processor.component';
import { AdminDistributerComponent } from '../roles/admin/admin-distributer/admin-distributer.component';
import { AdminRetailerComponent } from '../roles/admin/admin-retailer/admin-retailer.component';
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

  // Components
  HeaderComponent,
  LayoutComponent,
  SidebarComponent,
  LoaderComponent,
  BreadcrumbsComponent,
  PaginatorComponent,
  HeaderComponent,
  AdminDashboardComponent,
  AdminProducerComponent,
  AdminProcessorComponent,
  AdminDistributerComponent,
  AdminRetailerComponent,
];
