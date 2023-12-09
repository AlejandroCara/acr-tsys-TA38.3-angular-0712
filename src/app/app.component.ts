import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormularioComponent } from './formulario/formulario.component';
import { ListaComponent } from './lista/lista.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormularioComponent, ListaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TA38.3';
  
  @ViewChild(ListaComponent, {static : true}) listaComponent: ListaComponent | undefined;
  @ViewChild(FormularioComponent, {static : true}) formularioComponent: FormularioComponent | undefined;

  ngOnInit() {
  }

  addNewRow(formData: string[]){
    console.log("Parend addNewRow");
    console.log("list" + this.listaComponent);
    this.listaComponent?.addInRow(formData);
  }

  selectRow(formData: string[]){
    this.formularioComponent?.onSelect(formData);
  }

  modifyRow(formData: string[]){
    this.listaComponent?.modifyRow(formData);
  }
}
