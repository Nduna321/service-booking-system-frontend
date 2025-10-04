import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CompanyService} from '../../services/company.service';
import {Router} from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import {NzColDirective, NzRowDirective} from 'ng-zorro-antd/grid';
import {NzFormControlComponent, NzFormDirective} from 'ng-zorro-antd/form';
import {NgIf, NgStyle} from '@angular/common';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzInputDirective} from 'ng-zorro-antd/input';
import {DemoNgZorroAntdModule} from '../../../DemoNgZorroAntdModule';

@Component({
  selector: 'app-create-ad',
  standalone: true,
  imports: [
    NzRowDirective,
    NzFormDirective,
    ReactiveFormsModule,
    NzColDirective,
    NgIf,
    NzButtonComponent,
    NzFormControlComponent,
    DemoNgZorroAntdModule,
    NzInputDirective,
    NgStyle
  ],
  templateUrl: './create-ad.component.html',
  styleUrl: './create-ad.component.css'
})
export class CreateAdComponent {

  selectedFile: File | null;
  imagePreview: string | ArrayBuffer| null;
  validateForm!: FormGroup;


  constructor(private fb: FormBuilder,
              private notification: NzNotificationService,
              private router: Router,
              private companyService: CompanyService) {}

  ngOnInit() {
    this.validateForm = this.fb.group({
      serviceName: [null, [Validators.required]],
      description: [null, [Validators.required]],
      price: [null, [Validators.required]],
    })
  }


  onFileSelected(event: any){
    this.selectedFile = event.target.files[0];
    this.previewImage();
  }

  previewImage(){
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    }
    reader.readAsDataURL(this.selectedFile);
  }


  postAd() {
    // Validate form first
    if (this.validateForm.invalid) {
      this.notification.error('ERROR', 'Please fill in all required fields.', { nzDuration: 5000 });
      return;
    }

    // Ensure an image file is selected
    if (!this.selectedFile) {
      this.notification.error('ERROR', 'Please select an image to upload.', { nzDuration: 5000 });
      return;
    }

    // Prepare FormData for sending both file and text fields
    const formData = new FormData();
    formData.append('img', this.selectedFile);
    formData.append('serviceName', this.validateForm.get('serviceName')?.value || '');
    formData.append('description', this.validateForm.get('description')?.value || '');
    formData.append('price', this.validateForm.get('price')?.value || '');

    // Call the backend service
    this.companyService.postAd(formData).subscribe({
      next: (res) => {
        this.notification.success('SUCCESS', 'Ad Posted Successfully!', { nzDuration: 5000 });
        this.router.navigateByUrl('/company/ads');
      },
      error: (error) => {
        this.notification.error('ERROR', error?.error || 'Failed to post ad.', { nzDuration: 5000 });
      }
    });
  }


  // postAd(){
  //   const formData: FormData = new FormData();
  //
  //   formData.append('img', this.selectedFile);
  //   formData.append('serviceName', this.validateForm.get('serviceName').value);
  //   formData.append('description', this.validateForm.get('description').value);
  //   formData.append('price', this.validateForm.get('price').value);
  //
  //   this.companyService.postAd(formData).subscribe(res => {
  //     this.notification
  //       .success(
  //         'SUCCESS',
  //         `Ad Posted Successfully!`,
  //         {nzDuration: 5000}
  //       );
  //     this.router.navigateByUrl("/company/ads");
  //
  //   }, error => {
  //     this.notification
  //     .error(
  //       'ERROR',
  //       `${error.error}`,
  //       {nzDuration: 5000}
  //     )
  //
  //   })
  // }

}



















