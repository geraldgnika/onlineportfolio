import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CrudService } from 'src/app/shared/services/crud.service';
import { Location } from '@angular/common';
import { Blog } from 'src/app/shared/models/blog';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  id: string = '';
  title: string = '';
  content: string = '';
  blogList: Blog[] = [];

  blog_object: Blog = {
    id: '',
    title: '',
    content: ''
  }

  isShowDiv = true;

  toggleDisplayDiv() {
    this.isShowDiv = !this.isShowDiv;
  }

  create_blog() {
    this.blog_object.id = '';
    this.blog_object.title = this.title;
    this.blog_object.content = this.content;

    this.crudService.post_blog(this.blog_object);

    this.clear_form();
    this.router.navigate(['blog-detail/', this.blog_object.id]);
  }

  clear_form() {
    this.id = '';
    this.title = '';
    this.content = '';
  }

  editorConfig: AngularEditorConfig = {
    editable: true,
    height: 'auto',
    minHeight: '200px',
    maxHeight: '200px',
    width: 'auto',
    minWidth: '0',
    enableToolbar: true,
    showToolbar: true,
    placeholder: '...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' }
    ]
  };

  constructor(public authService: AuthService, public fb: FormBuilder, private _location: Location, private router: Router, private act: ActivatedRoute, private route: ActivatedRoute, private crudService: CrudService) { }

  ngOnInit(): void {
    this.fetchBlog();
  }

  fetchBlog() {
    this.crudService.getBlog().subscribe({
      next: (result: any) => {
        this.blogList = result.map((e: any) => {
          return e.payload.doc.data();
        })
      },
      error: (err: any) => {
        alert("Error while getting the job list!");
      }
    })
  }

  detail_blog(blog_id?: any): void {
    this.router.navigate(['blog-detail/', blog_id]);
  }

  goBack() {
    this._location.back();
  }
}
