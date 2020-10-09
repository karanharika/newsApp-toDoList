import { Component, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IonReorderGroup } from '@ionic/angular';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  @ViewChild(IonReorderGroup) reorderGroup: IonReorderGroup;

  public name: string;
  public id: string = "";
  public storageArray: Array<any> = [];
  public uniqueID: number;

  constructor(private storage: Storage) {
    this.storage.get('uid').then(value => {
      if (value === null) {
        this.uniqueID = 1;
        // console.log("UID assigned:", this.uniqueID);
        this.updateStorageArray("constructor:")
        // console.log("Constructor log State,", this.storageArray);
      }
      else {
        this.uniqueID = value;
        // console.log("UID already in storage:", this.uniqueID);
        this.updateStorageArray("constructor:")
        // console.log("Constructor log State,", this.storageArray);
      }
    });
  }

  clicked() {
    let tempObj = { id: this.uniqueID, task: this.name };
    this.storage.set(`task${this.uniqueID}`, tempObj);
    this.uniqueID++;
    // console.log(`UID incremented to ${this.uniqueID}.`)
    this.storage.set('uid', this.uniqueID);
    this.updateStorageArray("click,");
  }

  updateStorageArray(placeOfExe: string) {

    this.storageArray = [];
    for (let i = 1; i <= this.uniqueID; i++) {
      // console.log(`Update Loop activeted ${i} at ${placeOfExe}`)
      this.storage.get(`task${i}`).then(val => {
        if (val !== null) {
          this.storageArray.push(val);
          // console.log(`Value from .get at, ${placeOfExe}:`, val)
          // console.log("Updating storage Array at:", placeOfExe, this.storageArray)
        }
        else {
          // console.log(`task${i} dosen't exist.`)
        }
      });
    }
  }

  delete(post) {
    let index = post.id;
    this.storage.remove(`task${index}`);
    this.updateStorageArray("Delete");
  }

  doReorder(ev: any) {
    // The `from` and `to` properties contain the index of the item
    // when the drag started and ended, respectively
    // console.log('Dragged from index', ev.detail.from, 'to', ev.detail.to);

    // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. This method can also be called directly
    // by the reorder group
    ev.detail.complete();
  }

  toggleReorderGroup() {
    this.reorderGroup.disabled = !this.reorderGroup.disabled;
  }


  ionViewWillEnter() {

    // console.log("Got from Permanent Storage at viewEnter", this.storageArray);

  }
}
