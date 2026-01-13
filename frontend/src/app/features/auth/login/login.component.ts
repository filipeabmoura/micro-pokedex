import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
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
  ) { }

  submit() {
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        console.log('[Login] Sucesso:', response);
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('[Login] Erro:', err);
        this.error = 'Credenciais inválidas';
      },
    });
  }
}
