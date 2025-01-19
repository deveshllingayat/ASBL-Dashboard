import { Component, Input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(private auth: AuthService, private router: Router) {}

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  validationMessage: string = '';

  submit() {
    if (this.form.valid) {
      this.auth.login(this.form.value.username, this.form.value.password);
      console.log(this.auth.isAuthenticated());
      if (this.auth.isAuthenticated()) {
        alert('Login Successfull');
        this.router.navigate(['/projects']);
      } else {
        this.validationMessage = 'Invalid Credentials';
      }
    }
  }
}
