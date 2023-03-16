import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/shared/services/crud.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private crudService: CrudService, private route: ActivatedRoute, private router: Router) { }

  userData: any;
  photoURL: any;

  ngOnInit(): void {
    this.fetchPhotoURL();
    this.fetchUserData();
  }

  fetchUserData() {
    this.route.params.subscribe(params => {
      this.crudService.getInformations().subscribe(i => {
        this.userData = i;
      })
    });
  }

  fetchPhotoURL() {
    this.route.params.subscribe(params => {
      this.crudService.fetchPhotoURL().subscribe(i => {
        this.photoURL = i;
      })
    });
  }
}
