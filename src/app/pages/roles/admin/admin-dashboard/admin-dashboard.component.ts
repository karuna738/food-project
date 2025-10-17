import { Component, inject, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { sheredModule } from '../../../shared/shered.module';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [...sheredModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss',
})
export class AdminDashboardComponent implements OnInit {
  pageSizeOptions = [{ id: 2 }, { id: 5 }, { id: 10 }, { id: 15 }, { id: 20 }];
  currentPage = 1;
  limit: any = 10;
  offset = 0;
  queryData: any = {};
  page: any = this.pageSizeOptions;
  approvalFlag: any = 0;
  count: any = 0;
  emailVerify: any = 1;
  listValue: any;
  separate: any = [
    {
      alias_org: 'Producer',
    },
    {
      alias_org: 'Processing Plant',
    },
    {
      alias_org: 'Distribution Center',
    },
    {
      alias_org: 'Retailer',
    },
  ];
  title = 'Dashboard';
  admin: any;
  private titleService = inject(Title);
  ngOnInit(): void {
    this.titleService.setTitle(`${this.title} : FoodTraze ${this.admin}`);

  }
}
