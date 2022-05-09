import {Component} from '@angular/core';
import {IAPProduct, InAppPurchase2} from '@ionic-native/in-app-purchase-2/ngx';
import {AlertController, Platform} from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  products: IAPProduct[] = [];

  subscriptions: any = [
    {id: 'mgh_small', type: this.store.PAID_SUBSCRIPTION},
    {id: 'mgh_medium', type: this.store.PAID_SUBSCRIPTION},
    {id: 'mgh_large', type: this.store.PAID_SUBSCRIPTION},
    {id: 'mgh_small_annual', type: this.store.PAID_SUBSCRIPTION},
    {id: 'mgh_medium_annual', type: this.store.PAID_SUBSCRIPTION},
    {id: 'mgh_large_annual', type: this.store.PAID_SUBSCRIPTION}
  ]

  plan$: any;

  constructor(private platform: Platform,
              private alertController: AlertController,
              private store: InAppPurchase2) {
    this.initializeApp();
    /*
    this.subscriptionService.planSubject.subscribe(res => {
      this.plan$ = res;
      // this.showP lan()
    })
    */
  }

  /*
  public get planValue(): any {
    return this.plan$.value;
  }
  */

  async showPlan() {
    const alert = await this.alertController.create({
      header: "Current Plan",
      // subHeader: `${this.products[0].price} ${this.products[0].currency}`,
      message: this.plan$,
      buttons: ['OK']
    });

    await alert.present();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // this.statusBar.styleDefault();
      // this.splashScreen.hide();
      // this.showIosInstallBanner();
      // this.checkUpdate();
      // this.networkService.watchNetwork();

      // check if user is logged in.
      /*
      this.offlineService.syncData();
      firebase.firestore().enablePersistance().then(() => {
        const firestore = app.firestore();
        // Use Cloud Firestore ...
      });
      */

      // COmmebted this out to see if it was affecting offlibe mode
      /*
      setInterval(() => {
        this.swUpdate.checkForUpdate();
      }, 21600);
      */

      if (this.platform.is('cordova')) {
        this.store.verbosity = this.store.DEBUG;

        this.store.validator = "https://validator.fovea.cc/v1/validate?appName=mygoodhorse&apiKey=64b772f9-1b2a-49cc-b574-aa85348643ea";

        // Register the In-App purchasing products, so we can use it throughout the app.
        this.store.register(this.subscriptions);

        // Updated
        this.store.when("mgh_small").updated((product: IAPProduct) => {
          console.log('Updated' + JSON.stringify(product));
          if (product.owned) {
            // set the memberhsip type in the user service
            console.log("Small Plan is currently owned by the user")
            // this.subscriptionService.planSubject.next("mgh_small")
          }

        });
        this.store.when("mgh_medium").updated((product: IAPProduct) => {
          console.log('Updated' + JSON.stringify(product));
          if (product.owned) {
            // set the memberhsip type in the user service
            console.log("Medium Plan is currently owned by the user")
            // this.subscriptionService.planSubject.next("mgh_medium")
          }
        });
        this.store.when("mgh_large").updated((product: IAPProduct) => {
          console.log('Updated' + JSON.stringify(product));
          if (product.owned) {
            // set the memberhsip type in the user service
            console.log("Large Plan is currently owned by the user")
            // this.subscriptionService.planSubject.next("mgh_large")
          }
        });
        this.store.when("mgh_small_annual").updated((product: IAPProduct) => {
          console.log('Updated' + JSON.stringify(product));
          if (product.owned) {
            // set the memberhsip type in the user service
            console.log("Annual Small Plan is currently owned by the user")
            // this.subscriptionService.planSubject.next("mgh_small_annual")
          }

        });
        this.store.when("mgh_medium_annual").updated((product: IAPProduct) => {
          console.log('Updated' + JSON.stringify(product));
          if (product.owned) {
            // set the memberhsip type in the user service
            console.log("Annual Medium Plan is currently owned by the user")
            // this.subscriptionService.planSubject.next("mgh_medium_annual")
          }
        });
        this.store.when("mgh_large_annual").updated((product: IAPProduct) => {
          console.log('Updated' + JSON.stringify(product));
          if (product.owned) {
            // set the memberhsip type in the user service
            console.log("Annual Large Plan is currently owned by the user")
            // this.subscriptionService.planSubject.next("mgh_large_annual")
          }
        });

        // Track all store errors
        this.store.error((err) => {
          console.error('Store Error ' + JSON.stringify(err));
        });
        this.store.refresh()
      }
    });
  }

}
