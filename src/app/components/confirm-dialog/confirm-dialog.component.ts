import { Component, Inject, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {
title:string;
message:string;
excuse:string;


constructor(
  public dialogRef: MatDialogRef<ConfirmDialogComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any,
) {
  this.title=data.title;
  this.message=data.message;
}

onNoClick(): void {
  this.dialogRef.close();
}
}
