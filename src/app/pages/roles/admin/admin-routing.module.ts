import { Routes } from "@angular/router";
import { AdminDashboardComponent } from "./admin-dashboard/admin-dashboard.component";
import { AdminProducerComponent } from "./admin-producer/admin-producer.component";
import { AdminProcessorComponent } from "./admin-processor/admin-processor.component";
import { AdminDistributerComponent } from "./admin-distributer/admin-distributer.component";
import { AdminRetailerComponent } from "./admin-retailer/admin-retailer.component";

export const adminRouting: Routes = [
    {path:'', redirectTo:'dashboard', pathMatch:"full"},
    {path:'dashboard', component: AdminDashboardComponent},
    {path:'producer', component: AdminProducerComponent},
    {path:'processor', component: AdminProcessorComponent},
    {path:'distributer', component: AdminDistributerComponent},
    {path:'retailer', component: AdminRetailerComponent},
]