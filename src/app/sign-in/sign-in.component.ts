import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { HelperService } from '../services/helper.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  emailFormControl = new FormControl('moeidsaleem@gmail.com', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('moeid123', [
    Validators.required,
    Validators.minLength(6),
  ]);

  constructor(private api:ApiService,private helper:HelperService, private router:Router, private auth:AuthService) { }

  ngOnInit() {
  }

  login() {
    // if (!this.emailFormControl.valid) {
    //   alert('Please enter correct email')
    //   this.emailFormControl.reset()
    //   return
    // }
    // if (!this.passwordFormControl.valid) {
    //   alert('Please enter correct password format')
    //   this.passwordFormControl.reset()
    //   return
    // }


  // login user
    this.auth.login(this.emailFormControl.value , this.passwordFormControl.value).then(data=>{
      console.log('data', data)
      // user login
       this.router.navigate(['/dashboard']).then(()=>{
         this.api.setCurrentUser(data.user.uid)
        //  console.log(this.api.currentUser)
       })


    },err=> this.helper.openSnackBar(err.message, 'Close'))
  }

}
