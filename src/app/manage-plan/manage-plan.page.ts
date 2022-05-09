import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';

import {AlertController, ModalController, Platform, ToastController} from '@ionic/angular';
import {InAppPurchase2, IAPProduct} from '@ionic-native/in-app-purchase-2/ngx';
// import { Storage } from '@ionic/storage';

import {SubscriptionService} from '../_services/subscription.service';

@Component({
  selector: 'app-manage-plan',
  templateUrl: './manage-plan.page.html',
  styleUrls: ['./manage-plan.page.scss'],
})
export class ManagePlanPage implements OnInit {

  product_id: any = "online_membership"
  user$: any;
  view$: Observable<any>;
  products: any
  showPartnerCode: boolean;

  opt1: any;
  opt2: any;
  opt3: any;
  opt4: any;
  opt5: any;
  opt6: any;
  view: any = "monthly"
  success: boolean;
  error: boolean;
  error_message: any;
  success_message: any;
  current_plan: any

  constructor(private router: Router,
              public platform: Platform,
              private alertController: AlertController,
              private modalController: ModalController,
              private toastController: ToastController,
              private store: InAppPurchase2,
              private subscriptionService: SubscriptionService,
              private cd: ChangeDetectorRef) {

    // this.platform.ready().then(() => {})
    // Only for debugging!
    if (this.platform.is('cordova')) {
      // this.registerProducts();

      // Get the real product information
      this.store.ready(() => {
        // this.store.applicationUsername = () => this.user$._id;
        this.store.verbosity = this.store.DEBUG;
        this.setupListeners();

        this.products = this.store.products;
        console.log("--------------------> PRODUCTS ON MEMBERSHIP PAGE")
        console.log(this.products.length)
        this.products.forEach(value => {

          // console.log("------------> Products , " , this.products)
          // this.presentAlert(`Product - ${value.title}`, `Price: ${value.price} ${value.currency}`);
          if (value.title) {
            if (!value.owned) {
              // this.presentAlert(`Product - ${value.title}`, `User does not own the product: ${value.owned} `);
            } else if (value.owned) {
              // this.presentAlert(`Product - ${value.title}`, `User owns the product: ${value.owned} `);
            }
          }
        })
        this.cd.detectChanges();
      });
    }
  }

  ngOnInit() {
  }


  segmentChanged(ev: any) {
    // console.log("Segment changed", ev);
    this.view = ev.detail.value;
    console.log(this.view);
  }

