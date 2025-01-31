import { Component } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  dishes: any[] = [];
  searchDishForm: FormGroup;

  constructor(private adminService: AdminService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ){}

  ngOnInit(){
    this.getAllDishes();
    this.searchDishForm = this.fb.group({
      title: [null, [Validators.required]]
    });
  }

  getAllDishes(){
    this.dishes = [];
    this.adminService.getAllDishes().subscribe(res => {
      res.forEach(element => {
        element.processedImg = 'data:image/jpeg;base64,' + element.byteImg;
        this.dishes.push(element);
      });
      console.log(this.dishes);
    })
  }

  submitForm(){
    this.dishes = [];
    const title = this.searchDishForm.get('title')!.value;
    this.adminService.getAllDishesByName(title).subscribe(res => {
      res.forEach(element => {
        element.processedImg = 'data:image/jpeg;base64,' + element.byteImg;
        this.dishes.push(element);
      });
      console.log(this.dishes);
    })
  }

  deleteDish(dishId: any){
    this.adminService.deleteDish(dishId).subscribe(res => {
      if (res?.body == null){
        this.snackBar.open('Dish Deleted Successfully', 'Close', {
          duration: 5000,
        })
        this.getAllDishes();
      }else{
        this.snackBar.open(res.message, 'Close', {
          duration: 5000,
          panelClass: 'error-snackbar'
        });
      }
    })
  }
}
