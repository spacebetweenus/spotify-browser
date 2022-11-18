import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistData } from '../../data/artist-data';
import { TrackData } from '../../data/track-data';
import { AlbumData } from '../../data/album-data';
import {SpotifyService} from "../../services/spotify.service";

@Component({
  selector: 'app-artist-page',
  templateUrl: './artist-page.component.html',
  styleUrls: ['./artist-page.component.css']
})
export class ArtistPageComponent implements OnInit, OnChanges {
	artistId:string;
	artist:ArtistData;
	relatedArtists:ArtistData[];
	topTracks:TrackData[];
	albums:AlbumData[];

  constructor(private route: ActivatedRoute, private spotifyService: SpotifyService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.artistId = this.route.snapshot.paramMap.get('id');
      this.refresh();
    })
    //TODO: Inject the spotifyService and use it to get the artist data, related artists, top tracks for the artist, and the artist's albums

  }

  refresh() {
    this.spotifyService.getArtist(this.artistId).then(res => {
      this.artist = res;
    });

    this.spotifyService.getRelatedArtists(this.artistId).then(res => {
      this.relatedArtists = res;
    });

    this.spotifyService.getAlbumsForArtist(this.artistId).then(res => {
      this.albums = res;
    })

    this.spotifyService.getTopTracksForArtist(this.artistId).then(res => {
      this.topTracks = res;
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['artistId']) {
      this.refresh()
    }
  }

}
