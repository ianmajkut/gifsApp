import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'JfrNMm6p1PMTi9gLokV6RD2ITUNEChYG'
  private _historial : string[] = []

  // TODO cambiar any por su tipo
  public resultados : any[] = []

  get historial(){
    return [...this._historial]
  }

  constructor(private http: HttpClient){}

  buscarGifs(query: string){
    //unshift() añade uno o varios elementros al inicio de un array

    query = query.trim().toLocaleLowerCase()
    if(!this._historial. includes(query)){
      //insertamos si no existe 
      this._historial.unshift(query)
      this._historial = this._historial.splice(0, 10)
    }
    
    this.http.get(`https://api.giphy.com/v1/gifs/search?api_key=JfrNMm6p1PMTi9gLokV6RD2ITUNEChYG&q=${query}&limit=10`)
              .subscribe( (response:any) =>{
                console.log(response.data )
                this.resultados = response.data
              })
    
  }

}
