import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [],
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.css'
})
export class ListaComponent {

  rows: string[][] = [["15", "El WoW es un juegazo", "49.99"],
                      ["10", "El terraria está guapo", "7.99"],
                      ["17", "Elden ring GOTY", "44.99"]];

  
  @Output() onSelect: EventEmitter<string[]> = new EventEmitter<string[]>();

  addInRow(inRow: string[]){
    console.log("Row added");
    this.rows.push(inRow);
  }

  deleteRow(index: number){
    this.rows.splice(index, 1);
    console.log(this.rows);
  }

  selectRow(index: number){
    let row = this.rows[index];
    row.push((index as unknown as string));
    this.onSelect.emit(this.rows[index]);
  }

  modifyRow(inRow: string[]){
    let row = inRow;
    let index: number = inRow[3] as unknown as number;
    row.splice(3, 1);
    this.rows[index] = row;
  }
}
