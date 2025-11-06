import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { sheredModule } from '../../../../../shared/shered.module';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDropdown, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-producer-owner-list',
  standalone: true,
  imports: [sheredModule],
  templateUrl: './producer-owner-list.component.html',
  styleUrl: './producer-owner-list.component.scss'
})
export class ProducerOwnerListComponent implements OnInit {
  minToDate: Date | null = null; 
  maxToDate = new Date();
  dynamicDateChange:boolean =false 
  @ViewChild("myDropdown") myDropdown!: NgbDropdown;
  loginFormOne!: FormGroup;
  title = 'Owner List';
  admin!: string;
  datas: any = [];
  count = 0;
  formData: Record<string, any> = {};
  keyword: any = '';
  currentPage: number = 1;
  limit: number = 10;
  offset: any = 0;
  pagecount: any = 0;
  selectedaccess: any;
  applyFilter: boolean = false;
  selectedaccessss: any;
  private subscriptions: Array<Subscription> = [];
  convertformDate!: string;
  converttoDate!: string;
  packedDate!: string;
  filterParams: any = {};

  constructor(private fb: FormBuilder, 
    private titleService: Title, 
    private modalService: NgbModal, 
    private translate: TranslateService, 
    // public sandbox: TraceabilitySandbox, 
    private changeDetectRef: ChangeDetectorRef, 
    private router: Router, 
    public route: ActivatedRoute,
    // private service: TraceabilityService,
    private toster:ToastrService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  //  ngOnInit(): void {
  //   this.admin = sessionStorage.getItem('userList')!;
  //   this.titleService.setTitle(`${this.title} : FoodTraze ${this.admin}`);
  //   this.route.queryParams.subscribe((val: any) => {

  //     this.limit = val?.limit ?? 10;
  //     this.offset = val?.offset ?? 0;
  //     this.currentPage = val?.currentPage ? +val?.currentPage : 1;
  //   })
  //   this.getList();
  //   this.initForm();
  //   this.loginFormOne.get('From Date')?.valueChanges.subscribe((fromDate: Date) => {
  //     if (fromDate) {
  //       this.minToDate = fromDate;
  //     }
  //   });
  // }

  ngOnInit(): void {
  this.initForm(); // initialize form before everything

  if (isPlatformBrowser(this.platformId)) {
    this.admin = sessionStorage.getItem('userList')!;
    this.titleService.setTitle(`${this.title} : FoodTraze ${this.admin}`);
  } else {
    this.admin = '';
  }

  this.route.queryParams.subscribe((val: any) => {
    this.limit = val?.limit ?? 10;
    this.offset = val?.offset ?? 0;
    this.currentPage = val?.currentPage ? +val?.currentPage : 1;
  });

  this.getList();

  this.loginFormOne.get('From Date')?.valueChanges.subscribe((fromDate: Date) => {
    if (fromDate) {
      this.minToDate = fromDate;
    }
  });
}

  onDatepickerOpened() {
    this.dynamicDateChange = true;
  }

  onDatepickerClosed() {
    this.dynamicDateChange = false;

  }

  getList() {
    const param: any = {};
    param.limit = this.limit;
    param.offset = this.offset;
    param.sort = -1;
    param.count = 1;
    param.docType = "Owner";
    param.aliasOrg = "Producer";
    param.keyword = this.keyword;
    // this.sandbox.getOwner(param);
    // this.sandbox.getOwner$.subscribe((val: any) => {
    //   if (val && val?.data?.length > 0){
    //     this.datas = val?.data;      
    //     this.pagecount = val?.count;
    //   }
    // });
    this.setQueryParams();
  }

  tabChange(val: any) {
    const routes:any = {
      pro: '/admin/producer/user/userlist',
      owner: '/admin/producer/owner/ownerlist',
      product: '/admin/producer/product/productlist'
    };
  
    if (routes[val]) {
      this.router.navigate([routes[val]]);
      
      if (val === 'owner') {
        this.limit = 10;
        this.offset = 0;
        this.currentPage = 1;
        this.getList();
      }
    }
  }

  reset() {
    this.applyFilter = false;
    this.loginFormOne.reset();
    this.getValueExistsCount();
    this.getList();
    this.myDropdown.close()
  }

  openblock(data: any) {
    // const modelRef = this.modalService.open(BlockchainComponent, {
    //   size: 'xl', windowClass: 'blockchain', backdrop: 'static', backdropClass: 'createcr',
    //   centered: true,
    // });
    // modelRef.componentInstance.transerDetail = data;
    // modelRef.result.then(result => {
    //   if (result == "close") {
    //     this.getList()
    //   }
    // })
  }


  singleClearFilter(val:any) {
    this.loginFormOne.controls[val].setValue(null);
    this.applyfilter('1');
  }


  formatDate(date: Date): string {
    const formattedDate = new Date(date);
    const day = formattedDate.getDate().toString().padStart(2, '0');
    const month = (formattedDate.getMonth() + 1).toString().padStart(2, '0');
    const year = formattedDate.getFullYear();
    return `${day}/${month}/${year}`;

  }


  getValueExistsCount() {
    this.count = 0;
    const val = this.loginFormOne.value;
    const formData:any = {};
    for (const key in val) {
      if (val[key]) {
        this.count++;
        formData[`${this.count}_${key}`] = val[key];
      }
    }
    this.formData = formData;
    
  }

  applyfilter(val:any) {
    this.dynamicDateChange = false;
    this.convertformDate = this.loginFormOne.value["From Date"] ? moment(this.loginFormOne.value["From Date"])
      .format('YYYY-MM-DD') : '';
    this.converttoDate = this.loginFormOne.value["To Date"] ? moment(this.loginFormOne.value["To Date"])
      .format('YYYY-MM-DD') : '';

    this.packedDate = this.loginFormOne.value["Date Of Application"] ? moment(this.loginFormOne.value["Date Of Application"])
      .format('YYYY-MM-DD') : ''
    this.applyFilter = true;
    const param: any = {};
    if(val == '2'){
      this.offset = 0;
      this.currentPage = 1;
      param.offset = this.offset;
      this.setQueryParams();
    }else{
      param.offset = this.offset;
    }
    param.limit = this.limit;
    param.sort = -1;
    param.count = 1;
    param.docType = "Owner";
    param.ftlcId = this.loginFormOne.value["FTLC ID"] ?? '';
    param.name = this.loginFormOne.value["Owner Name"] ?? '';
    param.mobile = this.loginFormOne.value["Phone Number"] ?? '';
    param.dateOfApplication = this.packedDate ?? '';
    param.fromDate = this.convertformDate ? this.convertformDate : '';
    param.toDate = this.converttoDate ? this.converttoDate : '';
    this.filterParams = JSON.parse(JSON.stringify(param));

    const hasValue = ['ftlcId','name', 'mobile', 'dateOfApplication', 'fromDate', 'toDate'].some(key => {
      const value = param[key];
      return val == 1 ? true : value !== null && value !== undefined && value !== '';
    });
    if(hasValue){
      this.getValueExistsCount();
    //   this.sandbox.getOwner(param);
    // this.sandbox.getOwner$.subscribe((val: any) => {
    //   if (val){
    //     this.datas = val?.data;      
    //     this.pagecount = val?.count;
    //   }
    // });
    }

    if(!hasValue){
      this.translate.get("Message.Please enter any one feild").subscribe(res => {
        this.toster.error(res);
        });
    }
    if (this.myDropdown && hasValue) {
      this.myDropdown.close();
    }
  }

  initForm(): void {
    this.loginFormOne = this.fb.group({
      "FTLC ID": [null, [Validators.required]],
      "Owner Name": [null, [Validators.required]],
      "Phone Number": [null, [Validators.required]],
      "Date Of Application": [null, [Validators.required]],
      "From Date": [null, [Validators.required]],
      "To Date": [null, [Validators.required]],
    });
  }

  searchList(event: any) {
    const param: any = {}
    param.limit = this.limit;
    param.offset = event.value ? 0 : this.offset;
    param.sort = -1;
    param.count = 1;
    param.docType = "Owner";
    param.aliasOrg = "Producer"
    param.keyword = event.value;
    // this.sandbox.getOwner(param);
    // this.sandbox.getOwner$.subscribe(val => {
    //   this.datas = val?.data;
    //   this.pagecount = val?.count;
    // })
    if(event == ''){
      this.keyword = '';
    }
  }


  editpackage(data:any) {
    this.router.navigate([`Admin/Producer/ownerEdit`], { queryParams: { name: data.FTLCID } })
  }

  deleteform(data:any) {
    // const modalRef = this.modalService.open(DeletemodalComponent, {
    //   size: "sm",
    //   windowClass: "deleteModal",
    //   centered: true,
    //   backdrop: "static",
    //   backdropClass: "createcr",
    // });
    // modalRef.componentInstance.message = "Owner Detail";
    // modalRef.componentInstance.deleteDetail = data;
    // modalRef.result.then((result) => {
    //   if (result === "deleted") {
    //     const params: any = {};
    //     params.id = data?.FTLCID;
    //     this.sandbox.deleteOwner(params);
    //     this.sandbox.deleteOwner$.subscribe(vall => {
    //       if (vall?.status == 1 && vall) {
    //         this.getList();
    //         this.changeDetectRef.detectChanges();
    //       }
    //     })
    //   }
    // });

  }

  onPageChange(event: { offset: number; limit: number }): void {
    this.limit = event.limit;
    this.offset = event.offset;
    this.currentPage = Math.floor(event.offset / event.limit) + 1;
    if(Object.keys(this.formData).length > 0){
      this.applyfilter('');
    }else{
      this.getList();
    }

  }
  setQueryParams() {
    this.router.navigate([], {
      queryParams: { limit: this.limit, offset: this.offset, currentPage: this.currentPage },

    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach(each => each.unsubscribe());
  }


}
