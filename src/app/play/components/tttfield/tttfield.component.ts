import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GameLogicService, TTTCellState } from '../../services/game-logic.service';

@Component({
  selector: 'app-tttfield',
  templateUrl: './tttfield.component.html',
  styleUrls: ['./tttfield.component.scss']
})
export class TTTFieldComponent implements OnInit {
  @ViewChild('tttCanvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  private eventTimer = 0;

  constructor(private gameLogic: GameLogicService) { }

  ngOnInit(): void {
    this.clearCanvas();
    this.drawField();
    this.drawMarkings();

    this.eventTimer = new Date().getTime();
  }

  click(event: any): void {
    console.log("click");
    if (this.eventTimer < new Date().getTime() - 500) { // Limit incoming events to once every second
      this.eventTimer = new Date().getTime();
      const clientX = event.clientX;
      const clientY = event.clientY;

      if (this.canvas != undefined) {
        const canvasTop = this.canvas.nativeElement.getBoundingClientRect().top;
        const canvasLeft = this.canvas.nativeElement.getBoundingClientRect().left;
        const canvasWidth = this.canvas.nativeElement.getBoundingClientRect().width;
        const canvasHeight = this.canvas.nativeElement.getBoundingClientRect().height;

        const cellWidth = canvasWidth / 3;
        const cellHeight = canvasHeight / 3;

        for (let y = 0; y < 3; y++) {
          for (let x = 0; x < 3; x++) {
            if (clientX >= (canvasLeft + (cellWidth * x)) && clientX < (canvasLeft + (cellWidth * (x + 1))) &&
            clientY >= (canvasTop + (cellHeight * y)) && clientY < (canvasTop + (cellHeight * (y + 1)))) {
              this.gameLogic.playTurn(x, y);
            }
          }
        }
      }
      this.drawMarkings();
    }
  }

  private clearCanvas(): void {
    const context = this.canvas?.nativeElement.getContext('2d');
    if (context != undefined) {
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    }
  }

  private drawField(): void {
    const context = this.canvas?.nativeElement.getContext('2d');
    if (context != undefined) {
      const canvasWidth = context.canvas.width;
      const canvasHeight = context.canvas.height;
      const stepX = canvasWidth / 3;
      const stepY = canvasHeight / 3;

      context.lineWidth = 3;

      for (let i = 0; i < 4; i++) {
        context.beginPath();
        context.moveTo(stepX * i, 0);
        context.lineTo(stepX * i, canvasHeight);
        context.moveTo(0, stepY * i);
        context.lineTo(canvasWidth, stepY * i);
        context.stroke();
      }
    }
  }

  private drawMarkings(): void {
    const context = this.canvas?.nativeElement.getContext('2d');
    if (context != undefined) {
      const canvasWidth = context.canvas.width;
      const canvasHeight = context.canvas.height;
      const cellWidth = canvasWidth / 3;
      const cellHeight = canvasHeight / 3;
      const markRadius = cellWidth / 3;

      context.lineWidth = 7;

      for (let y = 0; y < 3; y++) {
        for (let x = 0; x < 3; x++) {
          const cellCenterX = (cellWidth * x) + (cellWidth / 2);
          const cellCenterY = (cellHeight * y) + (cellHeight / 2);

          if (this.gameLogic.getGameState()[(y * 3) + x] === TTTCellState.X) {
            context.beginPath();
            context.moveTo(cellCenterX - markRadius, cellCenterY - markRadius);
            context.lineTo(cellCenterX + markRadius, cellCenterY + markRadius);
            context.moveTo(cellCenterX + markRadius, cellCenterY - markRadius);
            context.lineTo(cellCenterX - markRadius, cellCenterY + markRadius);
            context.stroke();
          }
          if (this.gameLogic.getGameState()[(y * 3) + x] === TTTCellState.O) {
            context.beginPath();
            context.arc(cellCenterX, cellCenterY, markRadius, 0, 2 * Math.PI);
            context.stroke();
          }
        }
      }
    }
  }
}
