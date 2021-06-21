import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { GithubService } from '../../../services/github.service';
import { GitHub } from '../../../services/models/github-model';

@Component({
  selector: 'app-battlemetrics',
  templateUrl: './battlemetrics.component.html',
  styleUrls: ['./battlemetrics.component.css']
})
export class BattlemetricsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
