import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../Models/user.model';
import { UserService } from '../user.service';
import { BehaviorSubject, lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor
  (private router:Router){}

  user: User = new User();;
  email: string = "";
  password: string = "";
  private userServices = inject(UserService);
  error : string = "";
  isError : boolean = false;

  async goHomeTab(){
    //this.getUser();

    /*if(this.email === this.user.email && this.password === this.user.password){
    console.log(this.user);
    console.log("Debe de enviar al home");
    this.router.navigate(['/home']);
    }
    else{
      console.log("Hubo un error");
    }*/
   try {
    this.user = await lastValueFrom(this.userServices.getUserByEmail(this.email, this.password));

    this.userServices.setUser(this.user);
    if(this.email == this.user.email && this.password == this.user.password){
      console.log("Debe de enviar al home", this.user);
      this.router.navigate(['/home']);
    }

  } catch (error) {
    console.error(error);
    console.log("El usuario no existe o la contraseña es incorrecta");
    this.error = "El usuario no existe o la contraseña es incorrecta";
    this.isError = true;
  }
  }

  getUser(){
    this.userServices.getUserByEmail(this.email,this.password).subscribe(
      {
        next:(userParam) =>{
      console.log("Datos recibidos:", userParam);
      this.user = userParam;
      this.userServices.setUser(this.user);
      console.log("User asignado:", this.user); // Verifica aquí
        },
        error: (error) =>{
          console.log("El usuario no existe o la contraseña es incorrecta");
        }
      }
    )
  }

  goCreateAccount(){
    this.router.navigate(['/create-account']);
  }

}
