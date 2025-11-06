import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { sheredModule } from '../../../../../shared/shered.module';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-producer-owner-add',
  standalone: true,
  imports: [sheredModule],
  templateUrl: './producer-owner-add.component.html',
  styleUrl: './producer-owner-add.component.scss'
})
export class ProducerOwnerAddComponent implements OnInit {
  maxDate = new Date();
  loginForm: any
  submitted: boolean = false;
  datasssss!: string;
  fertilizedName: any;
  imageUrl = '';
  accesssss: any = [];
  listData: any;
  userId: any;
  userName: any;
  uploadfile: boolean = false;
  fileSelected: boolean = false;
  fileDetails: any = {};
  filess: any;
  base64Data: string = '';
  imageddddds: any = [];
  imagedatas: any = []
  imagebind: any = [];
  filebind: any = [];
  logobind: any = [];
  title = 'Create Owner';
  admin!: string;
  id: any;
  editname = null;
  newobj: any = {};
  error: any;
  latAdress: any;
  filebind1: any = [];

  constructor( 
    private toastr: ToastrService,
    private titleService: Title, 
    public router: Router, 
    private modal: NgbModal, 
    private route: ActivatedRoute, 
    private fb: FormBuilder, 
    public toaster: ToastrService,
    @Inject(PLATFORM_ID) private platformId: Object 
  ) { }

  // ngOnInit(): void {
  //   this.initializeForm();
  //   this.route.queryParams.subscribe((val: any) => {
  //     if (val?.name) {
  //       this.editname = val.name;
  //       // this.getDetailPage();
  //     }
  //   })
  //   if (!['', null, undefined].includes(this.editname)) {
  //     this.title = 'Edit Owner';
  //     this.getDetailPage();
  //   }
  //   this.admin = sessionStorage.getItem('userList')!;
  //   this.titleService.setTitle(`${this.title} : FoodTraze ${this.admin}`);
  //   this.getMail();
  // }
  ngOnInit(): void {
  this.initializeForm();

  this.route.queryParams.subscribe((val: any) => {
    if (val?.name) {
      this.editname = val.name;
    }
  });

  if (!['', null, undefined].includes(this.editname)) {
    this.title = 'Edit Owner';
    this.getDetailPage();
  }

  // ✅ Fix: Only access sessionStorage in browser
  if (isPlatformBrowser(this.platformId)) {
    this.admin = sessionStorage.getItem('userList') ?? '';
    this.titleService.setTitle(`${this.title} : FoodTraze ${this.admin}`);
  } else {
    // SSR fallback — avoid crash
    this.admin = '';
    this.titleService.setTitle(this.title);
  }

  this.getMail();
}


  getCurrentLocation(): void {
    // this.geolocationService.getCurrentLocation()
    //   .then(position => {
    //     this.latAdress = position.address;
    //     this.newobj.latitude = position.latitude,
    //       this.newobj.longitude = position.longitude,
    //       this.newobj.address = this.latAdress?.display_name
    //   })
    //   .catch(err => {
    //     this.error = err.message;
    //   });
  }

  getMail() {
    const params: any = {};
    params.aliasOrg = "Producer";
    params.status = 1;
    // this.shippingsandbox.login(params)
    // this.shippingsandbox.login$.subscribe(vall => {
    //   this.accesssss = vall.data
    // })
  }

  private initializeForm(): void {
    this.loginForm = this.fb.group({
      ownerName: ['', [Validators.required]],
      Producer: [null,[Validators.required]],
      category: ['',[Validators.required]],
      phoneNumber: ['', [Validators.required,Validators.pattern(/^[0-9]{10}$/)]],
      dateOfApplication: [''],
      location:  [''],
      Description: [''],

    });
  }

  getDetailPage() {
    const param: any = {}
    param.ftlcId = this.editname;
    // this.sandbox.detailOwner(param);
    // this.sandbox.detailOwner$.subscribe(res => {
    //   if (res.status == 1) {
    //     this.userId = res?.data?.UserId;
    //     this.userName = res?.data?.UserName;
    //     const producerName = this.accesssss?.find(res => res.id == this.userId);
    //     this.loginForm.controls['ownerName']?.setValue(res?.data?.Data.Name);
    //     this.loginForm.controls['phoneNumber']?.setValue(res?.data?.Data.Mobile);
    //     this.loginForm.controls['category']?.setValue(res?.data?.Data?.Category);
    //     this.loginForm.controls['dateOfApplication']?.setValue(res?.data?.Data?.DateOfApplication);
    //     this.loginForm.controls['location']?.setValue(res?.data?.Data?.Location);
    //     this.loginForm.controls['Description']?.setValue(res?.data?.Data?.Description);
    //     this.loginForm.controls['Producer']?.setValue(producerName.name || null);
    //     this.imagebind = res?.data?.Data?.Image;
    //     this.filebind = res?.data?.Data?.File;
    //   }
    // })
  }



