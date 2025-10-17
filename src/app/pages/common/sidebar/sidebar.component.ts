import { Component, OnInit } from '@angular/core';
import { sheredModule } from '../../shared/shered.module';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [...sheredModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit {
  ListName: any;
  list!: string;
  userName: any;

  ngOnInit(): void {
    this.list = 'admin';
    let indesss: any = '';
    this.userName = indesss.name;
  }
}
