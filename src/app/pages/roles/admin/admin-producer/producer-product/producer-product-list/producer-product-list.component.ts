import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDropdown, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { sheredModule } from '../../../../../shared/shered.module';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-producer-product-list',
  standalone: true,
  imports: [sheredModule],
  templateUrl: './producer-product-list.component.html',
  styleUrl: './producer-product-list.component.scss'
})
export class ProducerProductListComponent implements OnInit {
  dynamicDateChange:boolean =false 
  @ViewChild("myDropdown") myDropdown1!: NgbDropdown;
  title = 'Product List';
  admin!: string;
  datas: any = [];
  private subscriptions: Array<Subscription> = [];
  step: number = 1;
  list!: string;
  selectedaccess: any;
  filteParam: any = {}
  public filterForm!: FormGroup;
  isActive = [
    { name: 'Active', id: '1' },
    { name: 'In-Active', id: '0' }
  ]
  applyFilter: boolean = false;
  count: number = 0;
  formData: Record<string, any> = {};
  selectedDate!: Date;
  convertformDate!: string;
  converttoDate!: string;
  queryParams: any;
  keyword: string = '';
  currentPage: number = 1;
  limit: any = 10;
  offset: any = 0;
  pagecount: any;
  formattedDate:any;
  filterParams: any = {};
  converttoDateOfApp!: string;
  minToDate: Date | null = null;
  maxToDate= new Date();

  constructor(
    private formBuilder: FormBuilder, 
    private titleService: Title, 
    private modalService: NgbModal, 
    private translate: TranslateService, 
    private changeDetectRef: ChangeDetectorRef, 
    private router: Router, 
    public route: ActivatedRoute,
    private toster: ToastrService,
    @Inject(PLATFORM_ID) private platformId: Object 
  ) {}

