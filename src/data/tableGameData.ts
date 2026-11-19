export interface TableSlot {
  id: string;
  name: string;
  expectedItemId: string;
  hint: string;
  positionDesc: string;
  gridArea: string;
}

export interface TableItemOption {
  id: string;
  name: string;
  iconType: string;
  description: string;
  correctSlotId: string;
  etiquetteFact: string;
}

export const TABLE_SLOTS: TableSlot[] = [
  {
    id: 'slot-plate',
    name: 'Lėkštė',
    expectedItemId: 'plate',
    hint: 'Pagrindinis stalo akcentas – vieta pačiame centre!',
    positionDesc: 'Centras',
    gridArea: 'center'
  },
  {
    id: 'slot-fork',
    name: 'Šakutė',
    expectedItemId: 'fork',
    hint: 'Šakutė VISADA dedama kairėje lėkštės pusėje.',
    positionDesc: 'Kairėje lėkštės pusėje',
    gridArea: 'left'
  },
  {
    id: 'slot-knife',
    name: 'Peilis',
    expectedItemId: 'knife',
    hint: 'Peilis dedamas dešinėje, o ašmenys atsukti į lėkštę!',
    positionDesc: 'Dešinėje lėkštės pusėje (ašmenys į lėkštę)',
    gridArea: 'right-inner'
  },
  {
    id: 'slot-spoon',
    name: 'Šaukštas',
    expectedItemId: 'spoon',
    hint: 'Šaukštas dedamas dešinėje, šalia peilio (išorėje).',
    positionDesc: 'Dešinėje pusėje, šalia peilio',
    gridArea: 'right-outer'
  },
  {
    id: 'slot-glass',
    name: 'Stiklinė / Taurė',
    expectedItemId: 'glass',
    hint: 'Gėrimo stiklinė dedama viršuje dešinėje, virš peilio.',
    positionDesc: 'Viršuje dešinėje (virš peilio)',
    gridArea: 'top-right'
  },
  {
    id: 'slot-napkin',
    name: 'Servetėlė',
    expectedItemId: 'napkin',
    hint: 'Servetėlė dedama kairėje šalia šakutės arba pačioje lėkštėje.',
    positionDesc: 'Kairėje pusėje arba ant lėkštės',
    gridArea: 'far-left'
  }
];

export const TABLE_ITEMS: TableItemOption[] = [
  {
    id: 'plate',
    name: 'Pietų lėkštė',
    iconType: 'circle-dot',
    description: 'Graži švari lėkštė patiekalams patiekti.',
    correctSlotId: 'slot-plate',
    etiquetteFact: 'Lėkštė dedama per du pirštus nuo stalo krašto.'
  },
  {
    id: 'fork',
    name: 'Pietų šakutė',
    iconType: 'fork',
    description: 'Šakutė su dantukais į viršų.',
    correctSlotId: 'slot-fork',
    etiquetteFact: 'Šakutė laikoma kairėje rankoje, kai pjaustome peiliu.'
  },
  {
    id: 'knife',
    name: 'Pietų peilis',
    iconType: 'knife',
    description: 'Peilis su ašmenimis, atsuktais į lėkštės vidų.',
    correctSlotId: 'slot-knife',
    etiquetteFact: 'Peilio ašmenys nukreipiami į lėkštę – tai taikos ir saugumo ženklas.'
  },
  {
    id: 'spoon',
    name: 'Sriubos šaukštas',
    iconType: 'spoon',
    description: 'Apvalus šaukštas skaniai sriubai.',
    correctSlotId: 'slot-spoon',
    etiquetteFact: 'Sriubą semiame nuo savęs tolyn, kad neaptaškytume drabužių!'
  },
  {
    id: 'glass',
    name: 'Vandens stiklinė',
    iconType: 'glass',
    description: 'Skaidri stiklinė vandeniui ar sultims.',
    correctSlotId: 'slot-glass',
    etiquetteFact: 'Vandens stiklinė stovi virš peilio smaigalio dešinėje pusėje.'
  },
  {
    id: 'napkin',
    name: 'Medvilninė servetėlė',
    iconType: 'napkin',
    description: 'Tvarkingai sulankstyta stalo servetėlė.',
    correctSlotId: 'slot-napkin',
    etiquetteFact: 'Vos atsisėdus prie stalo, servetėlę išskleidžiame ir pasidedame ant kelių.'
  }
];
