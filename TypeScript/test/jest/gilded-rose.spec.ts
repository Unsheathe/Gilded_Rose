import { Item, GildedRose } from '@/gilded-rose';

describe('add a new item to the GildedRose inventory', () => {
  it('should foo', () => {
    const inventory = new GildedRose([new Item('foo', 0, 0)]);
    const items = inventory.updateQuality();
    expect(items[0].name).toBe('foo');
  });
});

describe('decrease the quality of an item every day if its not: Aged Brie, Backstage passes to a TAFKAL80ETC concert, or Sulfuras Hand of Ragnaros  ', ()=>{
  it('case isnt one of those things', ()=>{
    const inventory = new GildedRose([new Item('normieProduct', 10, 100)]);
    const items = inventory.updateQuality();
    expect(items[0].quality).toEqual(99)
  })
  it('it is one of the three items and has weird stuff instead', () =>{
    const stableQualityItems =  new GildedRose([ new Item("Sulfuras, Hand of Ragnaros", 0, 45), new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20), new Item("Aged Brie", 2, 0)])
    console.log(stableQualityItems)
   
    const items = stableQualityItems.updateQuality();

    expect(items[0].quality).toEqual(45)
    expect(items[1].quality).toEqual(21)
    expect(items[2].quality).toEqual(1)
  })
  
})

describe('check if the concert tickets value increases by two when concert is > 10 days away and three when > five days away and zero when concert is over', ()=>{
  it('increases by two when concert is > 10 days away', ()=>{
    const tenDaysAwayTicket = new GildedRose([new Item("Backstage passes to a TAFKAL80ETC concert", 9, 20)]);
    const items = tenDaysAwayTicket.updateQuality();
    expect(items[0].quality).toEqual(22)
  })
  it('increases by three when > five days away', ()=>{
    const fiveDaysAwayTicket = new GildedRose([new Item("Backstage passes to a TAFKAL80ETC concert", 4, 20)]);
    const items = fiveDaysAwayTicket.updateQuality();
    expect(items[0].quality).toEqual(23)
  })
  it('zero when concert is over', ()=>{
    const concertOverTicket = new GildedRose([new Item("Backstage passes to a TAFKAL80ETC concert", -1, 20)]);
    const items = concertOverTicket.updateQuality();
    expect(items[0].quality).toEqual(0)
  })
})

describe('if not fancy hand, the sellby date decreases', ()=>{
  it('no sellby change if is fancy hand', ()=>{
    const testRagnaros = new GildedRose([new Item("Sulfuras, Hand of Ragnaros", 4, 45)])
    const items = testRagnaros.updateQuality();
    expect(items[0].sellIn).toEqual(4)
  })
  it('sellby chanegs if isnt the fancy hand', ()=>{
    const notRagnaros = new GildedRose([new Item("mittens", 12, 3)])
    const items = notRagnaros.updateQuality();
    expect(items[0].sellIn).toEqual(11)
  })
})