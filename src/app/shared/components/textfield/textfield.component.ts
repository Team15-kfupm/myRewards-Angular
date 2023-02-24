import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-textfield',
  templateUrl: './textfield.component.html',
  styleUrls: ['./textfield.component.scss']
})
export class TextfieldComponent implements OnInit {

  @Input() type = '';
  @Input() placeholder = '';



  constructor() { }

  ngOnInit(): void {
  }

}
