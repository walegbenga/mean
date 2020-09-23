import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  
  public pageContent = {
    header: {
      title: 'Node Comm',
      strapline: 'Find places to buy and sell near you!'
    },
    sidebar: 'Looking for where to buy and sell and a seat? Node Comm helps you find places to work when out and about. Perhaps with coffee, cake or a pint? Let Loc8r help you find the place you\'re looking for.'
  }
}
