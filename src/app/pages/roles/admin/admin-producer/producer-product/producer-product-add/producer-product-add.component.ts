import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { sheredModule } from '../../../../../shared/shered.module';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-producer-product-add',
  standalone: true,
  imports: [sheredModule],
  templateUrl: './producer-product-add.component.html',
  styleUrl: './producer-product-add.component.scss'
})
export class ProducerProductAddComponent implements OnInit {
  unit = [
    { id: 1, name: 'kg' },
    { id: 2, name: "g" }
  ];
  
  maxDate = new Date();
  loginForm: any;
  submitted: any;
  datasssss!: any;
  id: any;
  listData: any;
  filess: any;
  fileSelected: boolean = false;
  base64Data: string = '';
  selectedCar: any;
  selectedCarrrrs: any;
  admin!: string;
  title = 'Create Product';
  imageddddds: any = [];
  accesssss: any;
  userId: any;
  productTypeId: any;
  productTypeName: any;
  uploadfile: boolean = false;
  uploadfilecrop: boolean = false;
  minDate = new Date();
  files: File[] = [];
  fileDetails: any[] = [];
  base64DataArray: {
    fileName: string;
    fileData: string;
    fileSize: any;
    fileDate: Date;
    spinner: boolean;
  }[] = [];
  uploadProgress: { [key: string]: boolean } = {};
  Spinner: { [key: string]: boolean } = {};
  userName: any;
  dummyfilearr: any = [];
  cropCondition: any = [];
  imagecropbind: any = [];
  imageUrl = '';
  newobj: any = {};
  error: any;
  latAdress: any;
  ownerData: any = [];

  constructor(
    private toastr: ToastrService,
    private titleService: Title,
    public router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    public toaster: ToastrService,
    @Inject(PLATFORM_ID) private platformId: Object 
  ) {}

  // ngOnInit(): void {
  //   this.initializeForm();
  //   const filter = this.route.snapshot.queryParamMap.get('name');
  //   this.datasssss = filter;

  //   if (!['', null, undefined].includes(this.datasssss)) {
  //     this.title = 'Edit Product';
  //     this.getDetailPage();
  //   }

  //   this.admin = sessionStorage.getItem('userList')!;
  //   this.titleService.setTitle(`${this.title} : FoodTraze ${this.admin}`);

  //   this.getMail();
  //   this.getOwner();
  //   this.getcropcondition();
  // }

  ngOnInit(): void {
  this.initializeForm();

  const filter = this.route.snapshot.queryParamMap.get('name');
  this.datasssss = filter;

  if (!['', null, undefined].includes(this.datasssss)) {
    this.title = 'Edit Product';
    this.getDetailPage();
  }

  // ✅ Browser-safe sessionStorage usage
  if (isPlatformBrowser(this.platformId)) {
    this.admin = sessionStorage.getItem('userList') ?? '';
    this.titleService.setTitle(`${this.title} : FoodTraze ${this.admin}`);
  } else {
    this.admin = '';
    this.titleService.setTitle(this.title);
  }

  this.getMail();
  this.getOwner();
  this.getcropcondition();
}

  getcropcondition() {
    const params: any = {};
    params.limit = 0;
    params.offset = 0;
    params.sort = -1;
    params.count = 0;
    // this.sandbox.ProductType(params);
    // this.sandbox.ProductType$.subscribe((vall) => {
    //   this.cropCondition = vall.data;
    // });
  }
  getMail() {
    const params: any = {};
    params.aliasOrg = 'Producer';
    // this.shippingsandbox.login(params);
    // this.shippingsandbox.login$.subscribe((vall) => {
    //   this.accesssss = vall.data;
    // });
  }
  getOwner() {
    const params: any = {};
    params.docType = 'Owner';
    params.aliasOrg = 'Producer';
    // this.sandbox.getOwner(params);
    // this.sandbox.getOwner$.subscribe((res) => {
    //   if (res.status === 1) {
    //     this.ownerData = res.data.map((val) => ({
    //       ...val,
    //       ownerName: val.Data.Name,
    //     }));
    //   }
    // });
  }

