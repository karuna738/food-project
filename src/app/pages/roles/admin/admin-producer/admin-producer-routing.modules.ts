import { Routes } from "@angular/router";

export const adminProducerRouting: Routes = [
    { path: '', redirectTo:'user', pathMatch:'full'},
    { path: 'user', loadChildren :() => import('./producer-user/producer-user-routing.module').then(m => m.adminProducerUserRouting) },
    { path: 'owner',  loadChildren :() => import('./producer-owner/producer-owner-routing.modules').then(m => m.adminProducerOwnerRouting)},
    { path: 'product', loadChildren :() => import('./producer-product/producer-product-routing.modules').then(m => m.adminProducerProductRouting)}
]