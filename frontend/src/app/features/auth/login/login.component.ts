import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';

import {
  DxFormModule,
  DxButtonModule
} from 'devextreme-angular';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    DxFormModule,
    DxButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  formData = {
    email: '',
    password: '',
  };

  error = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  submit() {
    const { email, password } = this.formData;

    this.authService.login(email, password).subscribe({
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
