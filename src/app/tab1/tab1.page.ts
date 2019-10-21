import { Component } from '@angular/core';
import { ActivityService } from '../activity.service';
import { Observable } from 'rxjs';
import { Activity } from '../types';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  activityList: Observable<Activity[]>;
  me :Activity [];
  constructor(activityService : ActivityService) {


    // skeleton design for loading our data
    setTimeout(()=>{
      this.activityList = activityService.getAllActivities();
    },3000)


  }

}
