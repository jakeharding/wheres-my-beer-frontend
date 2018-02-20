/**
 * SignInPage.ts
 *
 * Created by jake
 * Created on 2/18/18
 *
 * Sign in page object.  Used to describe the elements on a page and provide easy interaction with them.
 */

import BasePage from '../base/BasePage';
import { ElementFinder } from "protractor";
import {Input} from "../base/Input";


export default class SignInPageObject extends BasePage {
  signInButton: ElementFinder;
  usernameInput: Input;
  passwordInput: ElementFinder;

  constructor () {
    super();
    this.signInButton = this.getElementByTid("signInButton");
    this.passwordInput = this.getElementByTid("passwordField");
    this.usernameInput = new Input("usernameField");
  }
}