  // ngOnInit(): void {
  //   this.initFilterForm();
  //   this.admin = sessionStorage.getItem('userList')!;
  //   this.titleService.setTitle(`${this.title} : FoodTraze ${this.admin}`);
  //   this.list = sessionStorage.getItem('userList')!;
  //   this.route.queryParams.subscribe((val: any) => {
  //     this.limit = val?.limit ?? 10;
  //     this.offset = val?.offset ?? 0;
  //     this.currentPage = val?.currentPage?+val?.currentPage: 1;
  //   })
  //   this.getList();
  //   this.filterForm.get('From Date')?.valueChanges.subscribe((fromDate: Date) => {
  //     if (fromDate) {
  //       this.minToDate = fromDate;
  //     }
  //   });
  // }
  ngOnInit(): void {
  this.initFilterForm();

  // ✅ SSR safe: only access sessionStorage in the browser
  if (isPlatformBrowser(this.platformId)) {
    this.admin = sessionStorage.getItem('userList') ?? '';
    this.titleService.setTitle(`${this.title} : FoodTraze ${this.admin}`);
    this.list = sessionStorage.getItem('userList') ?? '';
  } else {
    this.admin = '';
    this.list = '';
    this.titleService.setTitle(this.title);
  }

  this.route.queryParams.subscribe((val: any) => {
    this.limit = val?.limit ?? 10;
    this.offset = val?.offset ?? 0;
    this.currentPage = val?.currentPage ? +val?.currentPage : 1;
  });

  this.getList();

  this.filterForm.get('From Date')?.valueChanges.subscribe((fromDate: Date) => {
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
    param.docType = "Product";
    param.aliasOrg = "Producer"
    param.keyword = this.keyword;
    // this.sandbox.getProduct(param);
    // this.subscriptions.push(this.sandbox.getProduct$.pipe(filter(res => res)).subscribe(val => {
    //   if(val && Object.keys(val).length > 0){
    //     this.datas = val.data;
    //     this.pagecount = val?.count
    //   }
    // }));
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
      
      if (val === 'product') {
        this.limit = 10;
        this.offset = 0;
        this.currentPage = 1;
        this.getList();
      }
    }
  }

  initFilterForm() {
    this.filterForm = this.formBuilder.group({
      'FTLC ID': ["", Validators.required],
      'Product Name': ["", Validators.required],
      'Product Type': ["", Validators.required],
      'Date Of Application': ["", Validators.required],
      'From Date': ["", Validators.required],
      'To Date': ["", Validators.required],
    });
  }

  applyfilter(val:any) {
  this.dynamicDateChange =false 
    this.convertformDate = this.filterForm.value['From Date'] ? moment(this.filterForm.value['From Date'])
    .format('YYYY-MM-DD') : '';
    this.converttoDate = this.filterForm.value['To Date'] ? moment(this.filterForm.value['To Date'])
    .format('YYYY-MM-DD') : '';
    this.converttoDateOfApp = this.filterForm.value['Date Of Application'] ? moment(this.filterForm.value['Date Of Application'])
    .format('YYYY-MM-DD') : '';    
    const param: any = {}
    if(val == '2'){
      this.offset = 0;
      this.currentPage = 1;
      param.offset = this.offset;
      this.setQueryParams();
    }else{
      param.offset = this.offset;
    }
    this.applyFilter = true;
    param.limit = this.limit;
    param.sort = -1;
    param.count = 1;
    param.docType = "Product";
    param.ftlcId = this.filterForm.value['FTLC ID'] ? this.filterForm.value['FTLC ID'].trim() : "";
    param.productName = this.filterForm.value['Product Name'] ? this.filterForm.value['Product Name'] : "";
    param.productType = this.filterForm.value['Product Type'] ? this.filterForm.value['Product Type'] : "";
    param.dateOfApplication = this.converttoDateOfApp ? this.converttoDateOfApp : "";
    param.fromDate = this.convertformDate ? this.convertformDate : '';
    param.toDate = this.converttoDate ? this.converttoDate : '';
    this.filterParams = JSON.parse(JSON.stringify(param));

    const hasValue = [ 'ftlcId','productName', 'productType', 'dateOfApplication', 'fromDate', 'toDate'].some(key => {
      const value = param[key];
      return val == 1 ? true : value !== null && value !== undefined && value !== '';
    });

    if(hasValue){
      this.getValueExistsCount();
      // this.sandbox.getProduct(param);
      // this.subscriptions.push(this.sandbox.getProduct$.pipe(filter(res => res)).subscribe(val => {
      //   if(val){
      //     this.datas = val.data;
      //     this.pagecount = val?.count;
      //   }
      // }));
    }
    if(!hasValue){
      this.translate.get("Message.Please enter any one feild").subscribe(res => {
        this.toster.error(res);
        });
    }


    if (this.myDropdown1 && hasValue) {
      this.myDropdown1?.close()
    }
  }



  reset() {
    this.dynamicDateChange = false;
    this.applyFilter = false;
    this.filterForm.reset();
    this.count = 0;
    this.formData = [];
    this.getList();
    if (this.myDropdown1) {
      this.myDropdown1?.close();
    }

  }

  singleClearFilter(val:any) {
    this.filterForm.controls[val].setValue(null);
    this.applyfilter('1');
  }

  getValueExistsCount() {
    this.count = 0;
    const val = this.filterForm.value;
    const formData:any = {}
    for (const key in val) {
      if (val[key]) {
        this.count++;
        formData[`${this.count}_${key}`] = val[key];
      }
    }
    this.formData = formData;
  }

  searchList(event: any) {
    const param: any = {}
    this.keyword = event.value;
    param.limit = this.limit;
    param.offset = event.value ? 0 : this.offset;
    param.sort = -1;
    param.count = 1;
    param.docType = "Product";
    param.aliasOrg = "Producer";
    param.keyword = event;
    // this.sandbox.getProduct(param);
    // this.sandbox.getProduct$.subscribe(val => {
    //   this.datas = val?.data;
    //   this.pagecount = val?.count;
    // })
    if(!event){
      this.keyword = '';
    }

  }

  editform(data:any) {
    this.router.navigate(['/Admin/Producer/productEdit'], { queryParams: { name: data?.FTLCID } })
  }

  deleteform(data:any) {
    // const modalRef = this.modalService.open(DeletemodalComponent, {
    //   size: "sm",
    //   windowClass: "deleteModal",
    //   centered: true,
    //   backdrop: "static",
    //   backdropClass: "createcr",
    // });
    // modalRef.componentInstance.message = "Product Detail";
    // modalRef.componentInstance.deleteDetail = data;
    // modalRef.result.then((result) => {
    //   if (result === "deleted") {
    //     const params: any = {};
    //     params.id = data?.FTLCID;
    //     this.sandbox.deleteProduct(params);
    //     this.sandbox.deleteProduct$.subscribe(vall => {
    //       if (vall?.status == 1 && vall) {
    //         this.getList();
    //         this.changeDetectRef.detectChanges();
    //       }
    //     })
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
    //     this.getList()
    //   }
    // })
  }

  // leaveFunction(){
  //   setTimeout(() => {
  //     this.modalService.dismissAll();
  //   },5000)
  // }
  opentransfermodal(data: any) {
    // const modelRef = this.modalService.open(TransfermodalComponent, {
    //   size: 'xl', windowClass: 'transfermodal', backdrop: 'static', backdropClass: 'createcr',
    //   centered: true,
    // });
    // modelRef.componentInstance.transerDetail = data;
    // modelRef.result.then(result => {
    //   if (result == "close") {
    //     this.getList()
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
      this.getList();

    }
   
  }

  setQueryParams() {
    this.router.navigate([], {
      queryParams: { limit: this.limit, offset: this.offset,currentPage:this.currentPage },
    });
  }

}
