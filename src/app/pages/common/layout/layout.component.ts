import { Component } from '@angular/core';
import { sheredModule } from '../../shared/shered.module';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [sheredModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

}
