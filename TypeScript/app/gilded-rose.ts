export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  //filterCases(){
  updateQuality(){
    const specialCases = ['Aged Brie', "Sulfuras, Hand of Ragnaros", 'Backstage passes to a TAFKAL80ETC concert', 'Conjured Mana Cake']//
    for (let i = 0; i < this.items.length; i++) {
      if (!specialCases.includes(this.items[i].name)){
        this.updateData(i)
      } else {this.edgeCases(i)}
    }
    return this.items
  }
  updateData(i){
    this.items[i].sellIn >= 0 ? this.items[i].sellIn -= 1 : null
    this.items[i].sellIn >= 0 ? this.items[i].quality -= 1 : this.items[i].quality -= 2 //quality decreases faster if sellby passes
    this.items[i].quality <0 ? this.items[i].quality = 0 : null //quality should not be below 0
  }
  edgeCases(i){
    if (this.items[i].name == 'Aged Brie'){
      this.items[i].quality < 50 ? this.items[i].quality++ : null
    }
    if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert'){//
      this.items[i].sellIn < 0 ? this.items[i].quality=0 : this.items[i].sellIn <5 ? this.items[i].quality += 3 : this.items[i].sellIn <10 ? this.items[i].quality +=2 : this.items[i].quality++
      this.items[i].sellIn--
    }
    if (this.items[i].name == 'Conjured Mana Cake'){//
      this.items[i].quality -=2
      this.items[i].sellIn --
    }
  }
}

