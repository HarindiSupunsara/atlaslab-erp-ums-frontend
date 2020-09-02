import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  modalTitle: string;
  modelMessage : string;
  modelType : string;
  id : string;
  modelText: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.modalTitle = data.title;
    this.modelMessage = data.message;
    this.modelType = data.type;
    this.id = data.id;
    if(data.message.text){
      this.modelMessage = data.message.text;
    }
    

    console.log(data)
   }

  ngOnInit() {
  }

}
