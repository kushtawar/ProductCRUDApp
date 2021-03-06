import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ProductService } from '../shared/product.service';
import { Product } from '../shared/product.model';

declare var M: any;


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers: [ProductService]
})

export class ProductComponent implements OnInit {

  public infobutton=false;
  public showdbvalues = false;
  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.resetForm();
    this.refreshProductList();
  }
  resetForm(form?: NgForm){
    console.log("In reset form");
    this.showdbvalues=false;
    this.infobutton=false;
    if (form){
      form.reset();
    }
      this.productService.selectedProduct = {
        _id: "",
        productname: "",
        productassetid: "",
        productweight: "",
        productmanufacturer: ""
      }
    
  }

  onSubmit(form : NgForm){
    if (form.value._id == ""){
    console.log("insubmit");
    this.productService.postProduct(form.value).subscribe((res) => {
      this.resetForm(form);
      this.refreshProductList();
      M.toast({ html: 'Inserted successfully',classes: 'rounded'});
    });
  } else
  {
    console.log("Update Button");
    this.productService.putProduct(form.value).subscribe((res) => {
      this.resetForm(form);
      this.refreshProductList();
      M.toast({ html: 'Updated successfully', classes: 'rounded' });
    });

   
  }
  }
  
  refreshProductList() {
    this.productService.getProductList().subscribe((res) => {
      this.productService.products = res as Product[];
      this.infobutton=false;
    });
  }

    onEdit(prod : Product){
      console.log("inedit");
      this.infobutton=true;
      this.productService.selectedProduct=prod;
    }
    onDelete(_id: string, form: NgForm) {
      if (confirm('Are you sure to delete this record ?') == true) {
        this.productService.deleteProduct(_id).subscribe((res) => {
          this.refreshProductList();
          this.resetForm(form);
          M.toast({ html: 'Deleted successfully', classes: 'rounded' });
        });
      }
    }

    public edited = false;
    msg = "";
    nCnt: number = 0;
    myfunc() {
      this.edited=!this.edited;
        this.nCnt = this.nCnt + 8;
        this.msg = "Clicked: " + this.nCnt;

    }

    showdb() {
this.showdbvalues=true;
    }
}