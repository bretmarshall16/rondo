import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as CanvasJS from '../../assets/canvasjs.min';

@Component({
  selector: 'app-report-pop-up',
  templateUrl: './report-pop-up.component.html',
  styleUrls: ['./report-pop-up.component.scss']
})
export class ReportPopUpComponent implements AfterViewInit {
  isHelp = false;


  constructor(
    public dialogRef: MatDialogRef<ReportPopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngAfterViewInit() {
    const chart = new CanvasJS.Chart('chartContainer', {
      animationEnabled: true,
      theme: 'light2',
      title: {
        text: 'Data vs. Time'
      },
      axisX: {
        title: 'Seconds',
      },
      axisY: {
        title: 'Count',
      },
      axisY2: {
        title: 'Percentage',
      },
      legend: {
        verticalAlign: 'top',
        horizontalAlign: 'center',
        dockInsidePlotArea: false,
      },
      data: [{
        type: 'spline',
        showInLegend: true,
        name: 'Passes/Min',
        markerType: 'square',
        color: '#18c747',
        dataPoints: this.data.passData
      },
      {
        type: 'spline',
        showInLegend: true,
        name: 'Error/Min',
        lineDashType: 'dash',
        color: '#f53643',
        dataPoints: this.data.errorData
      },
      {
        type: 'spline',
        axisYType: 'secondary',
        showInLegend: true,
        name: 'Pass %',
        color: '#575aff',
        dataPoints: this.data.percentageData
      }]
    });
    chart.render();
  }

  close(): void {
    this.dialogRef.close();
  }

  help(): void {
    this.isHelp = true;
  }

  closeHelp(): void {
    this.isHelp = false;
  }

}
