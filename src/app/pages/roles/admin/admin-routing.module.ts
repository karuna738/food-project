import { Routes } from "@angular/router";
import { AdminDashboardComponent } from "./admin-dashboard/admin-dashboard.component";
import { AdminSettingsComponent } from "./admin-settings/admin-settings.component";
import { AdminEventComponent } from "./admin-event/admin-event.component";

export const adminRouting: Routes = [
    {path:'', redirectTo:'dashboard', pathMatch:"full"},
    {path:'dashboard', component: AdminDashboardComponent},
    {path: 'producer', loadChildren: () => import('../admin/admin-producer/admin-producer-routing.modules').then(m => m.adminProducerRouting)},
    {path:'settings', component: AdminSettingsComponent},
    {path:'event', component: AdminEventComponent},
]