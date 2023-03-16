import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { HomeComponent } from './components/home/home.component';
import { SignInComponent } from './components/auth/sign-in/sign-in.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { IsSignedInGuard } from './shared/guards/is-signed-in.guard';
import { BlogComponent } from './components/blog/blog.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { BlogDetailComponent } from './components/blog-detail/blog-detail.component';
import { BlogUpdateComponent } from './components/blog-update/blog-update.component';

const routes: Routes = [
  {
    // Guard(s) Note: redirect to Sign In if not authenticated
    path: '',
    component: HomeComponent,
    title: 'Andi Nika Portfolio'
  },
  {
    // Guard(s) Note: redirect to Sign In if not authenticated
    path: 'blog-detail/:blog_id',
    component: BlogDetailComponent,
    title: 'Andi Nika Portfolio | Blog Post'
  },
  {
    // Guard(s) Note: redirect to Sign In if not authenticated and if it is not a Recruiter redirect to Main
    path: 'blog-update/:blog_id',
    component: BlogUpdateComponent,
    title: 'Andi Nika Portfolio | Update Blog',
    canActivate: [AuthGuard]
  },
  {
    // Guard(s) Note: redirect to Sign In if not authenticated
    path: 'main',
    component: MainComponent,
    title: 'Andi Nika Portfolio | Edit Information',
    canActivate: [AuthGuard]
  },
  {
    // Guard(s) Note: redirect to Sign In if not authenticated
    path: 'blog',
    component: BlogComponent,
    title: 'Andi Nika Portfolio | Blog'
  },
  {
    // Guard(s) Note: redirect to Main if authenticated
    path: 'login',
    component: SignInComponent,
    title: 'Andi Nika Portfolio | Sign In',
    canActivate: [IsSignedInGuard]
  },
  {
    // Wild Card Route for 404 request
    path: '**',
    pathMatch: 'full',
    component: PagenotfoundComponent,
    title: 'Error 404 | Page Not Found!'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
