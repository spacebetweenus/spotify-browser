import { Component, OnInit, Input } from '@angular/core';
import { TrackData } from '../../data/track-data';
import {formatDuration} from "../../services/spotify.service";

@Component({
  selector: 'app-track-list',
  templateUrl: './track-list.component.html',
  styleUrls: ['./track-list.component.css']
})
export class TrackListComponent implements OnInit {
	@Input() tracks:TrackData[];
	@Input() hideArtist:boolean = false;
	@Input() hideAlbum:boolean = false;
  formatDuration = formatDuration;
  constructor() { }

  ngOnInit() {
  }

}
