import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';
import { error } from 'console';

@Component({
  selector: 'app-signup-company',
  templateUrl: './signup-company.component.html',
  styleUrl: './signup-company.component.scss'
})
export class SignupCompanyComponent {
  validateForm!: FormGroup; // trust that the validateForm will be of type FormGroup

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private notification: NzNotificationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      name: [null, Validators.required],
      address: [null, [Validators.required]],
      phone: [null],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required]]
    })
  }

  submitForm() {
    this.authService.registerCompany(this.validateForm.value).subscribe(res => {
      this.notification
        .success(
          'SUCCESS',
          `Signup successful`,
          { nzDuration: 5000 }
        );
      this.router.navigateByUrl('/login');
    }, error => {
      this.notification
        .error(
          'ERROR',
          `${error.error}`,
          { nzDuration: 5000 }
        );
    });
  }

}
