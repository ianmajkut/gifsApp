import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent  {
  //Buscamos en el html que tenga una referncia local txtBuscar y lo asignamos
  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>

  constructor(private gifsService: GifsService){}
  
  buscar(): void{
    const valor = this.txtBuscar.nativeElement.value

    //eliminamos los espacios en blanco de los extremos del string
    if(valor.trim().length === 0){
      return;
    }
    
    this.gifsService.buscarGifs(valor)

    this.txtBuscar.nativeElement.value = ""
  }

}
