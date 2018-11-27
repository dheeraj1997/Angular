import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-technology',
  templateUrl: './technology.component.html',
  styleUrls: ['./technology.component.scss']
})
export class TechnologyComponent implements OnInit {

  techData = [{
    img: 'angular.png'
  }, {
    img: 'html.png'
  }, {
    img: 'sass.png'
  }, {
    img: 'node.png'
  }, {
    img: 'go.png'
  }, {
    img: 'aws.png'
  }, {
    img: 'mongo.png'
  }, {
    img: 'elastic.png'
  }, {
    img: 'ga.png'
  }, {
    img: 'npm.png'
  }, {
    img: 'docker.png'
  }, {
    img: 'redis.png'
  }, {
    img: 'kafka.png'
  }, {
    img: 'android.png'
  }, {
    img: 'firebase.png'
  }, {
    img: 'ssl.png'
  }];

  constructor() {
  }

  ngOnInit() {
  }

}
