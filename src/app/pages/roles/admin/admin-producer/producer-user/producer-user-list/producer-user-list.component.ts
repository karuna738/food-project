import { Component, OnInit, ViewChild } from '@angular/core';
import { sheredModule } from '../../../../../shared/shered.module';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-producer-user-list',
  standalone: true,
  imports: [sheredModule],
  templateUrl: './producer-user-list.component.html',
  styleUrl: './producer-user-list.component.scss'
})
export class ProducerUserListComponent implements OnInit{

  dynamicDatechange: boolean = false;
  title = 'Producer List';
  @ViewChild("myDropdown") myDropdown1!: NgbDropdown;
  datas: any = [];
  subscriptions: Subscription = new Subscription();
  step: number = 1;
  list!: string;
  admin!: string;
  applyFilter!: boolean;
  accesssss: any;
  filterForm!: FormGroup;
  count: number = 0;
  keyword: any = '';
  formData: Record<string, any> = {};
  convertformDate!: string;
  converttoDate!: string;
  currentPage: number = 1;
  limit: any = 10;
  offset: any = 0;
  pagecount: any;
  Status = [
    { id: 0, name: "InActive" },
    { id: 1, name: "Active" }
  ];
  deviceInfo: any;
  minToDate: Date | null = null;
  maxToDate = new Date();

