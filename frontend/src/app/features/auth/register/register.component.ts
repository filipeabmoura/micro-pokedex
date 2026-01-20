import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';

import {
  DxFormModule,
  DxButtonModule
} from 'devextreme-angular';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    DxFormModule,
    DxButtonModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {

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

    this.authService.register(email, password).subscribe({
      next: (response) => {
        console.log('[Register] Sucesso:', response);
        this.router.navigate(['/auth/login']);
      },
      error: (err) => {
        console.error('[Register] Erro:', err);
        this.error = 'Erro ao realizar cadastro';
      },
    });
  }
}
