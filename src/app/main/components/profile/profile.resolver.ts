import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {ProfileService} from "../../../services/profile.service";
import {Profile} from "../../../models/profile";

@Injectable({
  providedIn: 'root'
})
export class ProfileResolver implements Resolve<Profile> {
  constructor(
    private ProfileService: ProfileService,
  ) {
  }

  resolve(route: ActivatedRouteSnapshot): Promise<Profile> {
    const profile = this.ProfileService.getProfile()
      .then(profile => {
        console.log("ProfileResolver.resolve() profile: ", profile);
        return profile;
      })
    return profile;
  }
}
