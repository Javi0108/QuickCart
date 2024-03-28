import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observer } from 'rxjs';
import { Profile } from 'src/app/interfaces/profile.interface';
import { User } from 'src/app/interfaces/user.interface';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  profile: Profile | null = null;
  enableEdit: boolean;
  pageLoaded: boolean;
  editProfileForm!: FormGroup;

  constructor(private profileService: ProfileService, private formBuilder: FormBuilder) {
    this.pageLoaded = false;
    this.enableEdit = false;
  }

  editProfile() {
    this.enableEdit = true;
    this.editProfileForm.enable();
  }

  cancelChanges() {
    this.enableEdit = false;
    this.editProfileForm.disable();
  }

  mapFormToProfile(formValue: any): Profile {
    const profile: Profile = {
      id_profile: formValue.id_profile,
      //user: null, // Set user to null so it won't be sent in the request
      user_name: formValue.user_name,
      user_type: formValue.user_type,
      phone: formValue.phone,
      mobile: formValue.mobile,
      address: formValue.address
    };
  
    return profile;
  }
  

  // mapFormToProfile(formValue: any): Profile {
  //   const user: User = {
  //     id: formValue.userId,
  //     username: formValue.username,
  //     first_name: formValue.first_name,
  //     last_name: formValue.last_name,
  //     email: formValue.email
  //   };

  //   const profile: Profile = {
  //     id_profile: formValue.id_profile,
  //     user: user,
  //     user_name: formValue.user_name,
  //     user_type: formValue.user_type,
  //     phone: formValue.phone,
  //     mobile: formValue.mobile,
  //     address: formValue.address
  //   };

  //   return profile;
  // }

  saveChanges() {
    const profileData: Profile = this.mapFormToProfile(this.editProfileForm.value);
    console.log(profileData)
    if (this.editProfileForm.valid) {
      this.profileService.putEditProfile(profileData)
        .subscribe({
          next: (response) => {
            console.log('Perfil actualizado con éxito:', response);
          },
          error: (error) => {
            console.error('Error al actualizar el perfil:', error);
          }
        });
    }
  }

  loadProfile() {
    this.profileService.getProfile().subscribe({
      next: (profile: Profile) => {
        this.profile = profile;
        this.buildForm();
      },
      error: (error) => {
        console.error('Error al obtener el perfil:', error);
      }
    } as Observer<Profile>);
  }

  buildForm() {
    this.editProfileForm = this.formBuilder.group({
     // userId: [this.profile?.user.id],
     // username: [{ value: this.profile?.user.username, disabled: true }, Validators.required],
      user_name: [{ value: this.profile?.user_name, disabled: true }, Validators.required],
      //email: [{ value: this.profile?.user.email, disabled: true }, [Validators.required, Validators.email]],
      phone: [{ value: this.profile?.phone, disabled: true }, [Validators.required, Validators.pattern(/^[0-9]{9}$/)]],
      mobile: [{ value: this.profile?.mobile, disabled: true }, [Validators.required, Validators.pattern(/^[0-9]{9}$/)]],
      address: [{ value: this.profile?.address, disabled: true }, [Validators.required]]
    });
  }

  ngOnInit() {
    this.loadProfile();
  }

  ngAfterViewInit() {
    this.pageLoaded = true;
  }

}