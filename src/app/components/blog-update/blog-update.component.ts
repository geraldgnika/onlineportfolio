import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CrudService } from 'src/app/shared/services/crud.service';
import { Location } from '@angular/common';

@Component({
	selector: 'app-blog-update',
	templateUrl: './blog-update.component.html',
	styleUrls: ['./blog-update.component.scss']
})
export class BlogUpdateComponent implements OnInit {
	update_form!: FormGroup;
	blog: any;

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

	constructor(public authService: AuthService, public fb: FormBuilder, private _location: Location, private router: Router, private act: ActivatedRoute, private route: ActivatedRoute, private crudService: CrudService) {
		this.route.params.subscribe(params => {
			this.crudService.getDetailsById(params['blog_id']).subscribe(i => {
				this.blog = i;
			})
		});

		this.update_form = this.fb.group({
			title: ['', Validators.required],
			content: ['', Validators.required]
		})
	}

	ngOnInit(): void { }

	update_blog() {
		this.update_form = this.fb.group({
			title: [this.blog.title],
			content: [this.blog.content]
		})

		const blog_id = this.act.snapshot.paramMap.get('blog_id');
		this.crudService.update_blog(this.update_form.value, blog_id);
		this.router.navigate(['blog-detail/', blog_id]);
	}

	goBack() {
		this._location.back();
	}
}
