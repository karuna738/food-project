import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { sheredModule } from '../../shared/shered.module';

@Component({
  selector: 'app-breadcrumbs',
  standalone: true,
  imports: [sheredModule],
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
})
export class BreadcrumbsComponent implements OnInit {
  public pageInfo: any = {};
  public lastPath: string = '';

  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  ngOnInit() {
    this.router.onSameUrlNavigation = 'reload';
    this.buildBreadcrumbData(this.activatedRoute);
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.buildBreadcrumbData(this.activatedRoute);
      });
  }

  private buildBreadcrumbData(route: ActivatedRoute) {
    // Reset
    this.pageInfo = {};
    this.lastPath = '';

    // ✅ get deepest child route
    while (route.firstChild) {
      route = route.firstChild;
    }

    // ✅ read URL segments
    route.url.subscribe((segments) => {
      if (segments.length > 0) {
        this.lastPath = segments[segments.length - 1].path;
      }
    });

    // ✅ read route data (for data.urls)
    this.pageInfo = route.snapshot.data || {};
  }

  crumbClick(val: any) {
    if (val.url && val.url !== '') {
      this.router.navigate([val.url]);
    }
  }
}
