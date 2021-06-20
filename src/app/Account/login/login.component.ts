import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { userLoginModel } from 'src/app/Models/userLogin';
import { AccountService } from 'src/app/services/account.service';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 loginForm:FormGroup;
 loginModel:userLoginModel;
  constructor(private alertify:AlertifyService,private fb:FormBuilder,private service:AccountService) { }

  ngOnInit(): void {
    this.loginModel={
      email:"",
      password:"",
      rememberMe:false
    };
    this.loginForm=this.fb.group({
      email:['',[Validators.required]],
      password:['',Validators.required],
      rememberMe:[false]
    })

  }
login(){
  if(this.loginForm.valid){
    this.loginModel.email=this.loginForm.value.email;
    this.loginModel.password=this.loginForm.value.password;
    this.loginModel.rememberMe=this.loginForm.value.rememberMe;
    this.service.login(this.loginModel).subscribe((data)=>{
      this.alertify.success(data['msg'])
    },(error)=>{this.alertify.error(error.error.msg)})
  }

}
}
