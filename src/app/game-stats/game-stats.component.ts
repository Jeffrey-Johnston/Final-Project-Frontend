import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Exercise } from '../interfaces/exercise';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-game-stats',
  templateUrl: './game-stats.component.html',
  styleUrls: ['./game-stats.component.css'],
})
export class GameStatsComponent implements OnInit {
  statsPage: boolean = true;
  @Input() darkModeRef!: boolean;
  @Input() exerciseStatsRef!: string;
  @Input() timeStatsRef!: string;
  @Input() cardExercisesRef!: Exercise[];
  @Output() closeEvent = new EventEmitter<void>();
  constructor() {}

  ngOnInit(): void {}

  emitCloseEvent = () => {
    this.statsPage = false;
    this.closeEvent.emit();
  };

  //   pdf method
  //
  convertToPdf = () => {
    var container = document.getElementById('content') as HTMLImageElement;
    html2canvas(container).then((canvas) => {
      // var link = document.createElement('a');
      // document.body.appendChild(link);
      // link.download = 'html_image.png';
      // link.href = canvas.toDataURL('image/png');
      // link.target = '_blank';
      // link.click();
      // Few necessary setting options
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = (canvas.height * imgWidth) / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png');
      let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
      var position = 0;
      pdf.addImage(canvas, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('workout-stats.pdf'); // Generated PDF
    });
  };
}
