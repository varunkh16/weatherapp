import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { WeatherService } from './weather/weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'weatherapp';

  form: FormGroup;
  errorString="";

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.form = new FormGroup({
      country: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      })
    });
  }

  onCheckWeather() {
    this.errorString = "";
    this.weatherService.setCountry(this.form.value.country)
  }

  onError(errorData: string) {
    console.log(errorData);
    this.errorString = errorData;
  }
}
