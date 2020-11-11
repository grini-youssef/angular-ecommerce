import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Country } from '../common/country';
import { State } from '../common/state';

@Injectable({
  providedIn: 'root'
})
export class ShopFormService {

  private countriesUrl = environment.baseUrl + 'api/countries';
  private statesUrl = environment.baseUrl + 'api/states';

  constructor( private httpClient: HttpClient ) { }

  getCreditCardMonths(startMonth: number): Observable<number[]>{

    let data: number[] = [];

    // build an array for "Month" dropDown list
    // - start at current Month and loop until

    for (let theMonth=startMonth; theMonth<= 12; theMonth++){
      data.push(theMonth);
    }
    return of(data);

  }

  getCreditCardYears(): Observable<number[]> {

    let data: number[] = [];

    // build an array for "Year" dropDown list
    // - start at current Year and loop for next 10 years

    const startYear: number = new Date().getFullYear();
    const endYear: number = startYear +10;

    for (let theYear=startYear; theYear<= endYear; theYear++){
      data.push(theYear);
    }

    return of(data);

  }

  getCountries(): Observable<Country[]> {

    return this.httpClient.get<GetResponseCountries>(this.countriesUrl).pipe(
      map (response => response._embedded.countries )
    );

  }

  getStates(theCountryCode: string): Observable<State[]> {

    const searchUrl = `${this.statesUrl}/search/findByCountryCode?code=${theCountryCode}`;
    return this.httpClient.get<GetResponseStates>(searchUrl).pipe(
      map(response => response._embedded.states)
    );
  }

}

interface GetResponseCountries{
  _embedded: {
    countries: Country[]; 
  }
}

interface GetResponseStates {
  _embedded: {
    states: State[]; 
  }
}