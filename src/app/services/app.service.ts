import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  baseUrl = environment.baseUrl;
  response: any = {};

  // service vars
  generatedMbi;
  isValid: boolean;

  constructor(private http: HttpClient) { }

  getRandomMbi(): Promise<any> {
    return this.http.get(this.baseUrl + '/generate')
      .toPromise()
      .then((data) => {
        this.response = data;
        this.generatedMbi = this.response.mbi;
      }).catch( (error) => {
        console.log(error);
    });
  }

  validateMbi(inputData: string) {
    return this.http.post(this.baseUrl + '/verify?mbi=' +  inputData, null)
      .toPromise()
      .then((data) => {
        this.response = data;
        this.isValid = this.response.isValid;
      }).catch( (error) => {
        console.log(error);
    });
  }
}
