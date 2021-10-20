# GifsApp

Proyecto desarrollado en Angular para implementa API de [GIPHY](https://giphy.com/), almacenar los resultados en LocalStorage y cargar la última busqueda realizada. Para más información sobre esta API visitar [GIPHY Developers](https://developers.giphy.com/) y para ver el proyecto final haga [click acá](https://cocky-fermat-b7b87a.netlify.app/).

## Vista General

![general_gif](https://github.com/ianmajkut/gifsApp/blob/main/giftAplicacion.gif)

## Api Giphy

Para la utilizacón de esta API se definió dos variables inicialmente que contienen la apiKey y el url para hacer la petición get. Recomiendo revisar la [documentacion](https://developers.giphy.com/docs/api/endpoint#search) de la API antes de la implementación de la misma y debe crearse una cuenta para poder usar esta API.

```ts
private apiKey: string = 'YOUR_API_KEY'
private baseUrlApi: string = 'https://api.giphy.com/v1/gifs/search'
```

Dentro del metodo ***buscarGifs(query: string){}*** se utiliza lo siguiente para realizar la petición get() : 

```ts
//Definimos una variable de tipo HttpParams y le seteamos los parametros que utilzaremos en nuestro url. Revisar los parametros disponibles en la documentacion de GIPHY
const params = new HttpParams()
          .set('api_key', this.apiKey)
          .set('limit', '10')
          .set('q', query);
          
//Definimos que el get va a ser de tipo SearchGifsResponse, definido en gifs.interface.ts y le pasamos nuestro baseURL y los params 
this.http.get<SearchGifsResponse>(`${this.baseUrlApi}?`, {params})
          .subscribe( (response) =>{
            this.resultados = response.data                                     //Al array resultados le asignamos los datos de la respuesta del get 
            localStorage.setItem('resultados', JSON.stringify(this.resultados)) //Guardamos los resultados en LocalStorage
          })
    
```

![resultados_img](https://github.com/ianmajkut/gifsApp/blob/main/resultadosImg.png)

## Gif.service.ts

Anteriormente explique algunas cosas que se realiza dentro de este service pero suceden otras cosas también.

```ts
private _historial : string[] = []  //Array que almacenara las busquedas que hemos realizado
public resultados : Gif[] = []      //Array que almacenara los resultados de nuestra busqueda. Gif se encuentra dentro de gifs.interface.ts

//Metodo para obtener qué contiene _historial
get historial(){
    return [...this._historial]
}

//Definimos que estas dos variables contengan lo almacenado en el LocalStorage correspondientes a las mismas y, en caso de no haber nada, lo inicializamos como un array vacío
constructor(private http: HttpClient){
    this._historial = JSON.parse(localStorage.getItem("historial")!) || []
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || []
 }
 
 buscarGifs(query: string){
    
    query = query.trim().toLocaleLowerCase()    //Convertimos la query a minúsculas
    if( !this._historial.includes( query )){    //Insertamos la query si no existe dentro del _historial
      
      this._historial.unshift(query)          //Añadimos la query al inicio del array
      this._historial = this._historial.splice(0, 10) // Limitamos la cantidad de items que puede almacenar _historial
      localStorage.setItem("historial", JSON.stringify(this._historial))  //Añadimos a _historial a localStorage
    } 

```
![historial_img](https://github.com/ianmajkut/gifsApp/blob/main/historialImg.png)


En los distintos componentes creados se usa mucho este service, por ende me pareció importante explicar el funcionamiento para una mejor comprensión del proyecto.

