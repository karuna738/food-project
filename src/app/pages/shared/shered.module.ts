import { CommonModule } from "@angular/common";
import { RouterLink, RouterOutlet, RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgSelectModule } from '@ng-select/ng-select';
import { HeaderComponent } from "../common/header/header.component";
import { LayoutComponent } from "../common/layout/layout.component";
import { SidebarComponent } from "../common/sidebar/sidebar.component";
import { LoaderComponent } from "../common/loader/loader.component";
import { BreadcrumbsComponent } from "../common/breadcrumbs/breadcrumbs.component";
import { TranslateModule } from "@ngx-translate/core";
import { PaginatorComponent } from "../common/paginator/paginator.component";
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
    HeaderComponent
]