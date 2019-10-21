import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CanEnterTabsPageGuard implements CanActivate   {
  constructor(
    private _angularFireAuth : AngularFireAuth,
    private _router : Router
    ){
    }
  canActivate(
    activatedRouteSnapshot : ActivatedRouteSnapshot,
    stateSnapShot : RouterStateSnapshot){
      // checking the current state of our user
      return this._angularFireAuth.authState.pipe(
        map(auth=>{ 
          if(!auth){
            this._router.navigate(['/login']);
            return false;

          } else{
            return true;
          }
        })
      )
  }
}
