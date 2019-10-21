import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActivityVideoPage } from './activity-video.page';

// Note
// it is a modal page so we deleted all routes as we do not need them
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  // Note
  // We added entry components with activityVideoPage for loading dynamically
  entryComponents :[ActivityVideoPage],
  declarations: [ActivityVideoPage]
})
export class ActivityVideoPageModule {}
