import { Component, Input } from '@angular/core';
import { sheredModule } from '../../shared/shered.module';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [sheredModule],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent {
  @Input() isShow: any;
  public loader = false;
}
