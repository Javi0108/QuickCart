import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observer } from 'rxjs';
import { Profile } from 'src/app/interfaces/profile.interface';
import { ProfileService } from 'src/app/services/profile.service';
import { User } from 'src/app/interfaces/user.interface';
import { NotificationToastService } from 'src/app/services/notification-toast.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  profile!: Profile;
  user!: User;
  pageLoaded: boolean;
  enableEdit: boolean;
  edit: boolean;

  editProfileForm: FormGroup;
  userNameForm: FormGroup;
  socials: FormGroup;

  constructor(
    private profileService: ProfileService,
    private formBuilder: FormBuilder,
    private notificationToastService: NotificationToastService,
    private route: ActivatedRoute
  ) {
    this.pageLoaded = false;
    this.enableEdit = false;
    this.edit = false;

    this.editProfileForm = this.formBuilder.group({
      user: this.formBuilder.group({
        email: [''],
        first_name: [''],
        last_name: [''],
      }),
      phone: [''],
      mobile: [''],
      address: [''],
      user_type: [''],
    });

    this.userNameForm = this.formBuilder.group({
      username: [''],
    });

    this.socials = this.formBuilder.group({
      webpage: [''],
      instagram: [''],
      facebook: [''],
      x: [''],
      linkedin: [''],
    });
  }

  ngOnInit() {
    // Load user profile
    this.loadProfile();
  }

  loadUsername() {
    const userString = localStorage.getItem('user');
    if (userString) {
      this.user = JSON.parse(userString);
      const currentUser = JSON.parse(userString);
      if (this.user.username == currentUser.username) {
        this.edit = true;
      }
      if (this.userNameForm) {
        this.userNameForm.patchValue({ username: this.user.username });
      }
    }
  }

  loadProfile() {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.profileService.getProfileById(parseInt(userId)).subscribe({
        next: (profile: Profile) => {
          this.loadUsername();
          this.editProfileForm.patchValue(profile);
          this.profile = profile;
        },
        error: (error) => {
          console.error(error);
        },
      } as Observer<Profile>);
    } else {
      this.profileService.getProfile().subscribe({
        next: (profile: Profile) => {
          this.loadUsername();
          this.editProfileForm.patchValue(profile);
          this.profile = profile;
          console.log(profile);

          // Extract socials data
          const socials = profile.socials;
          console.log(socials);
          if (socials) {
            // Assign values to form controls
            this.socials.patchValue({
              webpage: socials['webpage'],
              instagram: socials['instagram'],
              facebook: socials['facebook'],
              x: socials['x'],
              linkedin: socials['linkedin'],
            });
          }
        },
        error: (error) => {
          console.error(error);
        },
      } as Observer<Profile>);
    }
  }

  saveChanges() {
    const updateProfile = {
      ...this.editProfileForm.value,
      socials: {
        webpage: this.socials.value.webpage,
        instagram: this.socials.value.instagram,
        facebook: this.socials.value.facebook,
        x: this.socials.value.x,
        linkedin: this.socials.value.linkedin
      }
    }
    this.profileService.putEditProfile(updateProfile).subscribe(
      (response) => {
        this.notificationToastService.presentToast(
          'Profile updated successfully',
          'success'
        );
        this.loadProfile();
      },
      (error) => {
        this.notificationToastService.presentToast(
          'Failed to update profile',
          'danger'
        );
      }
    );
  }

  editProfile() {
    this.enableEdit = true;
    this.editProfileForm.enable();
  }

  cancelChanges() {
    this.enableEdit = false;
    this.editProfileForm.disable();
  }

  ngAfterViewInit() {
    this.pageLoaded = true;
  }
}
