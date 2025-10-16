import { Component, inject, OnInit } from '@angular/core';
import { sheredModule } from '../../shared/shered.module';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  standalone: true,
  imports: [sheredModule],
  templateUrl: './breadcrumbs.component.html',
  styleUrl: './breadcrumbs.component.scss',
})
export class BreadcrumbsComponent implements OnInit {
  public pageInfo: any;
  public lastPath: any = '';

  public router = inject(Router);
  public activatedRoute = inject(ActivatedRoute);

  ngOnInit() {
    this.router.onSameUrlNavigation = 'reload';
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .pipe(map(() => this.activatedRoute))
      .pipe(
        map((route) => {
          this.pageInfo = {};
          route.url.subscribe((data) => {
            if (data.length > 1) {
              this.lastPath = data[1].path;
            }
          });
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        })
      )
      .pipe(filter((route) => route.outlet === 'primary'))
      .pipe(mergeMap((route) => route.data))
      .subscribe((event) => {
        this.pageInfo = event;
      });
  }
    crumbClick(val:any){
    if(val.url != ""){
      this.router.navigate([val.url]);
    }
  }
}
