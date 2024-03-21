import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observer } from 'rxjs';
import { Profile } from 'src/app/interfaces/profile.interface';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  profile!: Profile;

  editProfileForm: FormGroup;

  constructor(private profileService: ProfileService, private formBuilder: FormBuilder) { 
   this.editProfileForm = this.formBuilder.group({
      
   })
  }

  editProfile(){
    return 0;
  }

  ngOnInit() {
    this.loadProfile();
  }

  loadProfile() {
    this.profileService.getProfile().subscribe({
      next: (profile: Profile) => {
        this.profile = profile;
        console.log(profile);
      },
      error: (error) => {
        console.error('Error al obtener el perfil:', error);
      }
    } as Observer<Profile>);
  }

}
