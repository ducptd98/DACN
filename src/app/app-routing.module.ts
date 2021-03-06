import { PermissionGuard } from './utilities/permission.guard';
import { AuthGuardGuard } from './utilities/auth-guard.guard';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './pages/profile/profile.component';


const routes: Routes = [
  {
    path: '',

    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule),
        data: { breadcrumb: 'Trang chủ' }
      },
      {
        path: 'featured',
        loadChildren: () => import('./pages/featured/featured.module').then(m => m.FeaturedModule),
        data: { breadcrumb: 'Danh sách nhà' }
      },
      {
        path: 'category',
        loadChildren: () => import('./pages/category/category.module').then(m => m.CategoryModule),
        data: { breadcrumb: 'Danh sách loại nhà' }
      },
      {
        path: 'product',
        loadChildren: () => import('./pages/product/product.module').then(m => m.ProductModule),
        data: { breadcrumb: 'Danh sách tin tức' }
      },
      {
        path: 'post',
        loadChildren: () => import('./pages/post/post.module').then(m => m.PostModule),
        data: { breadcrumb: 'Danh sách bài đăng' },
        // canActivate: [AuthGuardGuard]
      },
      {
        path: 'login',
        component: LoginComponent,
        data: { breadcrumb: 'Đăng nhập' },
        canActivate: [AuthGuardGuard]
      },
      {
        path: 'register',
        component: RegisterComponent,
        data: { breadcrumb: 'Đăng kí' },
        canActivate: [AuthGuardGuard]
      },
      {
        path: 'profile',
        component: ProfileComponent,
        data: { breadcrumb: 'Hồ sơ' },
        canActivate: [PermissionGuard]
      },
      {
        path: '**',
        redirectTo: 'home',
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
