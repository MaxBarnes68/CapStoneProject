import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-post-dish',
  standalone: false,
  
  templateUrl: './post-dish.component.html',
  styleUrl: './post-dish.component.scss'
})
export class PostDishComponent {
  dishForm!: FormGroup;
  listOfCategories: any[];
  selectedFile: File | null;
  imagePreview: string | ArrayBuffer | null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private adminService: AdminService
  ) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.previewImage();
  }

  previewImage() {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    }
    reader.readAsDataURL(this.selectedFile);
  }

  ngOnInit(): void {
    this.dishForm = this.fb.group({
      categoryId: [null, [Validators.required]],
      name: [null, [Validators.required]],
      price: [null, [Validators.required]],
      description: [null, [Validators.required]],
    });
    this.getAllCategories();
  }

  getAllCategories() {
    this.adminService.getAllCategories().subscribe(res=>{
      this.listOfCategories = res;
    });
  }

  addDish(): void {
    if(this.dishForm.valid){
      const formData: FormData = new FormData();
      formData.append('img', this.selectedFile);
      formData.append('categoryId', this.dishForm.get('categoryId').value);
      formData.append('name', this.dishForm.get('name').value);
      formData.append('description', this.dishForm.get('description').value);
      formData.append('price', this.dishForm.get('price').value);

      this.adminService.addDish(formData).subscribe((res) => {
        if(res.id != null){
          this.snackBar.open('Dish added successfully', 'Close', {
            duration: 5000,
          });
          this.router.navigateByUrl('/admin/dashboard');
        }else{
          this.snackBar.open(res.message, 'ERROR', {
            duration: 5000
          });
        }
      })
    }else{
      for(const i in this.dishForm.controls){
        this.dishForm.controls[i].markAsDirty();
        this.dishForm.controls[i].updateValueAndValidity();
      }
    }
  }
}
