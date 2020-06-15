import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ReportPopUpComponent } from '../report-pop-up/report-pop-up.component';
import { error } from 'protractor';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PwaService } from 'src/app/services/pwa.service';

class Data {
  x: number;
  y: number;

  constructor(a: number, b: number) {
    this.x = a;
    this.y = b;
  }
}



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
  xSeconds = 2 * 1000;
  lastRecordTime = 0;
  passDataSet: Data[] = [];
  errorDataSet: Data[] = [];
  percentageDataSet: Data[] = [];



  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    public Pwa: PwaService) { }

  ngOnInit(): void {
  }

  pass(): void {
    this.startTimer();
    this.passCount++;
  }

  startTimer(): void {
    if (!this.isRunning) {
      this.openSnackBar('Timer Started');
      const startTime = Date.now() - (this.counter || 0);
      this.timerRef = setInterval(() => {
        this.counter = Date.now() - startTime;
        this.addData();
      });
      this.isRunning = true;
    }
  }

  addData(): void {
    if (this.shouldAddTime()) {
      const secs = this.getSeconds();
      const x = new Data(secs, this.getPPM());
      const y = new Data(secs, this.getEPM());
      const z = new Data(secs, this.getPassPercentage());
      this.passDataSet.push(x);
      this.errorDataSet.push(y);
      this.percentageDataSet.push(z);
    }
  }

  shouldAddTime(): boolean {
    if (this.counter - this.lastRecordTime > this.xSeconds) {
      console.log('time!');
      this.lastRecordTime = this.counter;
      return true;
    }
    return false;

  }

  getSeconds(): number {
    return this.counter / 1000;
  }

  reset(): void {
    this.stop();
    this.openSnackBar('RESET');
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
    if (this.counter > 0 && this.passCount > 0) {
      const dataX = this.prepareReport();
      console.log(dataX);
      const dialogRef = this.dialog.open(ReportPopUpComponent, {
        disableClose: true,
        data: dataX,
        width: '350px'
      });
    } else {
      this.openSnackBar('Nothing To Report');
    }
  }

  prepareReport(): any {
    this.stop();
    const passesPerMinute = this.getPPM();
    const errorsPerMinute = this.getEPM();
    const completeRate = this.getPassPercentage();
    return {
      ppm: passesPerMinute,
      epm: errorsPerMinute,
      cr: completeRate,
      passData: this.passDataSet,
      errorData: this.errorDataSet,
      percentageData: this.percentageDataSet
    };
  }

  getPPM(): number {
    return this.passCount / this.counter * 1000 * 60;
  }

  getEPM(): number {
    return this.errorCount / this.counter * 1000 * 60;
  }

  getPassPercentage(): number {
    return (this.passCount) / (this.passCount + this.errorCount) * 100;
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'CLOSE', {
      duration: 2000,
    });
  }

  installPwa(): void {
    this.Pwa.promptEvent.prompt();
  }



}
