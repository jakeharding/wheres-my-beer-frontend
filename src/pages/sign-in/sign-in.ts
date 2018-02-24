import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationPage } from "../registration/registration";
import { AuthProvider } from "../../providers/auth/auth";

/**
 * Generated class for the SignInPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html',
})
export class SignInPage{
  signInForm: FormGroup;
  goToRegistration: any;
  private username: string;
  private password: string;

  constructor(public navCtrl: NavController, public formBuilder: FormBuilder, public toastCtrl: ToastController,
              public authProvider: AuthProvider) {
    this.goToRegistration = RegistrationPage;
    this.signInForm = formBuilder.group({
      username: [this.username, Validators.compose([Validators.required, Validators.pattern('[a-zA-Z0-9_]*')])],
      password: [this.password, Validators.compose([Validators.required, Validators.minLength(4)])]
    });
  }
  public signIn(){
    this.authProvider.signIn(this.signInForm.value).subscribe(
      (response) => {
        this.authProvider.setToken(response.token);
      },
      () => {
        let toast = this.toastCtrl.create({
          message: 'An error occurred please check your connection and try again.',
          duration: 3000,
          position: "top",
          cssClass: "error-toast"
        });
        toast.present();
      }
    )

  }
}

