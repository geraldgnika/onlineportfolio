import { Injectable } from '@angular/core';
import { AngularFirestore, sortedChanges } from '@angular/fire/compat/firestore';
import { AuthService } from './auth.service';
import { Info } from '../models/info';
import { Blog } from '../models/blog';
import {
  getDownloadURL,
  ref,
  Storage,
  uploadBytes,
} from '@angular/fire/storage';
import { from, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(public authService: AuthService, private database: AngularFirestore, private storage: Storage) { }

  update_info(info: Info) {
    this.database.collection('informations').doc('EC7S9dMg12CLQwHz3QC7').update({
      currentinstitute: info.currentinstitute,
      currentposition: info.currentposition,
      cvlink: info.cvlink,
      email: info.email,
      fullname: info.fullname,
      hello: info.hello,
      interests: info.interests,
      linkedinlink: info.linkedinlink,
      publicationsandpreprints: info.publicationsandpreprints
    });
  }


  post_blog(blog: Blog) {
    blog.id = this.database.createId();
    return this.database.collection('blog').doc(blog.id).set(blog);
  }

  getInformations() {
    return this.database.collection('informations').doc('EC7S9dMg12CLQwHz3QC7').valueChanges();
  }

  fetchPhotoURL() {
    return this.database.collection('users').doc('hs641J9zyYHUh4WAFZKZ').valueChanges();
  }

  getBlog() {
    return this.database.collection('blog').snapshotChanges();
  }

  getDetailsById(blog_id: any) {
    return this.database.collection('blog').doc(blog_id).valueChanges();
  }

  delete_blog(blog_id: string) {
    return this.database.doc('/blog/' + blog_id).delete();
  }

  update_blog(blog: Blog, blog_id: any) {
    this.database.collection('blog').doc(blog_id).update({
      title: blog.title,
      content: blog.content
    });
  }

  uploadImage(image: File, path: string): Observable<string> {
    const storageRef = ref(this.storage, path);
    const uploadTask = from(uploadBytes(storageRef, image));
    return uploadTask.pipe(switchMap((result) => getDownloadURL(result.ref)));
  }
}
