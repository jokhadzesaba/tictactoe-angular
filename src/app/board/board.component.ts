import { Component, OnInit, Output } from '@angular/core';
import { retry } from 'rxjs';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  squares!: any[];
  winner: string = 'no winner yet';
  xIsNext!: boolean;
  counter = 1;
  ngOnInit(): void {
    this.newGame();
  }
  newGame(): void {
    this.squares = Array(9).fill(null);
    this.winner = '';
    this.xIsNext = true;
  }
  get player(): string {
    if (this.counter === 1) {
      return 'X';
    } else {
      return 'O';
    }
  }
  makeMove(index: number): void {
    if (!this.squares[index]) {
      if (this.xIsNext) {
        this.squares[index] = 'X';
      } else {
        this.squares[index] = 'O';
      }
      this.xIsNext = !this.xIsNext;
    }
    this.calculeteWinner();
  }
  private XorO(xOrO: string): string {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (const combinatino of lines) {
      const [a, b, c] = combinatino;
      if (
        this.squares[a] === xOrO &&
        this.squares[b] === xOrO &&
        this.squares[c] === xOrO
      ) {
        this.winner = `winner is ${xOrO}`;
      }
    }
    return this.winner;
  }
  calculeteWinner(): string {
    if (!this.xIsNext) return this.XorO('X');
    else return this.XorO('O');
  }
}
