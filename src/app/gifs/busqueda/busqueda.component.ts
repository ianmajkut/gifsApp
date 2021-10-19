import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent  {
  //Buscamos en el html que tenga una referncia local txtBuscar y lo asignamos
  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>
  
  buscar(): void{
    const valor = this.txtBuscar.nativeElement.value
    console.log(valor)
    this.txtBuscar.nativeElement.value = ""
  }

}
