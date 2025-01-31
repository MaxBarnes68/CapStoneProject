import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PostCategoryComponent } from './components/dashboard/post-category/post-category.component';
import { PostDishComponent } from './components/post-dish/post-dish.component';

const routes: Routes = [
  { path: '', component: AdminComponent },
  { path: 'dashboard', component:DashboardComponent },
  { path: 'category', component:PostCategoryComponent },
  { path: 'dish', component:PostDishComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
