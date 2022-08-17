import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Item } from "../model/item.model";

@Injectable({
    providedIn: 'root'
  })
  export class ItemService{
    getAllItemsApi: string;
    getItemByIdApi: string;
    

  constructor(private http: HttpClient){
    this.getAllItemsApi='http://localhost:8282/item';
    this.getItemByIdApi='http://localhost:8282/item/'
  }

  fetchItems(): Observable<Item[]>{
    return this.http.get<Item[]>(this.getAllItemsApi);
  }
  
}