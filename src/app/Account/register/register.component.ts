import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Validators} from '@angular/forms'
import { userRegister } from 'src/app/Models/userRegister';
import { AccountService } from 'src/app/services/account.service';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
registerForm:FormGroup;
regiserModel:userRegister
  constructor(private fb:FormBuilder,private service:AccountService,private alertify:AlertifyService) { }

  ngOnInit(): void {
    this.regiserModel={
      Email:"",
      city:"",
      gender:"",
      userName:"",
      password:"",
      country:""
    }
    this.registerForm=this.fb.group({
      userName:['',[Validators.required,Validators.maxLength(200),Validators.minLength(6)]],
      address:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      city:['',Validators.required],
      gender:['Male'],
      password:['',[Validators.required,Validators.minLength(8),Validators.maxLength(100)]],
      confirmPassword:['',[Validators.required,Validators.minLength(8),Validators.maxLength(100)]],
      agreeTerms:[false,Validators.required]
    },{validators:this.passwordValidator})
  }
register(){
  if(this.registerForm.valid){
    this.regiserModel.userName=this.registerForm.value.userName;
    this.regiserModel.Email=this.registerForm.value.email;
    this.regiserModel.city=this.registerForm.value.city;
    this.regiserModel.country=this.registerForm.value.address;
    this.regiserModel.gender=this.registerForm.value.gender;
    this.regiserModel.password=this.registerForm.value.password;
    this.service.register(this.regiserModel).subscribe((data)=>{

      this.alertify.success(data['msg']);
      this.ngOnInit();
    },(error)=>{this.alertify.error(error.error.msg);
  // console.log(error)
})
  }
}

//password validatior
 passwordValidator(form:FormGroup){
   if(form.get('password').value!=='' && form.get('confirmPassword').value!=='' &&form.get('confirmPassword').value.length>5&&form.get('password').value.length>5 ){
  return form.get('password').value===form.get('confirmPassword').value?null:{'mismatch':true}}
}
//pattern of password
regex:RegExp;
msg=""
passwordPattern(){

  let pass=this.registerForm.value.password;
  if(pass!==''&&pass.length>7){
     this.regex=new RegExp('[a-z]');
     if(!this.regex.test(pass)){
     this.msg="كلمة المرور يجب ان تحتوى على حرف صغير"
       return false;
     }
     this.regex=new RegExp('[A-Z]');
     if(!this.regex.test(pass)){
     this.msg="كلمة المرور يجب ان تحتوى على حرف كبير"
       return false;
     }
     this.regex=new RegExp('[~!@()+<>{}]');
     if(!this.regex.test(pass)){
     this.msg="كلمة المرور يجب ان تحتوى على حرف مميز واحد على الاقل"
       return false;
     }
     this.regex=new RegExp('[0-9]');
     if(!this.regex.test(pass)){
     this.msg="كلمة المرور يجب ان تحتوى على رقم  واحد على الاقل"
       return false;
     }

  }
  return true;
}
}

