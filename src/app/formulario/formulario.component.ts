import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent implements OnInit{
  
  @ViewChild("formCodigo")
  formCodigo!: ElementRef;

  @ViewChild("formDesc")
  formDesc!: ElementRef;

  @ViewChild("formPrecio")
  formPrecio!: ElementRef;

  @ViewChild("nameErr")
  nameErr!: ElementRef;

  @ViewChild("mailErr")
  mailErr!: ElementRef;

  @ViewChild("msgErr")
  msgErr!: ElementRef;

  @ViewChild("spamErr")
  spamErr!: ElementRef;


  @Output() onGuardar: EventEmitter<string[]> = new EventEmitter<string[]>();
  @Output() onModificar: EventEmitter<string[]> = new EventEmitter<string[]>();
  
  @Input() inFormData: string[] = [];

  inIndex: number = 0;

  constructor() {
  }
 
  ngOnInit() {
  }

  clickGuardar = (): void => {
    let formData: string[] = [];
    console.log(this.formCodigo.nativeElement.value);
    formData.push(this.formCodigo.nativeElement.value);
    formData.push(this.formDesc.nativeElement.value);
    formData.push(this.formPrecio.nativeElement.value);

    let valid: boolean = true;
    for (let i = 0; i < formData.length; i++) {
      if(formData[i].trim() == ""){
        valid = false;
      }
    }


    if (valid) {
      this.onGuardar.emit(formData);
      this.shorErr();
      this.clearForm();
    } else {
      this.shorErr();
    }
  }

  shorErr = (): void => {
    if (this.formCodigo.nativeElement.value.trim() == "") {
      this.nameErr.nativeElement.removeAttribute("hidden");
    } else {
      this.nameErr.nativeElement.hidden = true;
    }
    
    if (this.formDesc.nativeElement.value.trim() == "") {
      this.mailErr.nativeElement.removeAttribute("hidden");
    } else {
      this.mailErr.nativeElement.hidden = true;
    }
    
    if (this.formPrecio.nativeElement.value.trim() == "") {
      this.msgErr.nativeElement.removeAttribute("hidden");
    } else {
      this.msgErr.nativeElement.hidden = true;
    }
  }

  onSelect(formData: string[]){
    
    this.formCodigo.nativeElement.value = formData[0];
    this.formDesc.nativeElement.value = formData[1];
    this.formPrecio.nativeElement.value = formData[2];
    this.inIndex = (formData[3] as unknown as number);

    (<HTMLInputElement> document.getElementById("modBtn")).disabled = false;
    (<HTMLInputElement> document.getElementById("guardarBtn")).disabled = true;
  }

  onModify(){
    let formData: string[] = [];
    formData.push(this.formCodigo.nativeElement.value);
    formData.push(this.formDesc.nativeElement.value);
    formData.push(this.formPrecio.nativeElement.value);

    let valid: boolean = true;
    for (let i = 0; i < formData.length; i++) {
      if(formData[i].trim() == ""){
        valid = false;
      }
    }

    formData.push(this.inIndex as unknown as string);
    
    
    (<HTMLInputElement> document.getElementById("modBtn")).disabled = true;
    (<HTMLInputElement> document.getElementById("guardarBtn")).disabled = false;

    if (valid) {
      this.onModificar.emit(formData);
      this.shorErr();
      this.clearForm();
    } else {
      this.shorErr();
    }
  }

  clearForm() {
    
    this.formCodigo.nativeElement.value = "";
    this.formDesc.nativeElement.value = "";
    this.formPrecio.nativeElement.value = "";
  }
}
