import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  private apiUrl = 'http://localhost:5009/api/products/';

  constructor(private httpClient: HttpClient) { }

  getAll() {
    return this.httpClient.get(this.apiUrl);
  }

  getById(id: string) {
    return this.httpClient.get(`${this.apiUrl}${id}`);
  }

  post(payload: any) {
    return this.httpClient.post(this.apiUrl, payload);
  }

  put(id: string, payload: any) {
    console.log('Enviando PUT com ID:', id, 'Payload:', payload);
    return this.httpClient.put(`${this.apiUrl}${id}`, payload);
    
  }

  delete(id: string) {
    return this.httpClient.delete(`${this.apiUrl}${id}`);
  }
}
