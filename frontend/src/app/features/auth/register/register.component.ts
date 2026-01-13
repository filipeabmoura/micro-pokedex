import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
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
    })
  }
}
