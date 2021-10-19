import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'JfrNMm6p1PMTi9gLokV6RD2ITUNEChYG'
  private _historial : string[] = []

  
  public resultados : Gif[] = []

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
    
    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=JfrNMm6p1PMTi9gLokV6RD2ITUNEChYG&q=${query}&limit=10`)
              .subscribe( (response) =>{
                console.log(response.data )
                this.resultados = response.data
              })
    
  }

}
