import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistData } from '../../data/artist-data';
import { TrackData } from '../../data/track-data';
import { AlbumData } from '../../data/album-data';
import { TrackFeature } from '../../data/track-feature';
import {formatDuration, SpotifyService} from "../../services/spotify.service";

@Component({
  selector: 'app-track-page',
  templateUrl: './track-page.component.html',
  styleUrls: ['./track-page.component.css']
})
export class TrackPageComponent implements OnInit {
	trackId:string;
	track:TrackData;
  audioFeatures:TrackFeature[];

  constructor(private route: ActivatedRoute, private spotifyService: SpotifyService) { }
  formatDuration = formatDuration;
  ngOnInit() {

  	//TODO: Inject the spotifyService and use it to get the track data and it's audio features
    this.route.params.subscribe(() => {
      this.trackId = this.route.snapshot.paramMap.get('id');
      this.spotifyService.getTrack(this.trackId)
        .then(res => {
          this.track = res;
          console.log(res)
        });
      this.spotifyService.getAudioFeaturesForTrack(this.trackId)
        .then(res => {
          this.audioFeatures = res;
        })
    })
  }

}
