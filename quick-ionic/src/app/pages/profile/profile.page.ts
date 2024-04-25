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
  foreignProfileForm: FormGroup;
  avatarFile: File | null = null;

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

    this.foreignProfileForm = this.formBuilder.group({
      user: this.formBuilder.group({
        username: [''],
        email: [''],
        first_name: [''],
        last_name: [''],
      }),
      phone: [''],
      mobile: [''],
      address: [''],
      user_type: [''],
    });
  }

  ngOnInit() {
    // Load user profile
    this.loadProfile();
    this.editProfileForm.disable();
    this.socials.disable();
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
          this.foreignProfileForm.patchValue(profile);
          this.profile = profile;
          this.getSocials(profile);
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
          this.getSocials(profile);
        },
        error: (error) => {
          console.error(error);
        },
      } as Observer<Profile>);
    }
  }

  onFileChange(event: Event):void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.avatarFile = input.files ? input.files[0] : null; // Store the file reference
    }
  }

  saveChanges() {
    const formData = new FormData();
    formData.append(
      'user.email',
      this.editProfileForm.get('user.email')?.value
    );
    formData.append(
      'user.first_name',
      this.editProfileForm.get('user.first_name')?.value
    );
    formData.append(
      'user.last_name',
      this.editProfileForm.get('user.last_name')?.value
    );
    formData.append('phone', this.editProfileForm.get('phone')?.value);
    formData.append('mobile', this.editProfileForm.get('mobile')?.value);
    formData.append('address', this.editProfileForm.get('address')?.value);
    formData.append('user_type', this.editProfileForm.get('user_type')?.value);

    formData.append('socials.webpage', this.socials.get('webpage')?.value);
    formData.append('socials.instagram', this.socials.get('instagram')?.value);
    formData.append('socials.facebook', this.socials.get('facebook')?.value);
    formData.append('socials.x', this.socials.get('x')?.value);
    formData.append('socials.linkedin', this.socials.get('linkedin')?.value);

    if (this.avatarFile) {
      formData.append('avatar', this.avatarFile); // Add the file if it exists
    }

    this.profileService.putEditProfile(formData).subscribe(
      (response) => {
        this.notificationToastService.presentToast(
          'Profile updated successfully',
          'success',
          '../../assets/check.svg'
        );
        this.loadProfile();
      },
      (error) => {
        console.log(error);
        this.notificationToastService.presentToast(
          'Failed to update profile',
          'danger',
          '../../assets/exclamation.svg'
        );
        this.loadProfile();
      }
    );
  }

  getSocials(profile: Profile) {
    const socials = profile.socials;

    if (socials) {
      this.socials.patchValue({
        webpage: socials['webpage'],
        instagram: socials['instagram'],
        facebook: socials['facebook'],
        x: socials['x'],
        linkedin: socials['linkedin'],
      });
    }
  }

  editProfile() {
    this.enableEdit = true;
    this.editProfileForm.enable();
    this.socials.enable();
  }

  cancelChanges() {
    this.enableEdit = false;
    this.editProfileForm.disable();
    this.socials.disable();
  }

  ngAfterViewInit() {
    this.pageLoaded = true;
  }
}
