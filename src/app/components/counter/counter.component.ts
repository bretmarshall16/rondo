import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ReportPopUpComponent } from '../report-pop-up/report-pop-up.component';
import { error } from 'protractor';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent implements OnInit, OnDestroy {
  // tslint:disable-next-line: no-inferrable-types
  isRunning: boolean = false;
  counter = 0;
  passCount = 0;
  errorCount = 0;
  timerRef: any;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  pass(): void {
    this.startTimer();
    this.passCount++;
  }

  startTimer(): void {
    if (!this.isRunning) {
      const startTime = Date.now() - (this.counter || 0);
      this.timerRef = setInterval(() => {
        this.counter = Date.now() - startTime;
      });
      this.isRunning = true;
    }
  }


  reset(): void {
    this.stop();
    this.counter = 0;
    this.passCount = 0;
    this.errorCount = 0;
  }

  stop(): void {
    this.isRunning = false;
    clearInterval(this.timerRef);
  }

  error(): void {
    this.startTimer();
    this.errorCount++;
  }

  ngOnDestroy() {
    clearInterval(this.timerRef);
  }

  runReport(): void {
    if(this.counter > 0 && this.passCount > 0) {
      const dataX = this.prepareReport();
      console.log(dataX);
      const dialogRef = this.dialog.open(ReportPopUpComponent, {
        disableClose: true,
        data: dataX,
        width: '350px'
      });
    }
  }

  prepareReport(): any {
    this.stop();
    const passesPerMinute = this.passCount / this.counter * 1000 * 60;
    const errorsPerMinute = this.errorCount / this.counter * 1000 * 60;
    return {ppm: passesPerMinute, epm: errorsPerMinute};
  }



}
