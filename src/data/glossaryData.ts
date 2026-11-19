import { GlossaryTerm, DailyTip } from '../types';

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    id: 'golden-rule',
    term: 'Auksinė taisyklė',
    englishOrigin: 'The Golden Rule',
    category: 'bendras',
    categoryLabel: 'Pagarbos pagrindai',
    definition: 'Pats svarbiausias elgesio dėsnis: elgtis su kitais žmonėmis lygiai taip, kaip norėtum, kad jie elgtųsi su tavimi.',
    example: 'Jei nori, kad draugai su tavimi dalintųsi žaislais ir būtų draugiški, pirmiausia pats su jais dalinkis.',
    situation: 'Kai kyla pagunda pasakyti piktą žodį, pagalvok: „Ar man patiktų, jei man taip pasakytų?“',
    icon: '❤️'
  },
  {
    id: 'hospitality',
    term: 'Svetingumas',
    englishOrigin: 'Hospitality',
    category: 'svetingumas',
    categoryLabel: 'Svečiai ir namai',
    definition: 'Nuoširdus rūpestis savo svečiais – padėti jiems jaustis jaukiai, saugiai, laukiamiems ir ypatingiems.',
    example: 'Pasitikus draugą prie durų, pasiūlyti jam atsigerti vandens, padėti pakabinti striukę ir atiduoti patogiausią kėdę.',
    situation: 'Atėjus draugui į svečius, šeimininkas sako: „Labas, užeik! Ką šiandien norėtum pažaisti tu?“ vietoj to, kad reikalautų daryti tik savo norus.',
    icon: '🏡'
  },
  {
    id: 'hostess-gift',
    term: 'Šeimininkės dovana (lauktuvė)',
    englishOrigin: 'Hostess Gift',
    category: 'svetingumas',
    categoryLabel: 'Svečiai ir namai',
    definition: 'Nedidelė, nuoširdi dovanėlė, kurią svečias atneša draugo tėveliams ar šeimininkams kaip padėką už pakvietimą.',
    example: 'Savo rankomis nuskinta lauko gėlytė, kepti sausainiai, maža žvakutė ar vazoninis augalėlis.',
    situation: 'Eidamas vakarienės ar nakvynės pas klasioką, paduodi jo mamai gėlių žiedą ir sakai: „Ačiū, kad mane pakvietėte!“',
    icon: '🎁'
  },
  {
    id: 'tact',
    term: 'Taktiškumas',
    englishOrigin: 'Tact',
    category: 'bendraujant',
    categoryLabel: 'Bendravimas',
    definition: 'Mokėjimas apgalvoti savo žodžius ir jausmus, kad neįskaudintum kito žmogaus net sakydamas tiesą.',
    example: 'Jei draugo piešinys neatrodo tobulas, pagirti jo ryškias spalvas ir pastangas, o ne sakyti: „Koks baisus piešinys!“',
    situation: '„Niekada nereikės atsiprašinėti už žodžius, kurių neištarei.“ Taktiškas vaikas saugo savo liežuvį nuo žeidžiančių žodžių.',
    icon: '🗣️'
  },
  {
    id: 'fair-play',
    term: 'Garbingas žaidimas',
    englishOrigin: 'Fair Play & Sportsmanship',
    category: 'sportas',
    categoryLabel: 'Sportas ir žaidimai',
    definition: 'Žaidimas griežtai laikantis taisyklių, neapgaudinėjant, gerbiant varžovus, teisėjus ir oriai priimant tiek pergalę, tiek pralaimėjimą.',
    example: 'Pralaimėjus stalo ar krepšinio žaidimą, paspausti varžovui ranką ir pasakyti: „Puikiai žaidei, sveikinu!“',
    situation: 'Jei kamuolys išriedėjo už linijos nuo tavo kojos, pats sąžiningai pripažįsti: „Mano kaltė, kamuolys jūsų!“',
    icon: '⚽'
  },
  {
    id: 'table-setting',
    term: 'Stalo serviravimas',
    englishOrigin: 'Setting the Table 101',
    category: 'stalas',
    categoryLabel: 'Stalo etiketas',
    definition: 'Taisyklingas lėkštės, įrankių, stiklinės ir servetėlės išdėstymas ant stalo prieš valgį.',
    example: 'Šakutė dedama kairėje, peilis dešinėje su ašmenimis atsuktais į lėkštę, šaukštas šalia peilio, stiklinė viršuje dešinėje.',
    situation: 'Padėdamas tėvams paruošti vakarienės stalą, visus įrankius išdėstai tvarkingai, kad valgyti būtų patogu.',
    icon: '🍽️'
  },
  {
    id: 'thank-you-note',
    term: 'Padėkos laiškelis',
    englishOrigin: 'Thank-You Note',
    category: 'bendraujant',
    categoryLabel: 'Bendravimas',
    definition: 'Ranka rašytas trumpas laiškelis ar atvirukas, kuriuo nuoširdžiai padėkojama už gautą dovaną, viešnagę ar pagalbą.',
    example: '„Miela močiute, ačiū už knygelę, man buvo labai įdomu ją skaityti!“',
    situation: 'Po gimtadienio šventės ar savaitgalio viešnagės pas draugą išsiunčiamas ar įteikiamas mielas padėkos lapelis.',
    icon: '💌'
  },
  {
    id: 'self-respect',
    term: 'Savigarba ir asmeninė švara',
    englishOrigin: 'Self-Respect & Hygiene',
    category: 'bendras',
    categoryLabel: 'Švara ir apranga',
    definition: 'Pagarba savo kūnui ir sveikatai: kasdienis prausimasis, dantų valymas, švarių drabužių vilkėjimas ir tvarkingumas.',
    example: 'Nusiprausti ryte, persirengti švariomis kojinėmis ir susišukuoti plaukus prieš einant į mokyklą.',
    situation: 'Vaikas, kuris gerbia save, supranta, kad tvarka ir švara džiugina ne tik jį patį, bet ir visus aplinkinius.',
    icon: '🧼'
  },
  {
    id: 'vampire-cough',
    term: 'Alkūnės čiaudulys („vampyro poza“)',
    englishOrigin: 'Cough & Sneeze Etiquette',
    category: 'bendras',
    categoryLabel: 'Higiena',
    definition: 'Mandagus čiaudėjimo ir kosėjimo būdas į sulenktos rankos alkūnės vidų, kai po ranka nėra popierinės nosinaitės.',
    example: 'Užsidengti burną alkūne, kad bacilos nepatektų ant delnų ir neterštų durų rankenų ar klasiokų daiktų.',
    situation: 'Staiga užėjus norui nusičiaudėti pamokoje, prisitrauki alkūnę prie nosies ir saugiai nusičiaudi.',
    icon: '🤧'
  },
  {
    id: 'body-language',
    term: 'Akių kontaktas ir laikysena',
    englishOrigin: 'Eye Contact & Poise',
    category: 'bendraujant',
    categoryLabel: 'Bendravimas',
    definition: 'Žiūrėjimas pašnekovui į akis pasisveikinant ar kalbantis, tiesi nugara ir šypsena, rodanti drąsą ir geranoriškumą.',
    example: 'Tariant „Labas rytas, mokytoja“, žiūrėti į mokytojos akis ir aiškiai ištarti žodžius.',
    situation: 'Susipažįstant su nauju klasioku, nesižvalgai į grindis, o drąsiai nusišypsai ir ištiesi ranką.',
    icon: '👀'
  }
];

