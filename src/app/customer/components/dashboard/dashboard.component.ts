import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
    dishes: any[] = [];
    searchDishForm: FormGroup;
  
    constructor(private customerService: CustomerService,
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
      this.customerService.getAllDishes().subscribe(res => {
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
      this.customerService.getAllDishesByName(title).subscribe(res => {
        res.forEach(element => {
          element.processedImg = 'data:image/jpeg;base64,' + element.byteImg;
          this.dishes.push(element);
        });
        console.log(this.dishes);
      })
    }

    addToCart(id:any){
      
    }
}