  maildetail(event: any) {
    this.userId = event.id;
    this.userName = event.name
  }

  onFileSelected(event: any) {
    const  allowedTypes = ["image/jpeg", "image/png", "image/jpg",".jpg",".png",".jpeg"];
    const fileName = event.target.files;
    for (const file of fileName) {
      if (!allowedTypes.includes(file.type)) {
        const filenamess = file.name; // 'Food Traze 13-08-2024.zip'
        const parts = filenamess.split('.');
        this.toastr.error(`File type .${parts[1]} is not allowed. Only PNG, JPG, JPEG files are accepted.`);
        return;
      }
    }
  
    this.uploadfile = true;
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
        isSpinner: false // add isSpinner property and set it to true
      };
      this.imagebind.push(fileDetails);
    
      reader.onload = () => {
        fileDetails.imageData = reader.result as string; // base64 encoded string
        fileDetails.isSpinner = false; // set isSpinner to false when file has been read
      
      };
      reader.readAsDataURL(file); // read file as base64 encoded string
      this.imagedatas = this.imagebind
    }
  }


  onFileSelectedLogo(event: any) {
    const  allowedTypes = ["image/jpeg", "image/png", "image/jpg",".jpg",".png",".jpeg"];
    const fileName = event.target.files;
    for (const file of fileName) {
      if (!allowedTypes.includes(file.type)) {
        const filenamess = file.name; // 'Food Traze 13-08-2024.zip'
        const parts = filenamess.split('.');
     
        this.toastr.error(`File type .${parts[1]} is not allowed. Only PNG, JPG, JPEG files are accepted.`);
        return;
      }
    }
   
    this.uploadfile = true;
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
        isSpinner: false // add isSpinner property and set it to true
      };
      this.logobind?.push(fileDetails);
    
      reader.onload = () => {
        fileDetails.imageData = reader.result as string; // base64 encoded string
        fileDetails.isSpinner = false; // set isSpinner to false when file has been read
      
      };
      reader.readAsDataURL(file); // read file as base64 encoded string
      this.imagedatas = this.logobind
    }
  }

  onSelected(event: any) {
    const allowedTypes = [".doc", ".pdf", ".docx"];
    const docName = event.target.files;
  
    for (const file of docName) {
      const fileType = file.name.split('.').pop()?.toLowerCase(); // Extract file extension

      if (!allowedTypes?.includes(`.${fileType}`)) {
        this.toastr.error(`File type ${fileType} is not allowed. Only .doc, .docx, .pdf files are accepted.`);
        return;
      }
    }
   
    this.uploadfile = true;
    const files: FileList = event.target.files;
    this.filess = event.target.files;
   
    for (let i = 0; i < files.length; i++) {
      const file: File = files[i];
      const reader = new FileReader();
      const fileDetailss = {
        FileName: file.name,
        type: file.type,
        FileSize: this.bytesToMB(file.size) + 'mb',
        url: URL.createObjectURL(file),
        fileData: '',
        FileDate: new Date(),
        isSpinner: false // add isSpinner property and set it to true
      };
      this.filebind.push(fileDetailss);
      reader.onload = () => {
        fileDetailss.fileData = reader.result as string; // base64 encoded string
        fileDetailss.isSpinner = false; // set isSpinner to false when file has been read
        
      };
      reader.readAsDataURL(file); // read file as base64 encoded string
      this.imagedatas = this.imagebind
    }
  }

  bytesToMB(bytes: number): number {
    return +(bytes / (1024 * 1024)).toFixed(2);
  }

  close(i:any, val:any) {
    if (!val) {
      const params: any = {};
      // params.status = 'image';
      params.type = 'Image';
      params.index = i.toString();
      params.id = this.editname;
      this.imagebind[i].isSpinner = true
      // this.sandbox.ImgFileDelete(params);
      // this.sandbox.ImgFileDelete$.subscribe(val => {
      //   if(val.status == 1 && val.data == true){
      //     this.imagebind.splice(i, 1);
      //     this.imagebind[i].isSpinner = false;
      //   }
      //  });
    }
    else{
      this.imagebind.splice(i, 1);
    }

  }



  closefile(i:any, val:any) {
    if (!val) {
      const params: any = {};
      params.type = 'File';
      params.index = i.toString();
      params.id = this.editname;
      this.filebind[i].isSpinner = true
      // this.sandbox.ImgFileDelete(params);
      // this.sandbox.ImgFileDelete$.subscribe(val => {
      //   if(val.status == 1 && val.data == true){
      //     this.filebind.splice(i, 1);
      //     this.filebind[i].isSpinner = false;
      //   }
      //  });
    }
    else{
      this.filebind.splice(i, 1)
    }
  }

  convertToBase64() {
    const reader = new FileReader();
    reader.readAsDataURL(this.filess);
    reader.onload = () => {
      this.base64Data = reader.result as string;
    
      const obj = {
        imageName: this.filess.name,

        imageData: this.base64Data,

      }
      this.imageddddds.push(obj);
    };
    reader.onerror = (error) => {
      console.error('Error: ', error);
    };
  }

 // file download
  fileDownload(data: any) {
    const params = {
      filePath: data.FilePath,
      fileName: data.FileName
    };
    // this.sandbox.FileDownload(params);
    // this.sandbox.FileDownload$.subscribe( {
    //   next: (res) => this.downloadFile(res, data.FileName),
    //   error: (error) => console.error('Download error:', error)
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
    this.loginForm.value.EventWhen = moment().format("YYYY-MM-DDTHH:mm:ss[Z]")
    this.submitted = true;
    if(!this.loginForm.valid){
      return;
    }

    let changeForm:any = [];
    this.imagebind.forEach((ee:any) => {
      if (ee?.imageData) {
        let val = {
          imageName: ee.ImageName,
          imageData: ee.imageData,
          imageSize: ee.ImageSize,
          imageDate: ee.ImageDate
        }
        changeForm.push(val);
      }
    })

    let fileForm:any = [];
    this.filebind.forEach((ee:any) => {
      if (ee?.fileData) {
        let val = {
          fileName: ee.FileName,
          fileData: ee.fileData,
          fileSize: ee.FileSize,
          fileDate: ee.FileDate
        }
        fileForm.push(val);
      }
    })

    let logoForm = [];
    this.logobind.forEach((ee:any) => {
      if (ee?.imageData) {
        let val = {
          imageName: ee.ImageName,
          imageData: ee.imageData,
          imageSize: ee.ImageSize,
          imageDate: ee.ImageDate
        }
        logoForm.push(val);
      }
    })

    let params : any ={
      "ftlcId": this.editname ? this.editname : "",
      "aliasOrg": "Producer",
      "eventType": "",
      "docType": "Owner",
      "header": {
                "UnixTimeStamp": "1725898334",
                "deviceInfo": "{\"ip\":\"202.21.47.57, 172.71.124.205\",\"browser\":\"Chrome 115.0.0\",\"os\":\"Linux 0.0.0\",\"device\":\"Other 0.0.0\"}",
                "eventWhen": "2024-10-30 10:42:14",
                "eventWhere": "Tiruvannamalai, Tamil Nadu, 606600, India",
                "eventWhy": "Creating Fertilizer",
                "latitude": "12.2319301",
                "longitude": "79.0751529"
            },
    "data": {
            "Name": this.loginForm.value.ownerName,
            "Mobile":  this.loginForm.value.phoneNumber.toString(),
            "Category": this.loginForm.value.category,
            "DateOfApplication": this.loginForm.value["dateOfApplication"] ?  moment(this.loginForm.value["dateOfApplication"]).format('YYYY-MM-DD') : '',
            "Image": Object.keys(changeForm).length > 0 ? changeForm : [],
            "File": Object.keys(fileForm).length > 0 ? fileForm : [],
            "Description": this.loginForm.value.Description,
            "Location": this.loginForm.value.location
        },
    "userId":this.userId,
    "userName":this.userName,
    "parentId":"",
    "status":"Created",
    "isAccept":"1"
    }
    // this.sandbox.createOwner(params);
    // this.sandbox.createOwner$.subscribe(val => {
    //   if (val && val?.status == 1 && val.data == true) {
    //         this.router.navigate(['/Admin/Producer/ownerList']);
    //       }
    // })
  }

}

function elseif(arg0: boolean) {
  throw new Error('Function not implemented.');
}

