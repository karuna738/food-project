import { Component, inject, OnInit } from '@angular/core';
import { sheredModule } from '../../shared/shered.module';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [sheredModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  languvage: any;
  admin: any;
  userName: any;
  id!: number;

  languagesss!: string;
  checked1: any = true;
  checked2: any = false;
  base64Data!: string;
  uploadImage: boolean = false;
  private router = inject(Router);
  private translate = inject(TranslateService);

  ngOnInit(): void {
    this.translate.setDefaultLang('eng');
    this.languvage = 'English';

    if (['', null, undefined].includes(this.languagesss)) {
      this.languvage = 'English';
      this.checked2 = false;
      this.translate.setDefaultLang('eng');
      this.translate.use('eng');
    } else {
      this.translate.setDefaultLang(this.languagesss);
      this.translate.use(this.languagesss);
      if (this.languagesss == 'span') {
        this.checked2 = true;
        this.languvage = 'Spanish';
      }
      if (this.languagesss == 'eng') {
        this.languvage = 'English';
      }
    }

  }

  useLanguage(language: any) {
    if (language == 'eng') {
      this.checked1 = true;
      this.translate.setDefaultLang('eng');
      this.translate.use(language);
      this.languvage = 'English';
    }
    if (language == 'span') {
      this.checked1 = false;
      this.checked2 = true;
      this.translate.setDefaultLang('span');
      this.translate.use(language);
      this.languvage = 'Spanish';
    }
  }

  logout() {
    this.router.navigate(['/auth/login']);
  }
}
