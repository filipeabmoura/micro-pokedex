import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ){}

  submit(){
    this.authService.login(this.email, this.password).subscribe({
      next: () => this.router.navigate(['/']), error: () => (this.error = 'Credenciais inválidas')
    });
  }
}