export const DAILY_TIPS: DailyTip[] = [
  {
    id: 'tip-morning',
    dayTime: 'Rytas',
    title: 'Ryte – šypsena ir švarios kojinės',
    tip: 'Pradėk dieną nuo švaros ritualo: nusiprausk veidą, išsivalyk dantis ir apsirenk švarius drabužius. Niekada netrauk nešvarių drabužių iš skalbinių krepšio!',
    actionableStep: 'Prieš išeidamas iš namų, pasakyk „Labas rytas“ šeimos nariams ir nusišypsok veidrodyje.',
    icon: '🌅',
    quote: '„Kaip pradedi rytą, tokia bus ir visa tavo diena.“'
  },
  {
    id: 'tip-school',
    dayTime: 'Mokykla',
    title: 'Mokykloje – prilaikyk duris ir žiūrėk į akis',
    tip: 'Eidamas pro duris visada apsidairyk: jei iš paskos eina mokytojas ar klasiokas, prilaikyk duris. Tai paprastas, bet kilnus poelgis.',
    actionableStep: 'Sveikindamasis su mokytoju, aiškiai ištark pasisveikinimą ir pažvelk į akis.',
    icon: '🏫',
    quote: '„Maži mandagumo veiksmai sukuria didelę draugystę.“'
  },
  {
    id: 'tip-lunch',
    dayTime: 'Pietūs',
    title: 'Prie stalo – servetėlė ant kelių ir „prašau paduoti“',
    tip: 'Vos atsisėdus prie stalo, servetėlę pasidėk ant kelių. Jei negali pasiekti duonos ar druskos, nesitiesk per kitų lėkštes – mandagiai paprašyk kaimyno.',
    actionableStep: 'Kramtyk tik užčiaupta burna ir niekada nekalbėk pilna burna.',
    icon: '🍽️',
    quote: '„Stalo etiketas leidžia visiems prie stalo jaustis jaukiai.“'
  },
  {
    id: 'tip-visiting',
    dayTime: 'Svečiuose',
    title: 'Svečiuose – gerbk šeimininkų namų taisykles',
    tip: 'Nusiauk batus prie durų, neknisk uždarytų spintelių ir niekada nesakyk: „O pas mus namuose žaislai geresni“. Būk dėkingas už kiekvieną vaišingumo akimirką.',
    actionableStep: 'Prieš išeidamas, padėk draugui sutvarkyti kambarį ir garsiai padėkok jo tėvams.',
    icon: '🏡',
    quote: '„Geras svečias palieka namus švaresnius ir linksmesnius nei rado.“'
  },
  {
    id: 'tip-public',
    dayTime: 'Vieša vieta',
    title: 'Kine ar teatre – išjungtas telefonas ir tyla',
    tip: 'Viešose vietose (autobuse, teatre, bibliotekoje) kalbėk pusbalsiu. Teatre ar koncerte išjunk telefono garsus ir neplepėk renginio metu.',
    actionableStep: 'Jei reikia atsikosėti – prisidenk burną vienkartine nosinaite.',
    icon: '🎭',
    quote: '„Pagarba viešoje erdvėje rodo tavo vidinę kultūrą.“'
  },
  {
    id: 'tip-evening',
    dayTime: 'Vakaras',
    title: 'Vakare – įvertink dieną ir ištark „ačiū“',
    tip: 'Prieš miegą pagalvok, kam šiandien gali būti dėkingas: mamai už skanią vakarienę, draugui už smagų žaidimą, tėčiui už pagalbą.',
    actionableStep: 'Nusiųsk trumpą padėkos žinutę ar tiesiog apkabink tėvelius.',
    icon: '🌙',
    quote: '„Dėkinga širdis yra pati laimingiausia širdis.“'
  }
];
