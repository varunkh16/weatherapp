import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({providedIn:"root"})
export class WeatherService {

    private currentCountry = new Subject<string>();

    constructor(private http: HttpClient) {}

    setCountry(country: string) {
        this.currentCountry.next(country);
    }

    getCountryAsListener() {
        return this.currentCountry.asObservable();
    }

    getWeatherData(country: string) {
        return this.http.get('http://api.weatherstack.com/current?access_key=1c3572e58bec1fcb0fc21e8d0750574e&query='+country);
    }
}