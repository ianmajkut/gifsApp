import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _historial : string[] = []

  get historial(){
    
    return [...this._historial]
  }

  buscarGifs(query: string){
    //unshift() añade uno o varios elementros al inicio de un array

    query = query.trim().toLocaleLowerCase()
    if(!this._historial. includes(query)){
      //insertamos si no existe 
      this._historial.unshift(query)
      this._historial = this._historial.splice(0, 10)
    }
    
    console.log(this._historial)
  }

}
