import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CrudService } from 'src/app/shared/services/crud.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit {
  blog: any;
  userData: any;

  fetchUserData() {
    this.route.params.subscribe(params => {
      this.crudService.getInformations().subscribe(i => {
        this.userData = i;
      })
    });
  }

  constructor(public authService: AuthService, private _location: Location, private route: ActivatedRoute, private crudService: CrudService, private router: Router) {
    this.route.params.subscribe(params => {
      this.crudService.getDetailsById(params['blog_id']).subscribe(i => {
        this.blog = i;
      })
    });
  }

  ngOnInit(): void {
    this.fetchUserData();
  }

  goBack() {
    this._location.back();
  }

  update_blog(blog_id?: any): void {
    this.router.navigate(['blog-update/', blog_id]);
  }

  delete_blog(blog_id: string) {
    this.crudService.delete_blog(blog_id);
    this.router.navigate(['/']);
  }
}
