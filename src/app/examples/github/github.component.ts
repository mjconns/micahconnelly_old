import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { GithubService } from '../../services/github.service';
import { GitHub } from '../../services/models/github-model';


@Component({
  selector: 'app-github',
  templateUrl: './github.component.html',
  styleUrls: ['./github.component.css']
})
export class GithubComponent implements OnInit {
  public userName = 'mjconns';
  public user: string;
  gitHub = new GitHub();

  constructor(private githubService: GithubService) { }

  ngOnInit() {

    this.getUserInfo(this.user);
  }

  getUserInfo(user: string) {

    let searchUser: string

    if (!this.user) {
      searchUser = this.userName;
    } else {
      searchUser = this.user;
    }
    this.githubService.getUser(searchUser).subscribe(results => {
      this.gitHub = results; // this returns and sets everything, not only model
      console.log(this.gitHub, 'gitHub');
      console.log(this.gitHub.bio, this.gitHub.name, this.gitHub.login, 'deets');
    })

  }
}
