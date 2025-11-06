import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { sheredModule } from '../../../../../shared/shered.module';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';


export function passwordStrengthValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (!value) {
    return null; // Don't return any errors if the field is empty (handled by required validator)
  }

  const hasUpperCase = /[A-Z]/.test(value);
  const hasNumber = /\d/.test(value);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);

  const errors: ValidationErrors = {};

  if (!hasUpperCase) {
    errors['uppercase'] = 'Password must contain at least one uppercase letter';
  }

  if (!hasNumber) {
    errors['number'] = 'Password must contain at least one number';
  }

  if (!hasSpecialChar) {
    errors['specialChar'] = 'Password must contain at least one special character';
  }

  return Object.keys(errors).length ? errors : null;
}

@Component({
  selector: 'app-producer-user-add',
  standalone: true,
  imports: [sheredModule],
  templateUrl: './producer-user-add.component.html',
  styleUrl: './producer-user-add.component.scss'
})
export class ProducerUserAddComponent implements OnInit{

  actives: any = 1;
  id: any;
  websitekey: any;
  submitted!: boolean;
  loginForm: any;
  aliasOrg!: any;
  editId!: any;
  emailName: any;
  title='Create Producer';         
  admin!: any;  
  subscriptions: Subscription = new Subscription();
  methos = [
    { id: 1, name: "Glass" },
    { id: 2, name: "Plastic" },
    { id: 3, name: "Kraft Paper" },
    { id: 4, name: "Metal" },
    { id: 5, name: "Corrugated boxes" },
    { id: 6, name: "Aluminum" },
    { id: 7, name: "Cardboard" },
    { id: 8, name: "Paperboard" },
  ];
  base64Data!: any;
  filess!: Blob;
  imageOrgName!: any;
  uploadfile: boolean = false;
  updated: boolean = false;
  countryList: any=[];
  stateList: any=[];
  cityList: any=[];
  newobj :any={};
  error:any;
latAdress:any;
// imageUrl = environment.imageUrl;
imageUrl = '';
hidePassword: boolean = true;
ConhidePassword:boolean = true;
isEnable=true;
countrySelectId!: number;


  constructor ( 
    private toastr: ToastrService,
    private titleService:Title,
    private translate: TranslateService,
    public router: Router, 
    private route: ActivatedRoute, 
    private fb: FormBuilder, 
    public toaster: ToastrService, 
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  // ngOnInit(): void {
         
  //   this.initializeForm();
  //   const filter = this.route.snapshot.queryParamMap.get('name');
  //   this.aliasOrg = filter
  //   const editIds = this.route.snapshot.queryParamMap.get('editId');
  //   if(editIds){
  //     this.loginForm.get('Password').clearValidators();
  //     this.loginForm.get('Password').updateValueAndValidity();
  //   }
  //   this.editId = editIds;
  
  //   if(!['',null,undefined].includes(this.editId)){
  //     this.title='Edit Producer'; 
  //     // sessionStorage.setItem('identityId', this.editId)
  //     this.getdetails()
  //   }
  //   this.getCountryList();
  //   // this.subscriptions.add(this.sandbox.Editvalues$.subscribe(val => {
  //   //   if (val?.status == 1) {
  //   //     this.websitekey = val?.data?.AccessApiKey
  //   //   }
  //   // }));
  //   this.admin = sessionStorage.getItem('userList')
  //   this.titleService.setTitle(`${this.title} : FoodTraze ${this.admin}`);
  //   this.getCurrentLocation();
  // }
  ngOnInit(): void {
  this.initializeForm();

  const filter = this.route.snapshot.queryParamMap.get('name');
  this.aliasOrg = filter;
  const editIds = this.route.snapshot.queryParamMap.get('editId');

  if (editIds) {
    this.loginForm.get('Password').clearValidators();
    this.loginForm.get('Password').updateValueAndValidity();
  }

  this.editId = editIds;

  if (!['', null, undefined].includes(this.editId)) {
    this.title = 'Edit Producer';
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.setItem('identityId', this.editId);
    }
    this.getdetails();
  }

  this.getCountryList();

  // ✅ FIXED — only access sessionStorage in browser
  if (isPlatformBrowser(this.platformId)) {
    this.admin = sessionStorage.getItem('userList');
  } else {
    this.admin = ''; // fallback for SSR
  }

  this.titleService.setTitle(`${this.title} : FoodTraze ${this.admin}`);
  this.getCurrentLocation();
}

