import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { WeatherService } from './weather.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit, OnDestroy {

  weatherData: any;
  weatherIcon: string;
  weatherDescription: string;
  localTime: string;
  temperature: string;
  humidity: string;
  visibility: string;
  windSpeed: string;
  windDegree: string;
  windDirection: string;
  place: string;
  region: string;
  feelsLike: string;
  public countrySub: Subscription;
  public weatherSub: Subscription;
  @Output() errorEve = new EventEmitter<string>();

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    this.countrySub = this.weatherService.getCountryAsListener()
    .subscribe(country=>{
      this.weatherSub = this.weatherService.getWeatherData(country)
      .subscribe(weatherData=>{
        this.weatherData = weatherData;
        if(!this.weatherData.hasOwnProperty('error')) {
          this.weatherIcon = this.weatherData.current.weather_icons;
        this.weatherDescription = this.weatherData.current.weather_descriptions;
        this.localTime = this.weatherData.location.localtime;
        this.temperature = this.weatherData.current.temperature;
        this.humidity = this.weatherData.current.humidity;
        this.visibility = this.weatherData.current.visibility;
        this.windSpeed = this.weatherData.current.wind_speed;
        this.windDegree = this.weatherData.current.wind_degree;
        this.windDirection = this.weatherData.current.wind_dir;
        this.place = this.weatherData.request.query;
        this.region = this.weatherData.location.region;
        this.feelsLike = this.weatherData.current.feelslike;
        } else {
          console.log("in else block");
          this.errorEve.emit("Please enter a valid country!!");  
        }
      },
      error=>{
        console.log("in error block");
        this.errorEve.emit("Please enter a valid country!!");
      })
    });
  }

  ngOnDestroy() {
    this.countrySub.unsubscribe();
    this.weatherSub.unsubscribe();
  }

}
