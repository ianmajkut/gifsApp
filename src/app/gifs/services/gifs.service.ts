import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'JfrNMm6p1PMTi9gLokV6RD2ITUNEChYG'
  private baseUrlApi: string = 'https://api.giphy.com/v1/gifs/search'
  private _historial : string[] = []
  
  
  public resultados : Gif[] = []

  get historial(){
    return [...this._historial]
  }

  constructor(private http: HttpClient){
    this._historial = JSON.parse(localStorage.getItem("historial")!) || []
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || []
  }

  buscarGifs(query: string){
    //unshift() añade uno o varios elementros al inicio de un array

    query = query.trim().toLocaleLowerCase()
    if( !this._historial.includes( query )){
      //insertamos si no existe 
      this._historial.unshift(query)
      this._historial = this._historial.splice(0, 10)
      localStorage.setItem("historial", JSON.stringify(this._historial))
    }
    
    const params = new HttpParams()
          .set('api_key', this.apiKey)
          .set('limit', '10')
          .set('q', query);

    this.http.get<SearchGifsResponse>(`${this.baseUrlApi}?`, {params})
              .subscribe( (response) =>{
                this.resultados = response.data
                localStorage.setItem('resultados', JSON.stringify(this.resultados))
              })
    
  }

}
