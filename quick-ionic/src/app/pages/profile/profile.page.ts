import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observer } from 'rxjs';
import { Profile } from 'src/app/interfaces/profile.interface';
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
    this.enableEdit = true
    this.editProfileForm.enable()
  }

  cancelChanges() {
    this.enableEdit = false;
    this.editProfileForm.disable()
  }

  saveChanges() {
    if (this.editProfileForm.value != this.profile) {
      if (this.editProfileForm.valid) {
        this.profileService.editProfile(this.editProfileForm.value);
        console.log("Perfil editado correctamente!")
      }
    } else if (true == true){
      // Aqui va el formulario de socials
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
      username: [{ value: this.profile?.user.username, disabled: true }, Validators.required],
      email: [{ value: this.profile?.user.email, disabled: true }, [Validators.required, Validators.email]],
      phone: [{ value: this.profile?.phone, disabled: true }, [Validators.required, Validators.pattern(/^[0-9]{9}$/)]],
      mobile: [{ value: this.profile?.mobile, disabled: true }, [Validators.required, Validators.pattern(/^[0-9]{9}$/)]],
      address: [{ value: this.profile?.address, disabled: true }, [Validators.required]]
    });
  }


  ngOnInit() {
    this.loadProfile();
  }

  ngAfeterViewInit(){
    this.pageLoaded = true;
  }

}
