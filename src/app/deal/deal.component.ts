import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Deal } from '../models/deal.model';

@Component({
  selector: 'app-deal',
  templateUrl: './deal.component.html',
  styleUrls: ['./deal.component.scss']
})

export class DealComponent implements OnInit {
  public dealForm: FormGroup;
  deal: Deal[];
  token: string;
  tempDealId: number;
  createdClicked = false;

  constructor(private fb: FormBuilder, private data: DataService) { }

  ngOnInit() {
    this.createForm();
    this.data.getDeals().subscribe(data => {
      this.deal = data
      console.log(this.deal)
    })
  }

  getDeals(): void {
    this.data.getDeals()
      .subscribe(Deal => this.deal = Deal)
    console.log(this.deal)
  }

  clickedButton(id) {
    this.createdClicked = !this.createdClicked;
    this.tempDealId = id;
  }

  deleteDeal(id){
    if (sessionStorage.getItem('currentUser') !== null || undefined){
      this.data.deleteDeal(id).subscribe((res: any) => {console.log(res); this.getDeals()})
    }
    else {
      alert('Cannot delete item.')
    };
  }

  createForm() {
    this.dealForm = this.fb.group({
      text: new FormControl(),
      title: new FormControl(),
    })
  }

  onSubmit() {
    console.log(this.dealForm.value)
    this.data.createDeal(this.dealForm.value).subscribe((createPostFromServer) => {
      console.log(createPostFromServer), this.getDeals()
    })
  }
};
