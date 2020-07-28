export interface Perk {
  name: string;
  image: string;
}

export const perk1Array: Perk[] = [
  {
    name: 'Cold Blooded',
    image: 'perk1/ColdBlooded.png'
  },
  {
    name: 'Double Time',
    image: 'perk1/DoubleTime.png'
  },
  {
    name: 'EOD',
    image: 'perk1/EOD.png'
  },
  {
    name: 'Kill Chain',
    image: 'perk2/KillChainnew.png'
  },
  {
    name: 'Quick Fix',
    image: 'perk1/QuickFix.png'
  },
  {
    name: 'Scavenger',
    image: 'perk1/Scavenger.png'
  }
];

export const perk2Array: Perk[] = [{
  name: 'Ghost',
  image: 'perk2/Ghost.png'
},
{
  name: 'Hardline',
  image: 'perk2/Hardline.png'
},
{
  name: 'High Alert',
  image: 'perk2/HighAlert.png'
},
{
  name: 'Overkill',
  image: 'perk1/Overkillnew.png'
},
{
  name: 'Pointman',
  image: 'perk2/Pointman.png'
},
{
  name: 'Restock',
  image: 'perk2/Restock.png'
}
];

export const perk3Array: Perk[] = [{
  name: 'Amped',
  image: 'perk3/Amped.png'
},
{
  name: 'Battle Hardened',
  image: 'perk3/BattleHardened.png'
},
{
  name: 'Shrapnel',
  image: 'perk3/Shrapnel.png'
},
{
  name: 'Spotter',
  image: 'perk3/Spotter.png'
},
{
  name: 'Tracker',
  image: 'perk3/Tracker.png'
},
{
  name: 'Tune Up',
  image: 'perk3/TuneUp.png'
}
];

export function randomPerks() {
  return {
    perk1: perk1Array[Math.floor(Math.random() * perk1Array.length)],
    perk2: perk2Array[Math.floor(Math.random() * perk2Array.length)],
    perk3: perk3Array[Math.floor(Math.random() * perk3Array.length)]
  };
}