import { Scenario } from '../types';

export const SCENARIOS: Scenario[] = [
  {
    id: 'scen-dinner-host',
    title: 'Vakarienė su šeimininkais ir sviesto taisyklė',
    category: 'dining',
    categoryLabel: 'Vakarienė su šeimininkais',
    icon: 'UtensilsCrossed',
    character: 'Lukas',
    difficulty: 'Pradedantysis',
    situation: 'Esi pakviestas vakarienės į draugo Mato namus. Prie stalo patiektas šiltas batonas ir sviestas. Taip pat nori paimti druskinę, kuri stovi toli kitoje stalo pusėje.',
    choices: [
      {
        text: 'Ištiesti ranką per Mato mamos lėkštę ir pasiekti druskinę, o visą batono riekę iškart storai ištepti sviestu.',
        isCorrect: false,
        feedback: 'Tiestis per kito žmogaus lėkštę yra nemandagu (galima netyčia ką nors išversti), o tepti visą riekę iš anksto prieštarauja stalo etiketo taisyklėms.',
        etiquetteLesson: 'Pagal knygą: druskos ar duonos paprašome mandagiai: „Prašau, perduokite druską“. Duona atsilaužiama po vieną kąsnį ir tepamas tik tas atsilaužtas kąsnelis!'
      },
      {
        text: 'Mandagiai paprašyti: „Mato mama, ar galėtumėte prašau perduoti druską?“, o nuo batono riekės pirštais atsilaužti vieną kąsnelį ir tik jį patepti sviestu.',
        isCorrect: true,
        feedback: 'Tobulas stalo elgesys! Šeimininkai bus sužavėti tavo gražiomis manieromis.',
        etiquetteLesson: 'Knyga moko: „Niekada nesitiesk per stalą. Duonos riekę valgome laužydami mažais kąsneliais, o maistas prie stalo perduodamas ratu į dešinę.“'
      },
      {
        text: 'Nieko neprašyti, pūsti burbulus per šiaudelį į stiklinę ir laukti, kol kas nors pastebės.',
        isCorrect: false,
        feedback: 'Burbulų pūtimas ir tylus laukimas sukelia triukšmą ir problemų neišsprendžia.',
        etiquetteLesson: 'Mandagus prašymas su žodeliu „Prašau“ visada yra teisingas pasirinkimas.'
      }
    ]
  },
  {
    id: 'scen-public-intro',
    title: 'Pristatymas viešai ir susipažinimas',
    category: 'presentation',
    categoryLabel: 'Pristatymas ir pažintis',
    icon: 'MessageSquareQuote',
    character: 'Austėja',
    difficulty: 'Pradedantysis',
    situation: 'Į tavo mokyklos klasę atėjo nauja mokinė Emilija. Mokytoja paprašo tavęs per pertrauką supažindinti Emiliją su kitais draugais ir suaugusiais svečiais.',
    choices: [
      {
        text: 'Nusijuokti, parodyti į Emiliją pirštu ir nubėgti žaisti su savo senais draugais.',
        isCorrect: false,
        feedback: 'Rodyti pirštu ir palikti naujoką vieną yra labai nejautru. Naujas vaikas jausis atstumtas ir liūdnas.',
        etiquetteLesson: 'Tikras etiketo herojus padeda naujokams jaustis drąsiai ir jaukiai.'
      },
      {
        text: 'Prieiti, nusišypsoti, pažvelgti į akis, aiškiai pasakyti: „Labas, Emilija, aš esu Austėja, malonu susipažinti!“ ir pristatyti ją draugams: „Susipažinkite, čia Emilija.“',
        isCorrect: true,
        feedback: 'Nuostabus pristatymas! Aiškus akių kontaktas, šypsena ir mandagus vardo ištarimas yra etiketo viršūnė.',
        etiquetteLesson: 'Knygos skyriuje apie susipažinimą rašoma: prisistatant svarbiausia žiūrėti į akis, ištarti savo vardą ir pasakyti „Labai malonu susipažinti“.'
      },
      {
        text: 'Žiūrėti į grindis, bumbėti po nosimi ir laukti, kol kas nors kitas pradės pokalbį.',
        isCorrect: false,
        feedback: 'Nuleistas žvilgsnis ir neryžtingumas rodo pasitikėjimo trūkumą.',
        etiquetteLesson: 'Drąsus akių kontaktas ir pasisveikinimas parodo pagarbą ir pasitikėjimą.'
      }
    ]
  },
  {
    id: 'scen-broken-vase',
    title: 'Netyčia sudaužyta vaza svečiuose',
    category: 'visiting',
    categoryLabel: 'Svečiuose ir sąžiningumas',
    icon: 'Sparkles',
    character: 'Tomas',
    difficulty: 'Pradedantysis',
    situation: 'Žaisdamas kamuoliu svečiuose pas draugą Jokūbą, netyčia užkliudei ant lentynos stovėjusią senovinę vazelę. Ji nukrito ir sudužo į šukes.',
    choices: [
      {
        text: 'Skubiai sušluoti šukes po kilimu ir apsimesti, kad nieko nežinai.',
        isCorrect: false,
        feedback: 'Slėpti tiesą ir meluoti yra blogiausia, ką galima padaryti. Tai sugadins šeimininkų pasitikėjimą tavimi.',
        etiquetteLesson: 'Nelaimingi atsitikimai nutinka visiems, tačiau melas tik dar labiau viską pablogina.'
      },
      {
        text: 'Nedelsiant nueiti pas Jokūbo tėvus, nuoširdžiai papasakoti tiesą, atsiprašyti ir pasiūlyti padėti surinkti šukes.',
        isCorrect: true,
        feedback: 'Puikus, brandus ir drąsus elgesys! Suaugusieji visada vertina sąžiningumą ir nuoširdų atsiprašymą.',
        etiquetteLesson: 'Knygoje sakoma: „Būk sąžiningas iškart. Nelaimės nutinka visiems, o žmonės greitai atleidžia, kai sakoma tiesa.“ Galima net parašyti gražų atsiprašymo laiškelį ar padovanoti gėlių.'
      },
      {
        text: 'Apkaltinti Jokūbo katiną, kuris ramiai miegojo kitame kambaryje.',
        isCorrect: false,
        feedback: 'Versti kaltę kitiems ar nekaltiems gyvūnams yra labai nesąžininga.',
        etiquetteLesson: 'Tikras etiketo herojus moka prisiimti atsakomybę už savo netyčines klaidas.'
      }
    ]
  },
  {
    id: 'scen-injured-opponent',
    title: 'Varžovo trauma krepšinio aikštelėje',
    category: 'sports',
    categoryLabel: 'Sportas ir garbė',
    icon: 'Trophy',
    character: 'Liepa',
    difficulty: 'Pradedantysis',
    situation: 'Mokyklos krepšinio varžybose rezultatas lygus. Priešininkų komandos geriausia žaidėja šokdama susižeidžia kelį ir nukrenta ant grindų.',
    choices: [
      {
        text: 'Džiūgauti su komanda, kad dabar lengvai laimėsite varžybas.',
        isCorrect: false,
        feedback: 'Džiūgauti dėl kito žmogaus skausmo ar traumos yra labai nemandagu ir negarbina sportininko.',
        etiquetteLesson: 'Garbingas sportininkas visada užjaučia nukentėjusį varžovą.'
      },
      {
        text: 'Sustoti, su visais paploti žaidėjai, kai ji atsistoja, o po varžybų prieiti ir palinkėti greičiau pasveikti.',
        isCorrect: true,
        feedback: 'Tikro čempiono poelgis! Pagarba varžovui yra aukščiausia sporto vertybė.',
        etiquetteLesson: 'Knyga moko: „Niekada nedžiūgauk dėl traumos. Paplok, parodyk palaikymą ir palinkėk sveikatos.“'
      },
      {
        text: 'Nusišypsoti ir pasityčioti iš priešininkų atsarginių žaidėjų suolelio.',
        isCorrect: false,
        feedback: 'Patyčios ir pagyrūniškumas gadina žaidimo dvasią.',
        etiquetteLesson: 'Sporto etiketas reikalauja pagarbos tiek laimint, tiek pralaimint.'
      }
    ]
  },
  {
    id: 'scen-snooping-closet',
    title: 'Paslaptingi tėvų stalčiai ir privatumas',
    category: 'visiting',
    categoryLabel: 'Svečiuose ir privatumas',
    icon: 'Home',
    character: 'Mantas',
    difficulty: 'Pradedantysis',
    situation: 'Esi svečiuose pas klasioką. Jis pasiūlo: „Žiūrėk, mano tėvų miegamojo spinta atrakinta, einam paieškoti įdomių daiktų ar slaptų dokumentų!“',
    choices: [
      {
        text: 'Sutikti ir pradėti naršyti visus stalčius, nes juk labai smalsu!',
        isCorrect: false,
        feedback: 'Svetimų asmeninių daiktų lietimas be leidimo yra šiurkštus privatumo pažeidimas.',
        etiquetteLesson: 'Uždarytos durys ir stalčiai turi likti uždaryti. Geras svečias niekada nešnipinėja.'
      },
      {
        text: 'Mandagiai atsisakyti ir pasiūlyti: „Geriau pažaiskime stalo žaidimą tavo kambaryje arba eikime į kiemą.“',
        isCorrect: true,
        feedback: 'Puikiai pasielgta! Tu parodai pagarbą šeimininkų namams ir padedi draugui išvengti nemalonumų.',
        etiquetteLesson: 'Knygoje pabrėžiama: „Būdamas svečiu gerbk namų privatumą. Niekada neknisk spintų ir neieškok paslapčių.“'
      },
      {
        text: 'Išsitraukti telefoną ir nufotografuoti rastus daiktus socialiniams tinklams.',
        isCorrect: false,
        feedback: 'Tai ne tik nemandagu, bet ir pažeidžia šeimos saugumą ir privatumą.',
        etiquetteLesson: 'Niekada neviešink svetimų namų ar daiktų be suaugusiųjų sutikimo.'
      }
    ]
  },
  {
    id: 'scen-unfamiliar-food',
    title: 'Nepažįstamas patiekalas svečiuose',
    category: 'dining',
    categoryLabel: 'Stalo etiketas',
    icon: 'UtensilsCrossed',
    character: 'Kamilė',
    difficulty: 'Pradedantysis',
    situation: 'Draugės šeima pakvietė tave vakarienės ir patiekė tradicinį daržovių troškinį, kurio niekada nesi ragavusi ir jis atrodo neįprastai.',
    choices: [
      {
        text: 'Garsiai sušukti: „Fui, kokia keista pliurza, aš šito šlykštuko tikrai nevalgysiu!“',
        isCorrect: false,
        feedback: 'Taip įžeisi šeimininkus, kurie stengėsi ir gamino vakarienę su meile.',
        etiquetteLesson: 'Niekada nevadink kito žmogaus maisto „šlykščiu“ ar „keistu“.'
      },
      {
        text: 'Nusišypsoti, paragauti bent mažą kąsnelį, o jei tikrai nepatinka – mandagiai padėkoti už vaišes be piktų komentarų.',
        isCorrect: true,
        feedback: 'Labai mandagus ir drąsus elgesys! Dažnai nauji patiekalai pasirodo labai skanūs.',
        etiquetteLesson: 'Knyga pataria: „Būk drąsus ragaudamas naujus patiekalus. Jei maistas ne tavo skonio, nereikia garsiai komentuoti – tiesiog padėkok už svetingumą.“'
      },
      {
        text: 'Slapta išmesti maistą po stalu arba sukišti į servetėlę.',
        isCorrect: false,
        feedback: 'Maisto terliojimas ar mėtymas po stalu yra labai netvarkingas elgesys.',
        etiquetteLesson: 'Jei negali suvalgyti, tiesiog palik lėkštėje be dramų.'
      }
    ]
  },
  {
    id: 'scen-table-noise',
    title: 'Keistas kūno garsas prie stalo',
    category: 'dining',
    categoryLabel: 'Stalo etiketas',
    icon: 'MessageSquareQuote',
    character: 'Nojus',
    difficulty: 'Pradedantysis',
    situation: 'Valgant šventinius pietus prie didelio šeimos stalo, tau netyčia garsiai išsprūdo atsirūgimas ar žagsulys.',
    choices: [
      {
        text: 'Garsiai nusijuokti ir pasakyti: „Oho, koks geras garsas, paklausykit dar kartą!“',
        isCorrect: false,
        feedback: 'Tai trikdo kitus valgančius ir paverčia nepatogią situaciją nemalonia.',
        etiquetteLesson: 'Stalo etiketas reikalauja santūrumo ir pagarbos bendrai nuotaikai.'
      },
      {
        text: 'Ramiai ištarti „Atsiprašau“, nuleisti žvilgsnį ir toliau ramiai valgyti.',
        isCorrect: true,
        feedback: 'Puiku! Trumpas ir ramus atsiprašymas išsprendžia bet kokį netyčinį nutikimą.',
        etiquetteLesson: 'Knyga moko: „Kūnui nutinka įvairių garsų. Paprastas „Atsiprašau“ be papildomo dėmesio atkreipimo yra geriausias sprendimas.“'
      },
      {
        text: 'Apsimesti, kad tą garsą išleido šalia sėdinti sesė, ir pirštu parodyti į ją.',
        isCorrect: false,
        feedback: 'Versti kaltę kitiems yra labai negarbinga.',
        etiquetteLesson: 'Niekada nekaltink kitų dėl to, kas nutiko tau.'
      }
    ]
  },
  {
    id: 'scen-unwanted-gift',
    title: 'Gauta dovana, kuri tau nelabai patinka',
    category: 'communication',
    categoryLabel: 'Dovanos ir padėka',
    icon: 'Sparkles',
    character: 'Vilius',
    difficulty: 'Pradedantysis',
    situation: 'Per gimtadienį teta padovanojo megztinį su elniais, nors tu labai tikėjaisi naujo konstruktoriaus.',
    choices: [
      {
        text: 'Numesti megztinį ant grindų ir pasakyti: „Kokia nesąmonė, aš norėjau konstruktoriaus!“',
        isCorrect: false,
        feedback: 'Taip labai įskaudinsi tetą, kuri stengėsi ir ieškojo tau šiltos dovanos.',
        etiquetteLesson: 'Dovana yra meilės ir dėmesio ženklas, o ne užsakymas iš parduotuvės.'
      },
      {
        text: 'Nusišypsoti, pažvelgti į akis, pasakyti „Ačiū labai, teta, megztinis labai šiltas!“ ir vėliau parašyti padėkos laiškelį.',
        isCorrect: true,
        feedback: 'Tikras džentelmeniškas ir mandagus elgesys! Tu vertini žmogaus pastangas ir meilę.',
        etiquetteLesson: 'Knyga moko: „Visada dėkok už dovanotojo mintį ir dėmesį, nepriklausomai nuo to, kokia tai dovana.“'
      },
      {
        text: 'Paklausti, kiek megztinis kainavo ir ar galima jį tuoj pat grąžinti į parduotuvę.',
        isCorrect: false,
        feedback: 'Klausti dovanos kainos yra didelis etiketo pažeidimas.',
        etiquetteLesson: 'Kainos klausinėjimas rodo pagarbos trūkumą.'
      }
    ]
  }
];
