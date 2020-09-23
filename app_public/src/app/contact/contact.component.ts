import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})

export class ContactComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public pageContent = {
    header : {
      title : 'Contact Node Comm',
      strapline : ''
    },
    content : 'You can contact us on our hot telephone line 08126821314.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit.'
  };
}