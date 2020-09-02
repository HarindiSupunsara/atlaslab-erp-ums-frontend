import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { AlertComponent } from 'src/app/view/theme/alert/alert.component';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';

export const FOMAT_1 = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: []
})
export class HomeComponent implements OnInit {

  permissions:string[] = new Array();

  constructor( private dialog:MatDialog) {
   
  }

  ngOnInit() {
   
  }

  
  alert(title: string, message: string, type: string) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: 1,
      title: title,
      message: message,
      type: type
    };

    const dialogRef = this.dialog.open(AlertComponent, dialogConfig);

  }

}

