import { Component, EventEmitter, Input, Output } from '@angular/core';
import { sheredModule } from '../../shared/shered.module';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [sheredModule],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss',
})
export class PaginatorComponent {
  @Input() dataLength!: number;

  @Input() type: string = 'default';
  @Input() currentPage: any;
  @Input() pageSize: any;
  @Input() totalItems: any;
  @Output() pageChange: EventEmitter<{ offset: number; limit: number }> =
    new EventEmitter<{ offset: number; limit: number }>();
  page: string = '1';
  pageSizeOptions: number[] = [5, 10, 25, 50];
  currentPagecal: string = '10';
  totalTabs: any = 1;
  ngOnInit() {
    this.goToPage(this.currentPage);
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  get totalPageItems() {
    const val = Math.ceil(this.totalItems / this.pageSize);
    return [...Array(val).keys()].map((el) => el + 1);
  }

  get currentPageStart(): number {
    return (this.currentPage - 1) * this.pageSize + 1;
  }

  get currentPageEnd(): number {
    const end = this.currentPage * this.pageSize;
    return end > this.totalItems ? this.totalItems : end;
  }

  get pages(): number[] {
    const totalPages = this.totalPages;
    const currentPage = this.currentPage;
    const visiblePages = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let page = startPage; page <= endPage; page++) {
      visiblePages.push(page);
    }
    return visiblePages;
  }

  pageChanged(event: any): void {
    const newPage = event.pageIndex + 1;
    const offset = (newPage - 1) * this.pageSize;
    this.pageChange.emit({ offset, limit: this.pageSize });
  }

  goToPage(page: number): void {
    this.totalTabs = Math.floor(this.totalItems / this.pageSize);
    this.page = page === 1 ? `${page}` : `${page - 1}1`;
    if (page <= this.totalTabs) {
      this.currentPagecal = `${page}0`;
    } else {
      this.currentPagecal = `${this.totalItems}`;
    }
    if (page !== this.currentPage) {
      const offset = (page - 1) * this.pageSize;
      this.pageChange.emit({ offset, limit: this.pageSize });
    }
  }

  goToFirstPage(): void {
    if (this.currentPage !== 1) {
      this.goToPage(1);
    }
  }

  Gotogivenpage(page: any) {
    if (!['null', '', undefined, 0, String(this.currentPage)].includes(page.value) && this.totalPages >= page.value) {
      this.goToPage(page.value);
    }
  }

  goToLastPage(): void {
    if (this.currentPage !== this.totalPages) {
      this.goToPage(this.totalPages);
    }
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.goToPage(this.currentPage - 1);
    }
  }

  goToNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.goToPage(this.currentPage + 1);
    }
  }

  onPageSizeChange(pageSize: any): void {
    this.pageSize = pageSize.target.value;
    this.pageChange.emit({ offset: 0, limit: this.pageSize });
  }
}