  constructor(
    private formBuilder: FormBuilder, 
    private titleService: Title, 
    private translate: TranslateService, 
    private router: Router,
    public route: ActivatedRoute,
    public toster: ToastrService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  // ngOnInit(): void {
  //   this.initForm();
  //   this.admin = sessionStorage.getItem('userList')!;
  //   this.titleService.setTitle(`${this.title} : FoodTraze ${this.admin}`);
  //   if (isPlatformBrowser(this.platformId)) {
  //     this.title = sessionStorage.getItem('Title')!;
  //     console.log('Session title:', this.title);
  //   }
  //   this.list = sessionStorage.getItem('userList')!;
  //   this.route.queryParams.subscribe((val: any) => {
  //     this.limit = val?.limit ?? 10;
  //     this.offset = val?.offset ?? 0;
  //     this.currentPage = val?.currentPage ? +val?.currentPage : 1;
  //   });
  //   this.getMail();
  //   this.getCount();
  //   this.filterForm.get('From Date')?.valueChanges.subscribe((fromDate: Date) => {
  //     if (fromDate) {
  //       this.minToDate = fromDate;
  //     }
  //   });
  // }

  ngOnInit(): void {
  this.initForm();

  if (isPlatformBrowser(this.platformId)) {
    // ✅ All browser-only APIs should be inside this block
    this.admin = sessionStorage.getItem('userList')!;
    this.title = sessionStorage.getItem('Title')!;
    this.list = sessionStorage.getItem('userList')!;
  } else {
    // Optional: fallback values during SSR
    this.admin = '';
    this.title = 'Producer List';
    this.list = '';
  }
  this.route.queryParams.subscribe((val: any) => {
    this.limit = val?.limit ?? 10;
    this.offset = val?.offset ?? 0;
    this.currentPage = val?.currentPage ? +val?.currentPage : 1;
  });

  this.getMail();
  this.getCount();

  this.filterForm.get('From Date')?.valueChanges.subscribe((fromDate: Date) => {
    if (fromDate) {
      this.minToDate = fromDate;
    }
  });
}


  onDatepickerOpened() {
    this.dynamicDatechange = true;
  }

  onDatepickerClosed() {
    this.dynamicDatechange = false;

  }

  tabChange(val: any) {
    const routes:any = {
      pro: '/admin/producer/user/userlist',
      owner: '/admin/producer/owner/ownerlist',
      product: '/admin/producer/product/productlist'
    };

    if (routes[val]) {
      this.router.navigate([routes[val]]);

      if (val === 'pro') {
        this.limit = 10;
        this.offset = 0;
        this.currentPage = 1;
        this.getMail();
        this.getCount();
      }
    }
  }

  getMail() {
    const params: any = {};
    params.limit = this.limit;
    params.offset = this.offset;
    params.sort = -1;
    params.count = 0;
    params.aliasOrg = "Producer";
    // this.shippingsandbox.login(params);
    // this.subscriptions.add(this.shippingsandbox.login$.subscribe(vall => {
    //   this.datas = vall.data;
    // }));
    // this.setQueryParams()
  }
  getCount() {
    const params: any = {};
    params.limit = this.limit;
    params.offset = this.offset;
    params.sort = -1;
    params.count = 1;
    params.aliasOrg = "Producer";
    // this.shippingsandbox.loginCount(params);
    // this.subscriptions.add(this.shippingsandbox.loginCount$.subscribe(vall => {
    //   this.pagecount = vall.data;
    // }));
    this.setQueryParams()
  }

  identity(val: any): void {
    sessionStorage.removeItem('aliasOrg');
    sessionStorage.removeItem('identityId');
    this.router.navigate([`users/usercreate`], { queryParams: { name: val } });
  }

  initForm(): void {
    this.filterForm = this.formBuilder.group({
      'Name': [null, [Validators.required]],
      'City': [null, [Validators.required]],
      'Email': [null, [Validators.required]],
      'Phone Number': [null, [Validators.required]],
      'Status': [null, [Validators.required]],
      'From Date': [null, [Validators.required]],
      'To Date': [null, [Validators.required]],
    });
  }

  applyfilter(val:any) {
    this.dynamicDatechange = false;
    this.convertformDate = this.filterForm.value['From Date'] ? moment(this.filterForm.value['From Date'])
      .format('YYYY-MM-DD') : '';
    this.converttoDate = this.filterForm.value['To Date'] ? moment(this.filterForm.value['To Date'])
      .format('YYYY-MM-DD') : '';
    const params: any = {};
    params.limit = this.limit;
    if(val == '2'){
      this.offset = 0;
      this.currentPage = 1;
      params.offset = this.offset;
      this.setQueryParams();
    }else{
      params.offset = this.offset;
    }
   
    params.sort = -1;
    params.count = 0;
    params.aliasOrg = "Producer";
    params.name = this.filterForm.value['Name'] ? this.filterForm.value['Name'] : "";
    params.city = this.filterForm.value['City'] ? this.filterForm.value['City'] : "";
    params.email = this.filterForm.value['Email'] ? this.filterForm.value['Email'] : "";
    params.phoneNumber = this.filterForm.value['Phone Number'] ? this.filterForm.value['Phone Number'] : "";
    params.fromDate = this.convertformDate ? this.convertformDate : '';
    params.toDate = this.converttoDate ? this.converttoDate : '';
    const statusMap:any = {
      1: 1,
      Active: 1,
      0: 0,
      InActive: 0
    };
    params.status = statusMap[this.filterForm.value['Status']] !== undefined ? statusMap[this.filterForm.value['Status']] : '';
    const hasValue = ['name', 'city', 'email', 'phoneNumber', 'status', 'fromDate', 'toDate'].some(key => {
      const value = params[key];
      return val == 1 ? true : value !== null && value !== undefined && value !== '';
    });
    if (hasValue) {
      this.getValueExistsCount();
      // this.shippingsandbox.login(params);
      // this.subscriptions.add(this.shippingsandbox.login$.subscribe(vall => {
      //   this.datas = vall.data;
      // }));
      let param = params;
      param.count = 1;
      // this.shippingsandbox.loginCount(param);
      // this.subscriptions.add(this.shippingsandbox.loginCount$.subscribe(vall => {
      //   this.pagecount = vall.data;
      // }));
    }
    if(!hasValue){
      this.translate.get("Message.Please enter any one feild").subscribe(res => {
        this.toster.error(res);
        });
    }
    // if (this.myDropdown1 && hasValue) {
    //   this.myDropdown1?.close();
    // }

  }



  reset() {
    this.dynamicDatechange = false
    this.applyFilter = true;
    this.filterForm.reset();
    this.count = 0;
    this.formData = [];
    this.getMail();
    this.getCount();

    // if (this.myDropdown1) {
    //   this.myDropdown1?.close();
    // }
  }

  singleClearFilter(val:any) {
    
    this.filterForm.controls[val].setValue(null);
    this.applyfilter('1');
  }

    getValueExistsCount() {
      this.count = 0;
      const vall = this.filterForm.value;
      
      const formData:any = {};
      for (const key in vall) {
        if (![null,""].includes(vall[key])) {
          if (key === 'Status') {
            vall[key] = vall[key] === 0 ? 'InActive' : 'Active';
          }
          this.count++;
          formData[`${this.count}_${key}`] = vall[key];
        }
      }
      this.formData = formData;
      
    }

  searchList(event: any) {
    const param: any = {}
    param.limit = this.limit;
    param.offset = event.value ? 0 : this.offset;
    param.sort = -1;
    param.count = 0;
    param.aliasOrg = "Producer";
    param.keyword = event.value;
    // this.shippingsandbox.login(param);
    // this.subscriptions.add(this.shippingsandbox.login$.subscribe(vall => {
    //   this.datas = vall.data;
    // }));
    let params = param;
    param.count = 1;
    // this.shippingsandbox.loginCount(params);
    // this.subscriptions.add(this.shippingsandbox.loginCount$.subscribe(vall => {
    //   this.pagecount = vall.data;
    // }));
    if (!event) {
      this.keyword = '';
    }
  }

  edit(id: any, name: any): void {
    this.router.navigate([`/Admin/Producer/edit`], { queryParams: { name: name, editId: id } })
  }

  Delete(event: any): void {
    // const modalRef = this.modalService.open(DeletemodalComponent, {
    //   size: "sm",
    //   windowClass: "deleteModal",
    //   centered: true,
    //   backdrop: "static",
    //   backdropClass: "createcr",
    // });
    // modalRef.componentInstance.message = "Producer User List";
    // modalRef.componentInstance.deleteDetail = event;
    // modalRef.result.then((result) => {
    //   if (result === "deleted") {
    //     const params: any = {};
    //     this.sandboxIdentity.identityDelete(event.id)
    //     this.subscriptions.add(this.sandboxIdentity.identityDelete$.subscribe(val => {
    //       if (val?.status == 1) {
    //         this.getMail()
    //         this.getCount();
    //       }
    //     }));
    //   }
    // });
  }


  openblock(data: any) {
    // const modelRef = this.modalService.open(BlockchainComponent, {
    //   size: 'xl', windowClass: 'blockchain', backdrop: 'static', backdropClass: 'createcr',
    //   centered: true,
    // });
    // modelRef.componentInstance.transerDetail = data;
    // modelRef.result.then(result => {
    //   if (result == "close") {
    //     this.getMail()
    //     this.getCount();
    //   }
    // })
  }


  onPageChange(event: { offset: number; limit: number }): void {
    
    this.limit = event.limit;
    this.offset = event.offset
    this.currentPage = Math.floor(event.offset / event.limit) + 1;
    if(Object.keys(this.formData).length > 0){
      this.applyfilter('');
    }else{
      this.getMail();
      this.getCount();
    }
  
  }

  setQueryParams() {
    this.router.navigate([], {
      queryParams: { limit: this.limit, offset: this.offset, currentPage: this.currentPage },
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
  

}