  getDetailPage() {
    const param: any = {};
    param.ftlcId = this.datasssss;
    // this.sandbox.detailProduct(param);
    // this.sandbox.detailProduct$.subscribe((vall) => {
    //   if (vall.status === 1) {
    //     this.userId = vall?.data?.UserId;
    //     this.userName = vall?.data?.UserName;
    //     this.productTypeId = vall?.data?.Data?.ProductTypeId;
    //     this.productTypeName = vall?.data?.Data?.ProductType;
    //     this.loginForm.controls['productName']?.setValue(
    //       vall?.data?.Data?.ProductName
    //     );
    //     this.loginForm.controls['productType']?.setValue(
    //       vall?.data?.Data?.ProductType
    //     );
    //     this.loginForm.controls['ownerName']?.setValue(vall?.data?.ParentId);
    //     this.loginForm.controls['Producer']?.setValue(vall?.data?.UserName);
    //     this.loginForm.controls['dateOfApplication']?.setValue(
    //       vall?.data?.Data?.DateOfApplication
    //     );
    //     this.loginForm.controls['Unit']?.setValue(vall?.data?.Data?.Unit);
    //     this.loginForm.controls['Quantity']?.setValue(
    //       vall?.data?.Data?.Quantity
    //     );
    //     this.loginForm.controls['location']?.setValue(
    //       vall?.data?.Data?.Location
    //     );
    //     this.loginForm.controls['productDescription']?.setValue(
    //       vall?.data?.Data?.ProductDescription
    //     );
    //     this.imagecropbind = vall?.data.Data.Image;
    //     vall?.data?.Data?.File.forEach((element) => {
    //       this.uploadfile = true;
    //       let obj = {
    //         fileName: element.FileOrgName,
    //         fileData: '',
    //         fileSize: element.FileSize,
    //         fileDate: element.FileDate,
    //         spinner: false,
    //       };
    //       this.base64DataArray.push(obj);
    //     });
    //     this.dummyfilearr = this.base64DataArray;
    //   }
    // });
  }

  onFilecropSelected(event: any) {
    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/jpg',
      '.jpg',
      '.png',
      '.jpeg',
    ];
    const fileName = event.target.files;
    for (const file of fileName) {
      if (!allowedTypes.includes(file.type)) {
        const filenamess = file.name; // 'Food Traze 13-08-2024.zip'
        const parts = filenamess.split('.');
        this.toastr.error(
          `File type .${parts[1]} is not allowed. Only PNG, JPG, JPEG files are accepted.`
        );
        return;
      }
    }

