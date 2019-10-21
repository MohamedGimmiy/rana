import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import {CameraOptions, Camera} from '@ionic-native/camera/ngx';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  ProfileImage;
  myStoredImage : Observable<any>;
  constructor(private _alertCtr : AlertController,
              private _angularFireStore : AngularFirestore,
              private _angularFireAuth : AngularFireAuth,
              public cam : Camera) {

                this.myStoredImage = _angularFireStore
                .collection("users")
                .doc(this._angularFireAuth.auth.currentUser.uid)
                .valueChanges();




  }
async selectImageSource(){

  const cameraOptions : CameraOptions = {
    quality : 100,
    destinationType : this.cam.DestinationType.DATA_URL,
    encodingType : this.cam.EncodingType.JPEG,
    mediaType : this.cam.MediaType.PICTURE,
    targetHeight : 250,
    correctOrientation : true,
    sourceType: this.cam.PictureSourceType.CAMERA
  }
  const gallaryOptions : CameraOptions = {
    quality : 100,
    destinationType : this.cam.DestinationType.DATA_URL,
    encodingType : this.cam.EncodingType.JPEG,
    mediaType : this.cam.MediaType.PICTURE,
    targetHeight : 250,
    correctOrientation : true,
    sourceType: this.cam.PictureSourceType.SAVEDPHOTOALBUM
  }
  const alert = await this._alertCtr.create({
    header : 'select source',
    message : 'Pick a source for your image',
    buttons :[
      {
    text : 'Camera',
    handler : ()=>{
      this.cam.getPicture(cameraOptions).then(imageData=>{
        //this.ProfileImage = 'data:image/jpeg;base64,'+imageData;
        const image = 'data:image/jpeg;base64,'+imageData;
        // adding profile image to fireabse firestore
        this._angularFireStore
        .collection("users")
        .doc(this._angularFireAuth.auth.currentUser.uid)
        .set({
          image_src : image
        })
      });
    }
  },
    {
    text : 'Gallery',
    handler : ()=>{
      this.cam.getPicture(gallaryOptions).then(imageData=>{
      //  this.ProfileImage = 'data:image/jpeg;base64,'+imageData;
        const image = 'data:image/jpeg;base64,'+imageData;;
        // adding profile image to fireabse firestore
        this._angularFireStore
        .collection("users")
        .doc(this._angularFireAuth.auth.currentUser.uid)
        .set({
          image_src : image
        });
      });
    }
  }
    ]
  });

  await alert.present();
}
}
