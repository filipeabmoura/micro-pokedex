import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ){}
  
  email = '';
  password='';

  submit(){
    this.authService.register(this.email, this.password).subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}