    this.uploadfilecrop = true;
    const files: FileList = event.target.files;
    this.filess = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const file: File = files[i];
      const reader = new FileReader();
      const fileDetails = {
        ImageName: file.name,
        type: file.type,
        ImageSize: this.bytesToMB(file.size) + 'mb',
        url: URL.createObjectURL(file),
        imageData: '',
        ImageDate: new Date(),
        isSpinner: false, // add isSpinner property and set it to true
      };
      this.imagecropbind.push(fileDetails);
      reader.onload = () => {
        fileDetails.imageData = reader.result as string; // base64 encoded string
        fileDetails.isSpinner = false; // set isSpinner to false when file has been read
      };
      reader.readAsDataURL(file); // read file as base64 encoded string
    }
  }
  bytesToMB(bytes: number): number {
    return +(bytes / (1024 * 1024)).toFixed(2);
  }

  closecrop(i:any, val:any) {
    if (!val) {
      const params: any = {};
      params.type = 'Image';
      params.index = i.toString();
      params.id = this.datasssss;
      this.imagecropbind[i].isSpinner = true;
      // this.sandbox.ImgFileDelete(params);
      // this.sandbox.ImgFileDelete$.subscribe((val) => {
      //   if (val.status == 1 && val.data == true) {
      //     this.imagecropbind.splice(i, 1);
      //     this.imagecropbind[i].isSpinner = false;
      //   }
      // });
    } else {
      this.imagecropbind.splice(i, 1);
    }
  }

  private initializeForm(): void {
    this.loginForm = this.fb.group({
      productName: [
        '',
        [Validators.required],
      ],
      productType: [
        null,
        [Validators.required],
      ],
      Producer: [
        null,
        [Validators.required],
      ],
      ownerName: [
        null,
        [Validators.required],
      ],
      Quantity: [null],
      dateOfApplication: [''],
      productDescription: [''],
      location: [''],       
      Unit: [null],
    });
    this.loginForm.controls['Producer'].disable();
  }

  producerSelect(e:any) {
    this.loginForm.controls['Producer']?.setValue(e?.UserName);
    this.accesssss.forEach((res:any) => {
      if (res.name == e.UserName) {
        this.userId = res.id;
        this.userName = res.name;
      };
    });
  }

  productTypes(event: any) {
    this.productTypeId = event.id;
    this.productTypeName = event.assetName;
  }

  onFileSelected(event: any) {
    const allowedTypes = ['.doc', '.pdf', '.docx'];
    const docName = event.target.files;

    for (const file of docName) {
      const fileType = file.name.split('.').pop()?.toLowerCase(); // Extract file extension

      if (!allowedTypes?.includes(`.${fileType}`)) {
        const documentnamess = file.name; // 'Food Traze 13-08-2024.zip'
        const document = documentnamess.split('.');

        this.toastr.error(
          `File type .${document[1]} is not allowed. Only .doc, .docx, .pdf files are accepted.`
        );
        return;
      }
    }

    this.uploadfile = true;
    const selectedFiles: FileList = event.target.files;
    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      this.files.push(file);
      this.uploadProgress[file.name] = true;
      this.convertToBase64(file);
    }
  }

  convertToBase64(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64Data = reader.result as string;
      this.base64DataArray.push({
        fileName: file.name,
        fileData: base64Data,
        fileSize: '434 mb',
        fileDate: new Date(),
        spinner: false,
      });
      this.uploadProgress[file.name] = false;
    };
    reader.onerror = (error) => {
      console.error('Error: ', error);
      this.uploadProgress[file.name] = false;
    };
  }

  close(i:any) {
    if (['', null, undefined].includes(this.base64DataArray[i].fileData)) {
      const params: any = {};
      params.type = 'File';
      params.index = i.toString();
      params.id = this.datasssss;
      this.base64DataArray[i].spinner = true;
      // this.sandbox.ImgFileDelete(params);
      // this.sandbox.ImgFileDelete$.subscribe((val) => {
      //   if (val.status == 1 && val.data == true) {
      //     this.base64DataArray.splice(i, 1);
      //     this.base64DataArray[i].spinner = false;
      //   }
      // });
    } else {
      this.base64DataArray.splice(i, 1);
    }
  }

  // file download
  fileDownload(data: any) {
    const params = {
      filePath: data.FilePath,
      fileName: data.FileName,
    };
    // this.sandbox.FileDownload(params);
    // this.sandbox.FileDownload$.subscribe({
    //   next: (res) => this.downloadFile(res, data.FileName),
    //   error: (error) => console.error('Download error:', error),
    // });
  }
  private downloadFile(blob: Blob, fileName: string) {
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
    window.URL.revokeObjectURL(link.href);
  }
  //

  save() {
    this.submitted = true;
    if (!this.loginForm.valid) {
      return;
    }

    let changeForm:any = [];
    this.imagecropbind.forEach((ee:any) => {
      if (ee?.imageData) {
        let val = {
          imageName: ee.ImageName,
          imageData: ee.imageData,
          imageSize: ee.ImageSize,
          imageDate: ee.ImageDate,
        };
        changeForm.push(val);
      }
    });
    const dateApplication = this.loginForm.value['dateOfApplication']
      ? moment(this.loginForm.value['dateOfApplication']).format('YYYY-MM-DD')
      : '';
    let newFile = this.base64DataArray.filter((ele) => ele.fileData != '');
    let shippingdetails: any = {
      ftlcId: this.datasssss ? this.datasssss : '',
      aliasOrg: 'Producer',
      eventType: '',
      docType: 'Product',
      header: {
        UnixTimeStamp: '1725898334',
        deviceInfo:
          '{"ip":"202.21.47.57, 172.71.124.205","browser":"Chrome 115.0.0","os":"Linux 0.0.0","device":"Other 0.0.0"}',
        eventWhen: '2024-10-30 10:42:14',
        eventWhere: 'Tiruvannamalai, Tamil Nadu, 606600, India',
        eventWhy: 'Creating Fertilizer',
        latitude: '12.2319301',
        longitude: '79.0751529',
      },
      data: {
        ProductName: this.loginForm.value.productName,
        ProductType: this.productTypeName,
        ProductTypeId: this.productTypeId,
        DateOfApplication: dateApplication,
        Image: Object.keys(changeForm).length > 0 ? changeForm : [],
        File: Object.keys(newFile).length > 0 ? newFile : [],
        ProductDescription: this.loginForm.value.productDescription,
        Quantity:this.loginForm.value.Quantity,
        Location: this.loginForm.value.location,
        "Unit": this.loginForm.value.Unit
      },
      userId: this.userId,
      userName: this.userName,
      parentId: this.loginForm.value.ownerName,
      status: 'Created',
      isAccept: '1',
    };
    // this.sandbox.createProduct(shippingdetails);
    // this.sandbox.createProduct$.subscribe((val) => {
    //   if (val && val?.status == 1 && val.data == true) {
    //     this.router.navigate(['/Admin/Producer/productList']);
    //   }
    // });
  }
}
