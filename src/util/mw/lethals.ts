export interface Lethal {
  name: string,
  image: string
}

export const lethalsArray = [{
  name: 'Claymore',
  image: 'lethal/Claymore.png'
},
{
  name: 'Frag Grenade',
  image: 'lethal/FragGrenade.png'
},
{
  name: 'Molotov Cocktail',
  image: 'lethal/MolotovCocktail.png'
},
{
  name: 'C4',
  image: 'lethal/C4.png'
},
{
  name: 'Semtex',
  image: 'lethal/Semtex.png'
},
{
  name: 'Throwing Knife',
  image: 'lethal/ThrowingKnife.png'
},
{
  name: 'Proximity Mine',
  image: 'lethal/ProximityMine.png'
},
{
  name: 'Thermite',
  image: 'lethal/Thermite.png'
}
];

export const tacticalsArray = [{
  name: 'Flash Grenade',
  image: 'tactical/FlashGrenade.png'
},
{
  name: 'Stun Grenade',
  image: 'tactical/StunGrenade.png'
},
{
  name: 'Smoke Grenade',
  image: 'tactical/SmokeGrenade.png'
},
{
  name: 'Snapshot Grenade',
  image: 'tactical/SnapshotGrenade.png'
},
{
  name: 'Heartbeat Sensor',
  image: 'tactical/HeartbeatSensor.png'
},
{
  name: 'Gas Grenade',
  image: 'tactical/GasGrenade.png'
},
{
  name: 'Stim',
  image: 'tactical/Stim.png'
},
{
  name: 'Decoy Grenade',
  image: 'tactical/DecoyGrenade.png'
}
];

export function randomLethals() {
  return {
    lethal: lethalsArray[Math.floor(Math.random() * lethalsArray.length)],
    tactical: tacticalsArray[Math.floor(Math.random() * tacticalsArray.length)]
  }
}