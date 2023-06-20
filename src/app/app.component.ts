import { Component } from '@angular/core';
import { LoginService } from './service/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'demo01';
  sideNavStatus: boolean = false;
  role:string="";
  constructor(private loginService: LoginService) {
  }
  showLogin: boolean = true;

  cerrar() {
    sessionStorage.clear();
  }

  verificar() {
    this.role=this.loginService.showRole();
    return this.loginService.verificar();
  }
  validarRol(){
    if(this.role=='ADMIN' || this.role=='USER' || this.role== 'PSICOLOGO'){
      return true;
    }else{
      return false;
    }
  }
}
