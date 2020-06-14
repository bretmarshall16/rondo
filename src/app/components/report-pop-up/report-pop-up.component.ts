import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-report-pop-up',
  templateUrl: './report-pop-up.component.html',
  styleUrls: ['./report-pop-up.component.scss']
})
export class ReportPopUpComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ReportPopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close();
  }

}
