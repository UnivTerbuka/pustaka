import { Component, Input, OnInit } from '@angular/core';

interface TextStyle {
  top: string;
  left: string;
}

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.css'],
})
export class TextComponent implements OnInit {
  @Input() text: Array<number | string>;
  @Input() id: number;
  style: TextStyle;
  constructor() {}

  ngOnInit(): void {
    this.style = {
      top: `${this.text[0]}px`,
      left: `${this.text[1]}px`,
    };
  }
}
