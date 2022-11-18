import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistData } from '../../data/artist-data';
import { TrackData } from '../../data/track-data';
import { AlbumData } from '../../data/album-data';
import {SpotifyService} from "../../services/spotify.service";

@Component({
  selector: 'app-album-page',
  templateUrl: './album-page.component.html',
  styleUrls: ['./album-page.component.css']
})
export class AlbumPageComponent implements OnInit {
	albumId:string;
	album:AlbumData;
	tracks:TrackData[];


  constructor(private route: ActivatedRoute, private spotifyService: SpotifyService) { }

  ngOnInit() {

  	//TODO: inject spotifyService and use it to get the album data and the tracks for the album
    this.route.params.subscribe(() => {
      this.albumId = this.route.snapshot.paramMap.get('id');
      this.spotifyService.getAlbum(this.albumId).then(res => {
        this.album = res;
      });
      this.spotifyService.getTracksForAlbum(this.albumId).then(res => {
        this.tracks = res;
      })
    })
  }

}
