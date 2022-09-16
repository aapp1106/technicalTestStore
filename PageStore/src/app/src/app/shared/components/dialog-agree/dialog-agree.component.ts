import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-agree',
  templateUrl: './dialog-agree.component.html',
  styleUrls: ['./dialog-agree.component.scss']
})
export class DialogAgreeComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogAgreeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

  close(){
    return this.dialogRef.close();
  }

}
