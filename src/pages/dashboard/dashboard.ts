import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable'

import { ItemCreatePage } from '../item-create/item-create';
import { ItemDetailPage } from '../item-detail/item-detail';
import { LoadingController } from 'ionic-angular';

import { Pages } from '../../providers/providers';

import { Page } from '../../models/page';
import { SpaceLink } from '../../models/space-link';
import { ContentId } from '../../models/content-id';

// import { Config } from '../../config/config'

declare const $: Zepto;

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html'
})
export class DashboardPage {

  page: Page;
  
  $meta: ZeptoCollection;

  links: SpaceLink[];

  loader: any

  constructor(
    public navCtrl: NavController, 
    public pagesProvider: Pages, 
    public modalCtrl: ModalController, 
    public loadingCtrl: LoadingController
    // public config: Config
  ) {
    this.presentLoading()
  }

  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {
    // 
    this.pagesProvider
      .getPage('71106563')
      .subscribe((data: Page) => this.page = data,
        error => () => {
            console.error('something went wrong')
        },
        () => {
            this.loader.dismiss()
            console.log('success', this.page)
            let $view: ZeptoCollection = $(this.page);
            this.$meta.add('.constantia-wiki',$view)
            this.$meta.add('.constantia-box',$view)
            this.links = this.fromColorboxToSpaceLink($view)
        });
  }

  /**
   * Display the pages meta information in a modal overlay
   */
  showMeta() {
    console.log(this.$meta)
  }

  /**
   * Present loading modal
   */
  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Please wait...",
    });
    this.loader.present();
  }

  /**
   * Translate html colorboxes into SpaceLinks
   * @param $el ZeptoCollection body.view from the requested page
   */
  fromColorboxToSpaceLink($el: ZeptoCollection): SpaceLink[]{
    let links: SpaceLink[] = []

    let $boxes: any = $el.find('.constantia-color-box');
    $boxes.sort(function (a:any, b:any) {
        return $(a).text().toUpperCase().localeCompare($(b).text().toUpperCase());
    })
    let that = this
    $boxes.forEach(box => {
      let $this = $(box)
      let link = new SpaceLink()
      let urlRaw = $this.find('a').attr('href')
      link.title = $this.find('h2').text()
      link.description  = $this.find('span.description').text()
      link.contentId = that.getContentIdFromUrl(urlRaw),
      link.icon = $this.find('.icon'),
      link.url = new URL(urlRaw)   
      links.push(link)
    });

    return links
  }

  /**
   * Transforms a URL into the relevant content id
   * @param url URL contains multi options and possible target content types as well as external targets or links within a page
   */
  getContentIdFromUrl(url: URL): ContentId {
    // TODO: placeholder for Url translation provider access
    // https://jira.foryouandyourteam.com/browse/COFLSUP-298
    return '#none'
  }

}
