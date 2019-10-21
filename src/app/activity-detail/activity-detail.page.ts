import { Component, OnInit } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Activity } from '../types';
import { ActivityService } from '../activity.service';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ActivityVideoPage } from '../activity-video/activity-video.page';
import {SocialSharing} from '@ionic-native/social-sharing/ngx'
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
@Component({
  selector: 'app-activity-detail',
  templateUrl: './activity-detail.page.html',
  styleUrls: ['./activity-detail.page.scss'],
})
export class ActivityDetailPage implements OnInit {

  activityDetail : Observable<Activity>;
  constructor(
              private _angularFireStore : AngularFirestore,
              private _angularFireAuth : AngularFireAuth,
              private _modalController: ModalController,
              activityService : ActivityService,
              activateRoute :  ActivatedRoute,
              private _socialSharing : SocialSharing) { // activate route holds the information from another page
                // getting id param from previous page
                const activityID = activateRoute.snapshot.params["activityID"]; 
                // getting activity details as observable
                this.activityDetail = activityService.getActivity(activityID);
               }

  ngOnInit() {
  }

  // for opening our modal
  async openModal(){
    const videoModal = await this._modalController.create({
      component : ActivityVideoPage
    });

    // subscribing to our observable when recieving it , our component will be shown
    return await this.activityDetail.subscribe(activity=>{
      // to pass params to our modal
      videoModal.componentProps = {
        videoURL : activity.video_url
      }

      // presenting our modal
    return  videoModal.present();
    });


  }

  share(){
    this.activityDetail.subscribe(activity=>{
      this._socialSharing.share("Look what I Found On This App Called Rana", activity.name,"",activity.cropped);
    });
  }

  addToFavorites(){
    this.activityDetail.subscribe((activity)=>{
      this._angularFireStore
          .collection("favorites")
          .doc(this._angularFireAuth.auth.currentUser.uid)
          .collection("favorites",ref=>{
            return ref.where("id",'==',activity.id)
          })
          .get()
          .subscribe(doc=>{
            if(doc.empty){
              this._angularFireStore
              .collection("favorites")
              .doc(this._angularFireAuth.auth.currentUser.uid)
                .collection("favorites")
                .add(activity);
            }
          })


    })
  }

}
