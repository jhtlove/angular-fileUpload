import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuard } from '../guard/login.guard';
import { LoginComponent } from '../login/login.component';
import { UserComponent } from '../user/user.component';
import { TableComponent } from 'src/app/table/table.component';



const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'ihismain',
    component: UserComponent,
    canActivate: [LoginGuard],  // 进入 用户 主页 要通过认证
    children: [
      {
        path: '',
        component: TableComponent
      },
      {
        path: 'table',
        component: TableComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]  // 必须exports
})
export class AppRouteModule { }