  async joinSmallPlan(prod) {

    const alert = await this.alertController.create({
      // cssClass: 'my-custom-class',
      header: `Purchase ${prod.title}`,
      subHeader: `${prod.price} ${prod.currency}`,
      message: `The payment for your Mygoodhorse monthly plan will be processed and charged through the iOS / Google app stores. `,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        },
        {
          text: 'Confirm',
          handler: () => {
            console.log('Confirm Okay');
            this.purchaseSmall(prod)
            this.cd.detectChanges();
          }
        }
      ]
    });
    await alert.present();
    this.cd.detectChanges();
  }

  async joinLargePlan(prod) {

    const alert = await this.alertController.create({
      // cssClass: 'my-custom-class',
      header: `Purchase ${prod.title}`,
      subHeader: `${prod.price} ${prod.currency}`,
      message: `The payment for your Mygoodhorse monthly plan will be processed and charged through the iOS / Google app stores. `,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        },
        {
          text: 'Confirm',
          handler: () => {
            console.log('Confirm Okay');
            this.purchaseLarge(prod)
            this.cd.detectChanges();
          }
        }
      ]
    });
    await alert.present();
    this.cd.detectChanges();
  }

  async joinMediumPlan(prod) {

    const alert = await this.alertController.create({
      // cssClass: 'my-custom-class',
      header: `Purchase ${prod.title}`,
      subHeader: `${prod.price} ${prod.currency}`,
      message: `The payment for your Mygoodhorse monthly plan will be processed and charged through the iOS / Google app stores. `,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        },
        {
          text: 'Confirm',
          handler: () => {
            console.log('Confirm Okay');
            this.purchaseMedium(prod)
            this.cd.detectChanges();
          }
        }
      ]
    });
    await alert.present();
    this.cd.detectChanges();
  }

  async joinSmallPlanAnnual(prod) {

    const alert = await this.alertController.create({
      // cssClass: 'my-custom-class',
      header: `Join ${prod.title}`,
      subHeader: `${prod.price} ${prod.currency}`,
      message: `The payment for your Mygoodhorse annual plan will be processed and charged through the iOS / Google app stores. `,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        },
        {
          text: 'Confirm',
          handler: () => {
            console.log('Confirm Okay');
            this.purchaseSmallAnnual(prod)
            this.cd.detectChanges();
          }
        }
      ]
    });
    await alert.present();
    this.cd.detectChanges();
  }

  async joinLargePlanAnnual(prod) {

    const alert = await this.alertController.create({
      // cssClass: 'my-custom-class',
      header: `Join ${prod.title}`,
      subHeader: `${prod.price} ${prod.currency}`,
      message: `The payment for your Mygoodhorse annual plan will be processed and charged through the iOS / Google app stores. `,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        },
        {
          text: 'Confirm',
          handler: () => {
            console.log('Confirm Okay');
            this.purchaseLargeAnnual(prod)
            this.cd.detectChanges();
          }
        }
      ]
    });
    await alert.present();
    this.cd.detectChanges();
  }

  async joinMediumPlanAnnual(prod) {

    const alert = await this.alertController.create({
      // cssClass: 'my-custom-class',
      header: `Purchase ${prod.title}`,
      subHeader: `${prod.price} ${prod.currency}`,
      message: `The payment for your Mygoodhorse annual plan will be processed and charged through the iOS / Google app stores. `,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        },
        {
          text: 'Confirm',
          handler: () => {
            console.log('Confirm Okay');
            this.purchaseMediumAnnual(prod)
            this.cd.detectChanges();
          }
        }
      ]
    });
    await alert.present();
    this.cd.detectChanges();
  }

  setupListeners() {
    // General query to all products
    this.store.when("mgh_small").approved(p => p.verify()).verified(p => p.finish());

    this.store.when("mgh_medium").approved(p => p.verify()).verified(p => p.finish());

    this.store.when("mgh_large")
      .approved(p => {
        console.log("Large order is approved")
        console.log(p)
        p.verify()
      })
      .verified(p => p.finish());

    this.store.when("mgh_small_annual").approved(p => p.verify()).verified(p => p.finish());

    this.store.when("mgh_medium_annual").approved(p => p.verify()).verified(p => p.finish());

    this.store.when("mgh_large_annual").approved(p => p.verify()).verified(p => p.finish());
  }

  /*
  updateUserPlan(plan) {
    console.log('-------------------------------> Purchased Plan <-------------------------------------------')
    console.log(plan)
    if (plan.id === 'online_membership') {
      let data = {
        membership_type: "virtual",
        payment_period: "monthly",
        transaction: plan.transaction,
        role: "Member"
      }
    }
  }
  */

  purchaseSmall(product: IAPProduct) {
    console.log(product)
    this.store.order("mgh_small").then(p => {
      // Purchase in progress!
      this.presentAlert('Purchase in Progress', '')
      console.log(p)
    }, e => {
      console.log(e)
      this.presentAlert('Failed', `Failed to purchase: ${e}`);
    });
  }

  purchaseMedium(product: IAPProduct) {
    console.log(product)
    this.store.order("mgh_medium").then(p => {
      this.presentAlert('Purchase in Progress', '')
      console.log(p)
    }, e => {
      console.log(e)
      this.presentAlert('Failed', `Failed to purchase: ${e}`);
    });
  }

  purchaseLarge(product: IAPProduct) {
    console.log(product)
    this.store.order("mgh_large").then(p => {
      this.presentAlert('Purchase in Progress', '')
      console.log(p)
    }, e => {
      console.log(e)
      this.presentAlert('Failed', `Failed to purchase: ${e}`);
    });
  }

  purchaseSmallAnnual(product: IAPProduct) {
    console.log(product)
    this.store.order("mgh_small_annual").then(p => {
      this.presentAlert('Purchase in Progress', '')
      console.log(p)
    }, e => {
      console.log(e)
      this.presentAlert('Failed', `Failed to purchase: ${e}`);
    });
  }

  purchaseMediumAnnual(product: IAPProduct) {
    console.log(product)
    this.store.order("mgh_medium_annual").then(p => {
      this.presentAlert('Purchase in Progress', '')
      console.log(p)
    }, e => {
      console.log(e)
      this.presentAlert('Failed', `Failed to purchase: ${e}`);
    });
  }

  purchaseLargeAnnual(product: IAPProduct) {
    console.log(product)
    this.store.order("mgh_large_annual").then(p => {
      this.presentAlert('Purchase in Progress', '')
      console.log(p)
    }, e => {
      console.log(e)
      this.presentAlert('Failed', `Failed to purchase: ${e}`);
    });
  }

  async presentAlert(header, message) {
    const alert = await this.alertController.create({header, message, buttons: ['OK']});

    await alert.present();
  }

  // To comply with AppStore rules
  restore() {
    this.store.refresh();
  }

  /*
  openPartner() {
    this.showPartnerCode = true;
    this.cd.markForCheck()
    window.resizeTo(window.innerWidth, window.innerHeight)
  }
  */

  closeModal() {
    this.modalController.dismiss()
  }

  otpController(event, next, prev) {
    if (event.target.value.length < 1 && prev) {
      prev.setFocus()
    } else if (next && event.target.value.length > 0) {
      next.setFocus();
    } else {
      return 0;
    }
  }

  moveFocus(event, nextElement, previousElement) {
    if (event.keyCode == 8 && previousElement) {
      previousElement.setFocus();
    } else if (nextElement) {
      nextElement.setFocus();
    }
  }


  async showAlert(header, message, action) {
    const alert = await this.alertController.create({
      // cssClass: 'my-custom-class',
      header: header,
      // subHeader: `${this.products[0].price} ${this.products[0].currency}`,
      message: message,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        },
        {
          text: action,
          handler: () => {
            console.log('Confirm Okay');
            // this.purchase(this.products[0])
          }
        }
      ]
    });
    await alert.present();
  }
}
