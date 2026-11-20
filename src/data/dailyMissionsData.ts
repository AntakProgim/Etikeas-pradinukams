import { DailyMission } from '../types';

export const DAILY_MISSIONS: DailyMission[] = [
  {
    id: 'mission_thank_you_small',
    dayIndex: 0,
    title: 'Padėka už mažą smulkmeną',
    category: 'bendravimas',
    categoryLabel: 'Bendravimas',
    icon: '✨',
    goal: 'Šiandien pasakyk nuoširdų „ačiū“ bent vienam žmogui už mažą paslaugą ar smulkmeną.',
    context: 'Dažnai pamirštame padėkoti už paprastus dalykus – kai kas nors palaiko duris, paduoda nukritusį pieštuką ar paruošia arbatos.',
    goldenRuleQuote: '„Padėka yra maža švieselė, kuri pradžiugina kito žmogaus širdį.“',
    steps: [
      'Pastebėk, kai kas nors tau padeda ar padaro ką nors mielo.',
      'Pažiūrėk žmogui į akis, nusišypsok ir aiškiai ištark „Ačiū!“.',
      'Pajusk, kaip gera dovanoti dėkingumą.'
    ],
    starsReward: 5
  },
  {
    id: 'mission_table_napkin',
    dayIndex: 1,
    title: 'Servetėlė ant kelių prie stalo',
    category: 'stalas',
    categoryLabel: 'Stalo etiketas',
    icon: '🍽️',
    goal: 'Šiandien per pietus ar vakarienę vos atsisėdęs pasidėk servetėlę ant kelių.',
    context: 'Servetėlė apsaugo rūbus nuo trupinių ir padažo lašų, o baigus valgyti tvarkingai padedama kairėje lėkštės pusėje.',
    goldenRuleQuote: '„Tikras džentelmenas ir ledi servetėlę pasitiesia dar prieš paimdami šakutę.“',
    steps: [
      'Atsisėsk tiesiai prie stalo.',
      'Išskleisk servetėlę ir ramiai pasidėk ją ant kelių.',
      'Po valgio ją padėk šalia lėkštės (niekada nemesk į pačią lėkštę!).'
    ],
    starsReward: 5
  },
  {
    id: 'mission_eye_greeting',
    dayIndex: 2,
    title: 'Pasisveikinimas žiūrint į akis',
    category: 'bendravimas',
    categoryLabel: 'Bendravimas',
    icon: '👀',
    goal: 'Pasisveikink su mokytoju, kaimynu ar draugu žiūrėdamas tiesiai į akis ir nusišypsodamas.',
    context: 'Žiūrėjimas į akis parodo, kad gerbi pašnekovą ir nuoširdžiai džiaugiesi jį matydamas.',
    goldenRuleQuote: '„Šypsena ir akių kontaktas – tai universali draugystės kalba.“',
    steps: [
      'Pamatęs pažįstamą žmogų, sustok sekundei.',
      'Pažvelk tiesiai į akis, nusišypsok ir pasakyk „Labas rytas!“ arba „Laba diena!“.',
      'Būk linksmas ir pasitikintis savimi.'
    ],
    starsReward: 5
  },
  {
    id: 'mission_hold_door',
    dayIndex: 3,
    title: 'Pagarba prie durų',
    category: 'mokykla',
    categoryLabel: 'Viešos vietos',
    icon: '🚪',
    goal: 'Eidamas pro duris mokykloje, parduotuvėje ar namuose, palaikyk jas einančiam iš paskos.',
    context: 'Niekada nepaleisk sunkių durų, kad jos neužsitrenktų prieš kito žmogaus nosį.',
    goldenRuleQuote: '„Palaikytos durys – paprasčiausias būdas parodyti rūpestį aplinkiniais.“',
    steps: [
      'Prieš žengdamas pro duris, atsisuk ir pažiūrėk, ar kas nors eina iš paskos.',
      'Prilaikyk duris, kol žmogus prieis ar praeis.',
      'Jei tau padėkos, linksmai atsakyk „Nėra už ką!“. '
    ],
    starsReward: 5
  },
  {
    id: 'mission_pass_food',
    dayIndex: 4,
    title: 'Mandagus prašymas prie stalo',
    category: 'stalas',
    categoryLabel: 'Stalo etiketas',
    icon: '🥖',
    goal: 'Užuot tiesęs ranką per visą stalą, paprašyk kito paduoti maistą: „Prašau paduoti...“',
    context: 'Siekimas per stalą gali apversti stiklines ar užkliudyti kaimyno lėkštę. Visada paprašykime!',
    goldenRuleQuote: '„Žodis „prašau“ prie stalo yra ilgesnis už bet kokią ranką.“',
    steps: [
      'Pastebėk norimą patiekalą toliau ant stalo.',
      'Nuleisk ranką ir kreipkis į artimiausią žmogų: „Ar galėtum man paduoti duoną, prašau?“.',
      'Gavęs maistą, nepamiršk pasakyti „Ačiū!“. '
    ],
    starsReward: 5
  },
  {
    id: 'mission_clean_sink',
    dayIndex: 5,
    title: 'Švarus vonios kambarys',
    category: 'higiena',
    categoryLabel: 'Higiena ir tvarka',
    icon: '🧼',
    goal: 'Nusiprausęs rankas ar išsivalęs dantis, nuvalyk kriauklės kraštus ir pakabink rankšluostį.',
    context: 'Vonios kambarys po tavęs turi likti toks švarus, kad kitam šeimos nariui būtų malonu įeiti.',
    goldenRuleQuote: '„Tikra švara prasideda nuo tvarkos, kurią palieki po savęs.“',
    steps: [
      'Kruopščiai nusiplauk rankas su muilu bent 20 sekundžių.',
      'Nusausink rankas į savo rankšluostį ir tvarkingai jį pakabink.',
      'Pažiūrėk į kriauklę: nuplauk dantų pastos ar muilo likučius.'
    ],
    starsReward: 5
  },
  {
    id: 'mission_help_clear_table',
    dayIndex: 6,
    title: 'Pagalbos ranka po valgio',
    category: 'namai',
    categoryLabel: 'Namai ir šeima',
    icon: '🧽',
    goal: 'Po vakarienės ar pietų nunešk savo lėkštę ir paklausk: „Ar galiu padėti nuvalyti stalą?“',
    context: 'Šeimos nariai džiaugiasi, kai vaikai rodo iniciatyvą ir padeda buityje be atskiro prašymo.',
    goldenRuleQuote: '„Padėti namuose – tai sakyti „Aš jus myliu“ savo darbais.“',
    steps: [
      'Pavalgius paklausk, ar visi baigė valgyti.',
      'Nunešk savo lėkštę ir įrankius į kriauklę arba indaplovę.',
      'Pasiūlyk nušluostyti stalą ar nunešti likusius puodelius.'
    ],
    starsReward: 5
  },
  {
    id: 'mission_give_compliment',
    dayIndex: 7,
    title: 'Nuoširdus pagyrimas draugui',
    category: 'draugai',
    categoryLabel: 'Draugystė',
    icon: '💬',
    goal: 'Pagyirk draugo, brolio ar sesės pastangas, gražų piešinį ar gerą poelgį.',
    context: 'Pagyrimas pakelia nuotaiką ir skatina draugą stengtis dar labiau.',
    goldenRuleQuote: '„Geras žodis nieko nekainuoja, bet sušildo visai dienai.“',
    steps: [
      'Pastebėk, ką kiti daro gražiai ar gerai.',
      'Pasakyk tiesiai: „Tavo piešinys nuostabus!“ arba „Tu labai gerai sužaidei!“.',
      'Būk nuoširdus ir džiaukis kito sėkme.'
    ],
    starsReward: 5
  },
  {
    id: 'mission_ask_permission',
    dayIndex: 8,
    title: 'Atsiklausk prieš imdamas',
    category: 'bendravimas',
    categoryLabel: 'Pagarba privatumui',
    icon: '🔑',
    goal: 'Prieš paimdamas bet kokį svetimą daiktą, žaislą ar knygą, mandagiai paprašyk leidimo.',
    context: 'Svetimi daiktai turi savo šeimininkus. Imti be leidimo yra nemandagu ir sukelia nesusipratimų.',
    goldenRuleQuote: '„Pagarba kito daiktams yra pagarba pačiam žmogui.“',
    steps: [
      'Prieš liesdamas daiktą, susirask jo savininką.',
      'Paklausk: „Ar galiu pasiskolinti šį pieštuką kelioms minutėms?“.',
      'Pabaigęs naudotis, grąžink į vietą su padėka.'
    ],
    starsReward: 5
  },
  {
    id: 'mission_listen_patiently',
    dayIndex: 9,
    title: 'Kantrybė klausantis kito',
    category: 'bendravimas',
    categoryLabel: 'Bendravimas',
    icon: '👂',
    goal: 'Šiandien pokalbyje išklausyk pašnekovą iki galo, nė karto jo nepertraukdamas.',
    context: 'Pertraukti kalbantį žmogų yra nemandagu. Leisk jam pabaigti sakinį ir mintį.',
    goldenRuleQuote: '„Mokėjimas išklausyti yra viena gražiausių mandagumo savybių.“',
    steps: [
      'Kai kas nors pasakoja istoriją, susikaupk ir klausykis.',
      'Palauk, kol žmogus nutils ir baigs sakinį.',
      'Tik tada pakelk ranką arba pradėk sakyti savo mintį.'
    ],
    starsReward: 5
  },
  {
    id: 'mission_fair_play_highfive',
    dayIndex: 10,
    title: 'Garbingas žaidėjas',
    category: 'sportas',
    categoryLabel: 'Sportas ir žaidimai',
    icon: '🤝',
    goal: 'Po bet kokio stalo ar sportinio žaidimo paspausk ranką arba duok „penkis“ varžovams.',
    context: 'Nesvarbu, ar laimėjai, ar pralaimėjai – svarbiausia draugystė ir džiaugsmas žaidžiant kartu.',
    goldenRuleQuote: '„Tikras čempionas moka džiaugtis pergale be puikybės ir pralaimėti su šypsena.“',
    steps: [
      'Pasibaigus žaidimui, nusišypsok visiems dalyviams.',
      'Pasakyk: „Ačiū už puikų žaidimą!“.',
      'Jei laimėjo kitas – nuoširdžiai pasveikink jį.'
    ],
    starsReward: 5
  },
  {
    id: 'mission_cough_in_elbow',
    dayIndex: 11,
    title: 'Saugus kosulys į alkūnę',
    category: 'higiena',
    categoryLabel: 'Higiena',
    icon: '🛡️',
    goal: 'Prireikus nusičiaudėti ar kosėti, prisidenk burną vidine alkūnės puse arba nosinaite.',
    context: 'Čiaudėjimas į delną perneša bakterijas ant durų rankenų ir žaislų. Alkūnė – saugiausias pasirinkimas!',
    goldenRuleQuote: '„Rūpinkis draugų sveikata taip pat, kaip rūpiniesi savąja.“',
    steps: [
      'Pajutęs norą čiaudėti, pakelk ranką ir pasuk veidą į alkūnės linkį.',
      'Nusikosėk ar nusičiaudėk į alkūnės audinį.',
      'Jei buvai šalia kitų, tyliai pridurk: „Atsiprašau“.'
    ],
    starsReward: 5
  },
  {
    id: 'mission_thank_you_note',
    dayIndex: 12,
    title: 'Slaptas padėkos raštelis',
    category: 'namai',
    categoryLabel: 'Svetingumas ir dėkingumas',
    icon: '💌',
    goal: 'Parašyk mažą ranka rašytą raštelį mamai, tėčiui, mokytojui ar draugui: „Ačiū, kad esi!“.',
    context: 'Popierinis ranka rašytas laiškelis yra viena šilčiausių dovanų pasaulyje.',
    goldenRuleQuote: '„Padėkos raštelis primena, kad pastebime kito gerumą.“',
    steps: [
      'Paimk mažą popieriaus lapelį ir spalvotą pieštuką.',
      'Parašyk trumpą žinutę: kam skiriama ir už ką dėkoji.',
      'Padėk ant stalo, įdėk į kuprinę ar paduok su šypsena.'
    ],
    starsReward: 5
  },
  {
    id: 'mission_excuse_from_table',
    dayIndex: 13,
    title: 'Mandagus pasiprašymas nuo stalo',
    category: 'stalas',
    categoryLabel: 'Stalo etiketas',
    icon: '🪑',
    goal: 'Baigęs valgyti, nepašok staiga, o ramiai atsiklausk: „Ačiū už skanų maistą, ar galiu eiti?“',
    context: 'Prie stalo valgome kartu. Atsiklausti prieš nueinant rodo didelę pagarbą šeimininkams ir maisto gamintojui.',
    goldenRuleQuote: '„Paskutinis akordas prie stalo – nuoširdi padėka virėjui.“',
    steps: [
      'Padėk įrankius lygiagrečiai lėkštėje (4:20 val. pozicijoje).',
      'Nuvalyk lūpas servetėle.',
      'Atsisuk į šeimininką ar tėvus ir mandagiai pasiprašyk.'
    ],
    starsReward: 5
  }
];

export function getTodayMission(): DailyMission {
  const now = new Date();
  // Compute day index from day of year
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  
  const missionIndex = dayOfYear % DAILY_MISSIONS.length;
  return DAILY_MISSIONS[missionIndex];
}

export function getTodayDateString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
