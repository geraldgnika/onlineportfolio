import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { CrudService } from 'src/app/shared/services/crud.service';
import { User } from 'src/app/shared/models/user';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  update_form!: FormGroup;
  information: any;
  photoURL: any;

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
      this.crudService.getInformations().subscribe(i => {
        this.information = i;
      })
    });

    this.update_form = this.fb.group({
      fullname: ['', Validators.required],
      email: ['', Validators.required],
      linkedinlink: ['', Validators.required],
      cvlink: ['', Validators.required],
      currentposition: ['', Validators.required],
      currentinstitute: ['', Validators.required],
      hello: ['', Validators.required],
      interests: ['', Validators.required],
      publicationsandpreprints: ['', Validators.required]
    })
  }

  fetchPhotoURL() {
    this.route.params.subscribe(params => {
      this.crudService.fetchPhotoURL().subscribe(i => {
        this.photoURL = i;
      })
    });
  }

  ngOnInit(): void {
    this.fetchPhotoURL();
  }

  update_info() {
    this.update_form = this.fb.group({
      fullname: [this.information.fullname],
      email: [this.information.email],
      linkedinlink: [this.information.linkedinlink],
      cvlink: [this.information.cvlink],
      currentposition: [this.information.currentposition],
      currentinstitute: [this.information.currentinstitute],
      hello: [this.information.hello],
      interests: [this.information.interests],
      publicationsandpreprints: [this.information.publicationsandpreprints]
    })

    this.crudService.update_info(this.update_form.value);
    this.router.navigate(['/']);
  }

  uploadFile(event: any, { uid }: User) {
    this.crudService
      .uploadImage(event.target.files[0], `images/profile/${uid}`)
      .pipe(
        switchMap((photoURL) =>
          this.authService.updateUser({
            uid,
            photoURL,
          })
        )
      )
      .subscribe();
  }

  goBack() {
    this._location.back();
  }
}
