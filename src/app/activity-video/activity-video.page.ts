import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-activity-video',
  templateUrl: './activity-video.page.html',
  styleUrls: ['./activity-video.page.scss'],
})
export class ActivityVideoPage implements OnInit {

  videoURL: string;


  constructor(
    private _modalController : ModalController,
    navParams : NavParams) {
      this.videoURL = navParams.get("videoURL");
   }

  ngOnInit() {
  }

  //---------- to close a modal -------------//
  closeModal(){
    this._modalController.dismiss();
  }


}
