import { Routes } from "@angular/router";
import { AdminDashboardComponent } from "./admin-dashboard/admin-dashboard.component";

export const adminRouting: Routes = [
    {path:'', redirectTo:'dashboard', pathMatch:"full"},
    {path:'dashboard', component: AdminDashboardComponent},
    {path: 'producer', loadChildren: () => import('../admin/admin-producer/admin-producer-routing.modules').then(m => m.adminProducerRouting)},
    {path: 'processor', loadChildren: () => import('../admin/admin-processor/admin-processor-routing.modules').then(m => m.adminProcessorRouting)},
    {path: 'distributer', loadChildren: () => import('../admin/admin-distributer/admin-distributer-routing.modules').then(m => m.adminDistributerRouting)},
    {path: 'retailer', loadChildren: () => import('../admin/admin-retailer/admin-retailer-routing.modules').then(m => m.adminRetailerRouting)},
    {path: 'settings', loadChildren: () => import('../admin/admin-settings/admin-settings-routing.modules').then(m => m.adminSettingsRouting)},
    {path: 'event', loadChildren: () => import('../admin/admin-event/admin-event-routing.modules').then(m => m.adminEventRouting)},
]