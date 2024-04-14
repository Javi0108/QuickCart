import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observer } from 'rxjs';
import { Profile } from 'src/app/interfaces/profile.interface';
import { ProfileService } from 'src/app/services/profile.service';
import { NotificationToastComponent } from '../../components/notification-toast/notification-toast.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  profile!: Profile;
  toast!: NotificationToastComponent

  editProfileForm: FormGroup;

  constructor(
    private profileService: ProfileService,
    private formBuilder: FormBuilder
  ) {
    this.editProfileForm = this.formBuilder.group({
      user: this.formBuilder.group({
        email: [''],
        first_name: [''],
        last_name: [''],
      }),
      phone: [''],
      mobile: [''],
      address: [''],
      user_type: ['']
    });
  }

  editProfile() {
    this.profileService.updateProfile(this.editProfileForm.value).subscribe(
      (response) => {
        // this.toast.presentToast('Profile updated successfully') // Falta perfeccionar
        console.log('Profile updated successfully');
      },
      (error) => {
        // this.toast.presentToast('Failed to update profile')
        console.error('Failed to update profile', error);
      }
    );
  }

  ngOnInit() {
    this.loadProfile();
  }

  loadProfile() {
    this.profileService.getProfile().subscribe({
      next: (profile: Profile) => {
        this.editProfileForm.patchValue(profile)
        this.profile = profile;
        console.log(profile);
        // this.toast.presentToast('Profile loaded successfully')
      },
      error: (error) => {
        // this.toast.presentToast('Something gone wrong')
        console.error('Error al obtener el perfil:', error);
      },
    } as Observer<Profile>);
  }
}
