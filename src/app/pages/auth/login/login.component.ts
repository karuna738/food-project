import { Component, inject, OnInit } from '@angular/core';
import { sheredModule } from '../../shared/shered.module';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [...sheredModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  access = [
    { id: 1, name: 'Admin', type: 'admin' },
    { id: 2, name: 'Producer', type: 'Producer' },
    { id: 3, name: 'Processor', type: 'Processing Plant' },
    { id: 4, name: 'Distributor', type: 'Distribution Center' },
    { id: 5, name: 'Retailer', type: 'Retailer' },
  ];
  selectedaccess: any;
  hidePassword: boolean = true;

  private router = inject(Router);
  ngOnInit() {}

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  onsubmit() {
      this.router.navigate(['/dashboard']);
    }
  }