  getuser(newstep: any) {
    if ((newstep < 3) || (newstep == 3 && this.loginForm.valid)) {
      this.actives = newstep;
      this.emailName = this.loginForm.value.email;
    }
    // else {
    //   this.toaster.error("please Fill the User Details");
    // }
  }

  getCurrentLocation(): void {
    // this.geolocationService.getCurrentLocation()
    //   .then(position => {
     
    //     this.latAdress = position.address;
        
    //     this.newobj.latitude = position.latitude,
    //     this.newobj.longitude = position.longitude,
    //     this.newobj.address= this.latAdress?.display_name


  

    //   })
    //   .catch(err => {
    //     this.error = err.message;
    //   });
  }
  

  getdetails(): void {
    // this.sandbox.Editvalues(this.editId)
    // this.subscriptions.add(this.sandbox.Editvalues$.subscribe(val => {
      // if (val?.status == 1) {
        
    //     this.loginForm.controls['name']?.setValue(val?.data?.name)
    //     this.loginForm.controls['email']?.setValue(val?.data?.email)
    //     this.loginForm.controls['phoneNumber']?.setValue(val?.data?.phoneNumber)
    //     this.loginForm.controls['address1']?.setValue(val?.data?.address1)
    //     this.loginForm.controls['address2']?.setValue(val?.data?.address2)
    //     this.loginForm.controls['country']?.setValue(val?.data?.country)
    //     this.loginForm.controls['state']?.setValue(val?.data?.state)
    //     this.loginForm.controls['city']?.setValue(val?.data?.city)
    //     this.loginForm.controls['postalCode']?.setValue(val?.data?.postalCode)
    //     this.loginForm.controls['Password']?.setValue('xxxxxxxxxxx')
    //     this.loginForm.controls['Confirm']?.setValue('xxxxxxxxxxx')
    //     this.loginForm.controls['status']?.setValue(val?.data?.isActive == 1)
    //     // this.loginForm.controls['aliasOrg']?.setValue(val?.data?.title);
    //     this.subscriptions.add(this.MultiSandbox.getCountry$.subscribe(res=>{
    //       if(res && res.status == 1 && Object.keys(res).length > 0){
    //         this.countrySelectId = res?.data?.find(obj => obj?.name == val?.data?.country)?.id;
    //       }
    //     }));
    //     if ((!['',null,undefined].includes(val?.data?.imagePath)) && (!['',null,undefined].includes(val?.data?.imageName)) ) {
    //       this.uploadfile = true;
    //       this.base64Data =this.imageUrl+"?filePath="+val?.data?.imagePath+"&fileName="+val?.data?.imageName;
    
    //     }
       
      
    //     this.id = val?.data?.id;
    //     this.getCountryList();
    //   }
    // }));
  }
  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }


  togglePasswordVisibilityConfirm(): void {
    this.ConhidePassword = !this.ConhidePassword;
  }

  private initializeForm(): void {
    this.loginForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{3,4}$')]],
      phoneNumber: ['', [Validators.required,Validators.pattern(/^[0-9]{10}$/)]],
      address1: ['', [Validators.required]],
      address2: [''],
      country: [null, ],
      state: [null,],
      city: [null, ],
      postalCode: ['', [Validators.required,Validators.pattern(/^[1-9][0-9]{5}$/)  ],],
      // Password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/)]],
      Password: ['', [
        Validators.required,
        Validators.minLength(8),
        passwordStrengthValidator
      ]],
      Confirm: ['', [Validators.required]],
      status: [false]
    });
    this.loginForm.get('state')?.disable();
    this.loginForm.get('city')?.disable();

    setTimeout(() => {
      this.isEnable = false;
    }, 1000);
    
  }
 

  getCountryList(){
    const params: any = {};
    // this.MultiSandbox.getCountry(params)
    // this.subscriptions.add(this.MultiSandbox.getCountry$.subscribe(vall => {
    
    //   this.countryList = vall?.data?.sort((a,b)=> a.name.localeCompare(b.name));
    //   this.countryList?.forEach(element => {
    //     if(element.name == this.loginForm.value.country){
    //       this.getStateList(element.id);
    //     }
    //   });
      
    // }));
  }

  countryDetail(even:any){
    this.countrySelectId = even.id;
    this.getStateList(even.id);
    this.loginForm.controls['state']?.setValue(null);
    this.loginForm.controls['city']?.setValue(null);

  }



  getStateList(id:any){
    const params: any = {};
    params.countryId = id;
    // this.MultiSandbox.getState(params)
    // this.subscriptions.add(this.MultiSandbox.getState$.subscribe(vall => {
    // if(vall){
    //   this.stateList = vall?.data?.sort((a,b)=> a.name.localeCompare(b.name));
    //   this.loginForm.get('state')?.enable();
    //   this.stateList?.forEach(element => {
    //     if(element.name == this.loginForm.value.state){
    //       this.getCityList(element.id);
    //     }
    //   });
    // }
    // }));
  }

  stateDetail(evet:any){
    this.getCityList(evet.id);
    this.loginForm.controls['city']?.setValue(null);
  }

    getCityList(id:any){
      const params: any = {};
      params.stateId = id;
      params.countryId = this.countrySelectId;
    // this.MultiSandbox.getCity(params);
    // this.subscriptions.add(this.MultiSandbox.getCity$.subscribe(vall => {
    // if(vall){
    //   this.cityList = vall?.data?.sort((a,b)=> a.name.localeCompare(b.name));
    //   this.loginForm.get('city')?.enable();
    // }
    // }));
  }



  removeImage(){
    this.imageOrgName = '';
    this.base64Data = '';
    this.uploadfile = false;

  }
  onProfileImageChange(event: any) {
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
    this.updated = true;
    const file: File = event.target.files[0];
    this.filess = event.target.files[0]
    this.imageOrgName = file.name

this.convertToBase64();
   
  }

  convertToBase64() {
    const reader = new FileReader();
    reader.readAsDataURL(this.filess);
    reader.onload = () => {
      this.base64Data = reader.result as string;
    
     
    };
    reader.onerror = (error) => {
      console.error('Error: ', error);
    };

     
  }

  save() {
    this.submitted = true;
  
    let shareImg = this.base64Data ? JSON.parse(JSON.stringify(this.base64Data)) : "";
    if(this.updated == false){
      this.imageOrgName = '';
      shareImg = '';
    }
  
    
    if (this.loginForm.valid) {
      const data:any = {
        "name": this.loginForm.value.name,
        "email": this.loginForm.value.email,
        "address1": this.loginForm.value.address1,
        "address2": this.loginForm.value.address2,
        "phoneNumber": this.loginForm.value.phoneNumber,
        "country": this.loginForm.value.country,
        "state": this.loginForm.value.state,
        "city": this.loginForm.value.city,
        "postalCode": this.loginForm.value.postalCode,
        "password": this.loginForm.value.Confirm.includes('xxxxxxxxxxx') ? '' : this.loginForm.value.Confirm,
        "aliasOrg": 'Producer',
        "imageOrgName":this.imageOrgName,
        "imageData":shareImg,
        'status': this.loginForm.value?.status == true ? 1 : 0,
        "identityId": this.editId,
        "id": this.editId,
      }
      if(!this.uploadfile && !this.imageOrgName && !shareImg){
        data['removeImage'] = "1"
      }
      // this.sandbox.userCreate(data)
      // this.subscriptions.add(this.sandbox.userCreate$.subscribe(val => {
      //   if (val?.status == 1) {
      //     this.router.navigate(['/Admin/Producer/userList']);
      //   }
      // }));
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
