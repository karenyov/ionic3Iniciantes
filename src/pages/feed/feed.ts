import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import { MovieProvider } from '../../providers/movie/movie';
import { FilmeDetalhesPage } from '../filme-detalhes/filme-detalhes';

/**
 * Generated class for the FeedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
  providers: [
    MovieProvider
  ]
})
export class FeedPage {

  public objeto_feed = {
    titulo: "Charles Franca",
    data: "November 5, 1955",
    descricao: "Estou criando um app incrível...",
    qntd_likes: 12,
    qntd_comments: 4,
    time_comment: "11h ago"
  };

  public lista_filmes = new Array<any>();
  public page = 1;
  public loading;
  public refresher;
  public isRefreshing: boolean = false;
  public infiniteScroll;

  public nomeUsuario: string = "Charles França do código";

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private movieProvider: MovieProvider, public loadingCtrl: LoadingController) {

  }

  public somaDoisNumeros(num1: number, num2: number): void {
    //alert(num1 + num2);
  }

  ionViewDidEnter() {
    this.carregarFilmes();
  }

  abreCarregando() {
    this.loading = this.loadingCtrl.create({
      content: 'Carregando filmes...'
    });
    this.loading.present();
  }

  fechaCarregando() {
    this.loading.dismiss();
  }

  doRefresh(refresher) {
    this.refresher = refresher
    this.isRefreshing = true;
    this.carregarFilmes();
  }

  doInfinite(infiniteScroll) {
    this.page++;
    this.infiniteScroll = infiniteScroll;
    this.carregarFilmes(true);
  }

  carregarFilmes(newPage: boolean = false) {
    this.abreCarregando();
    this.movieProvider.getLatestMovies(this.page)
      .subscribe(data => {
        if (newPage) {
          this.lista_filmes = this.lista_filmes.concat(data['results']);
          this.infiniteScroll.complete();
        } else {
          this.lista_filmes = data['results'];
        }

        this.fechaCarregando();
        if (this.isRefreshing) {
          this.refresher.complete();
          this.isRefreshing = false;
        }
      }, err => {
        console.log(err);
        this.fechaCarregando();
        if (this.isRefreshing) {
          this.refresher.complete();
          this.isRefreshing = false;
        }
      });
  }

  abrirDetalhes(filme) {
    this.navCtrl.push(FilmeDetalhesPage, { id: filme.id });
  }

}
