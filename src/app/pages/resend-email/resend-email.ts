import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BasePage } from '../BasePage';
import { UserProvider } from '../../services/user/user';
import { ToastProvider } from '../../services/toast/toast';

/**
 * Generated class for the ResendEmailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-resend-email',
  templateUrl: 'resend-email.html',
  styleUrls: ['./resend-email.scss']
})
export class ResendEmailPage extends BasePage {

  emailForm: FormGroup;

  constructor(public formBuilder: FormBuilder,
              public navCtrl: NavController,
              private toastProvider: ToastProvider,
              private userProvider: UserProvider) {
    super('resend-email');
    this.emailForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  sendConfirmEmail() {
    this.userProvider.resendConfirmEmail(this.emailForm.value).then(() => {
      this.toastProvider.successToast(
        'Email has been sent. Please check you spam folder and visit this page again if you don\'t receive it.');
    }, () => {
      this.toastProvider.errorToast('Unable to send the email. Please check your connection and try again.');
    });
  }

}