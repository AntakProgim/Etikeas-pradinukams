import { ChapterSection } from '../types';

export const BOOK_SECTIONS: ChapterSection[] = [
  {
    id: 'respect',
    title: '1. Mandagumas – tinkamo elgesio širdis',
    subtitle: 'Auksinė taisyklė - elkis su kitais taip, kaip norėtum, kad elgtųsi su tavimi.',
    icon: 'HeartHandshake',
    color: 'emerald',
    badgeId: 'respect_master',
    rules: [
      {
        title: 'Auksinė taisyklė',
        description: 'Elkis su kitais taip, kaip norėtum, kad kiti elgtųsi su tavimi. Tai paprasčiausia ir svarbiausia taisyklė gyvenime.',
        doText: 'Pagalvok, kaip tavo žodžiai ar poelgiai paveiks draugo jausmus.',
        dontText: 'Nesityčiok, nesakyk įžeidžiančių pravardžių, net jei kiti taip daro.'
      },
      {
        title: 'Taktiškumas – liežuvio sargyba',
        description: 'Sakyti tiesą svarbu, bet nereikia būti žiauriai atviram. Geriau patylėti, nei įskaudinti.',
        doText: 'Apgalvok savo žodžius prieš kalbėdamas. Niekada nereikės atsiprašinėti už neištartą piktą žodį.',
        dontText: 'Nekritikuok draugo šukuosenos ar drabužių visų akivaizdoje.'
      },
      {
        title: 'Pasitikėjimas savimi',
        description: 'Mandagus žmogus nėra nedrąsus – jis skleidžia ramybę ir džiaugsmą kitiems.',
        doText: 'Būk paslaugus, šypsokis ir skleisk gerą nuotaiką.',
        dontText: 'Nekalbėk vien apie blogus dalykus ir nesiskųsk be perstojo.'
      }
    ],
    funFact: 'Žodis „etiketas“ kilęs iš Prancūzijos karaliaus Liudviko XIV dvaro, kur ant kortelių (étiquettes) buvo surašytos taisyklės, kaip nenumindyti gėlynų!',
    kidQuote: '„Tikras herojus yra tas, šalia kurio kiekvienas jaučiasi saugus ir gerbiamas.“'
  },
  {
    id: 'sports',
    title: '2. Garbingas žaidimas ir sportas',
    subtitle: 'Kaip būti puikiu komandos draugu, varžovu ir sirgaliumi',
    icon: 'Trophy',
    color: 'amber',
    badgeId: 'sportsmanship_badge',
    rules: [
      {
        title: 'Žinok taisykles ir žaisk sąžiningai',
        description: 'Niekam nepatinka žaisti su tais, kurie kuria taisykles žaidimo metu arba sukčiauja.',
        doText: 'Pripažink klaidą („Mano kaltė!“) ir leisk priešininkui mesti baudos metimą.',
        dontText: 'Nekreipk žaidimo rezultatų, kai draugas nusisukęs, ir neapgaudinėk stalo žaidimuose.'
      },
      {
        title: 'Mokėk laimėti ir pralaimėti',
        description: 'Tikras nugalėtojas matomas iš jo požiūrio. Laimėjus – pasveikink priešininką už gerą kovą, pralaimėjus – paspausk ranką su šypsena.',
        doText: 'Pasakyk: „Puikus žaidimas! Kitą kartą vėl pasivaržysime.“',
        dontText: 'Nesipūsk, nesityčiok iš pralaimėjusio ir neliek pykčio ašarų.'
      },
      {
        title: 'Užjautimas susižeidusiam žaidėjui',
        description: 'Jei net priešininkų geriausias žaidėjas susižeidžia, tai nėra priežastis džiūgauti.',
        doText: 'Paplok jam, kai jis atsistoja, palinkėk greitai pasveikti.',
        dontText: 'Nedžiūgauk dėl kito nesėkmės ar traumos.'
      },
      {
        title: 'Puikus sirgalius',
        description: 'Palaikyk savo komandą garsiai, bet pagarbiai.',
        doText: 'Plojimais ir skanduotėmis drąsink savo žaidėjus.',
        dontText: 'Nenušvilpk teisėjo ir nemėtyk daiktų ar maisto.'
      }
    ],
    funFact: 'Senovės olimpinėse žaidynėse garbingas elgesys buvo toks svarbus, kad sukčiavusiems sportininkams tekdavo savo lėšomis pastatyti dievų statulą!',
    kidQuote: '„Tu esi nugalėtojas ne dėl to, kiek įvarčių įmušei, o dėl to, kaip žaidei.“'
  },
  {
    id: 'hospitality',
    title: '3. Svečiuose ir namuose (svetingumas)',
    subtitle: 'Kaip būti tobulu šeimininku ir laukiamiausiu svečiu',
    icon: 'Home',
    color: 'rose',
    badgeId: 'hospitality_badge',
    rules: [
      {
        title: 'Kai svečias atvyksta pas tave (šeimininkas)',
        description: 'Svetingumas – tai menas leisti kitam pasijusti ypatingu.',
        doText: 'Pasitik prie durų, padėk pakabinti striukę, pasiūlyk vandens ar sulčių ir atiduok geriausią kėdę ar didžiausią sausainį.',
        dontText: 'Nesakyk: „Čia mano namai, todėl darysim tik tai, ką aš noriu!“ Klausk svečio noro.'
      },
      {
        title: 'Kai tu eini į svečius (geras svečias)',
        description: 'Būk svečias, kurį visada norisi pakviesti dar kartą.',
        doText: 'Nusiauk batus, nusišluostyk kojas prie durų ir atnešk mažą dovanėlę (sodintą gėlytę, savo keptą sausainį ar mamytės padėtą dovaną).',
        dontText: 'Niekada nesakyk: „O pas mane namuose žaislai geresni...“ – tai skaudina šeimininkus.'
      },
      {
        title: 'Gerbk namų privatumą ir taisykles',
        description: 'Uždarytos durys ir stalčiai turi likti uždaryti.',
        doText: 'Laikykis šeimininkų miego ir valgymo laiko, pasisiūlyk padėti padengti stalą ar nunešti indus.',
        dontText: 'Nenaršyk spintose, neliesk dokumentų ir nešokinėk ant lovų su batais.'
      },
      {
        title: 'Išvykimas ir padėka',
        description: 'Nepasilik per ilgai ir visada garsiai padėkok.',
        doText: 'Pasakyk: „Ačiū už nuostabų laiką, man labai patiko!“. Grįžęs namo nusiųsk padėkos žinutę.',
        dontText: 'Nepalik po savęs sujaukto kambario ar numestų drabužių.'
      }
    ],
    funFact: 'Anglijoje yra posakis: „Mano namai – mano tvirtovė“, o geras svečias joje visada elgiasi kaip garbingas riteris!',
    kidQuote: '„Svetingumas yra meilė veiksmuose – padaryti kitą laimingą tavo namuose.“'
  },
  {
    id: 'dining',
    title: '4. Stalo etiketo paslaptys',
    subtitle: 'Nuo stalo serviravimo iki mandagaus valgymo be gėdos',
    icon: 'UtensilsCrossed',
    color: 'blue',
    badgeId: 'dining_master',
    rules: [
      {
        title: 'Kaip padengti stalą (serviravimo pagrindai)',
        description: 'Šakutė kairėje, peilis dešinėje (ašmenimis į lėkštę), šaukštas šalia peilio, stiklinė viršuje dešinėje.',
        doText: 'Įrankius naudok nuo kraštinių link lėkštės (iš išorės į vidų).',
        dontText: 'Neapversk peilio ašmenų į kaimyno pusę – jie visada žiūri į lėkštę.'
      },
      {
        title: 'Servetėlės magija',
        description: 'Vos atsisėdus prie stalo, servetėlė dedama ant kelių, o ne užsikišama už apykaklės (nebent valgomas omaras!).',
        doText: 'Jei trumpam išeini – padėk ant kėdės. Baigęs valgyti – tvarkingai kairėje lėkštės pusėje.',
        dontText: 'Nevalyk nosies į stalo servetėlę – tam skirta vienkartinė nosinaitė!'
      },
      {
        title: 'Maisto prašymas ir perdavimas',
        description: 'Jei negali pasiekti duonos ar druskos – nesitiesk per visą stalą.',
        doText: 'Mandagiai paprašyk: „Luka, prašau, perduok duoną“. Patiekalus perduodame į dešinę.',
        dontText: 'Netiesk rankos virš kito žmogaus lėkštės.'
      },
      {
        title: 'Kąsniai, kramtymas ir „keisti garsai“',
        description: 'Kramtome tik užčiaupta burna. Nekalbame pilna burna.',
        doText: 'Jei netyčia išsprūdo atsirūgimas ar čiaudulys – ramiai ištark „Atsiprašau“ ir tęskite.',
        dontText: 'Nesiurbk gėrimo per šiaudelį taip, kad visa kavinė girdėtų, ir nesikrapštyk dantų prie stalo.'
      }
    ],
    funFact: 'Šakutės atsirado tik XI amžiuje! Iki tol žmonės valgė trimis pirštais, todėl stalo manieros tapo tikra kilnumo žyma.',
    kidQuote: '„Stalo etiketas skirtas ne tam, kad suvaržytų, o tam, kad visiems prie stalo būtų jauku ir gardu.“'
  },
  {
    id: 'hygiene',
    title: '5. Muilas, dušas ir savigarba',
    subtitle: 'Švara, tvarkinga apranga ir mandagus vonios kambario naudojimas',
    icon: 'Sparkles',
    color: 'teal',
    badgeId: 'hygiene_knight',
    rules: [
      {
        title: 'Švara saugo sveikatą ir džiugina draugus',
        description: 'Geras kvapas ir švarios rankos – pirmasis tavo vizitinės kortelės ženklas.',
        doText: 'Plauk rankas su muilu prieš valgį, po tualeto ir grįžęs iš lauko. Valyk dantis 2 kartus per dieną.',
        dontText: 'Nesivilk purvinų drabužių iš skalbinių krepšio vien todėl, kad jie patogiausi.'
      },
      {
        title: 'Čiaudėjimo ir kosulio taisyklė',
        description: 'Bacilų plitimas yra ne tik nemalonus, bet ir nesaugus.',
        doText: 'Čiaudėk į popierinę nosinaitę arba į sulenktos alkūnės vidinę pusę.',
        dontText: 'Niekada nevalyk nosies į marškinių rankovę ar delną!'
      },
      {
        title: 'Vonios kambario etiketas',
        description: 'Palik vonią tokią švarią, kokią norėtum rasti pats.',
        doText: 'Nuleisk tualeto dangtį, pakabink rankšluostį išdžiūti, nuplauk dantų pastos likučius iš kriauklės.',
        dontText: 'Nepalik balų ant grindų ir neužimk vonios valandai, kai kiti šeimos nariai laukia.'
      },
      {
        title: 'Apranga pagal progą',
        description: 'Ar eitum į snieglentės trasą su kostiumu? Ne! Kiekvienai vietai – tinkama apranga.',
        doText: 'Į teatrą, mokyklos šventę ar bažnyčią renkasi tvarkingesnius, švaresnius rūbus.',
        dontText: 'Nesipyk su tėvais, kai jie paprašo pasikeisti suplėšytus sportinius marškinėlius į gražius marškinius.'
      }
    ],
    funFact: 'Dantų šepetėlis buvo išrastas Kinijoje daugiau nei prieš 500 metų iš šerno šerių ir bambuko kotelio!',
    kidQuote: '„Tvarka ir švara – tai didžiausia pagarba pačiam sau.“'
  },
  {
    id: 'communication',
    title: '6. Stebuklingi žodžiai ir pokalbiai',
    subtitle: 'Kaip kalbėtis su suaugusiais, draugais, telefonu ir rašyti padėkas',
    icon: 'MessageSquareQuote',
    color: 'violet',
    badgeId: 'words_master',
    rules: [
      {
        title: 'Trys stebuklingi raktai',
        description: '„Ačiū“, „Prašau“ ir „Atsiprašau“ atveria net pačias tvirčiausias širdžių duris.',
        doText: 'Padėkok net už mažiausią paslaugą – kai vairuotojas atidaro duris ar mama paduoda arbatos.',
        dontText: 'Nelaikyk gerų žodžių kišenėje – sakyk juos garsiai ir su šypsena.'
      },
      {
        title: 'Pokalbiai su suaugusiais ir susipažinimas',
        description: 'Kai susipažįsti, žiūrėk žmogui į akis ir aiškiai pasakyk savo vardą.',
        doText: 'Pasakyk: „Labas, mano vardas Matas, labai malonu susipažinti.“',
        dontText: 'Nenuleisk akių į žemę ir nebumbėk po nosimi.'
      },
      {
        title: 'Mokėjimas išklausyti',
        description: 'Geras pašnekovas yra tas, kuris moka ne tik kalbėti, bet ir klausytis.',
        doText: 'Išklausyk draugo istoriją iki galo, paklausk: „O kas nutiko toliau?“.',
        dontText: 'Nepertraukinėk kito žmogaus vidury sakinio.'
      },
      {
        title: 'Ačiū laiškeliai ir atvirukai',
        description: 'Ranka rašytas padėkos laiškelis yra gražiausia dovana už gautą dovaną ar viešnagę.',
        doText: 'Parašyk: „Ačiū už nuostabią knygą, man labai patiko ją skaityti!“.',
        dontText: 'Nepamiršk padėkoti seneliams ar draugams po gimtadienio.'
      }
    ],
    funFact: 'Mokslininkai įrodė, kad žodis „Ačiū“ pagerina nuotaiką ne tik tam, kas jį girdi, bet ir tam, kas jį ištaria!',
    kidQuote: '„Žodžiai turi galią gydyti arba skaudinti. Rinkis žodžius, kurie neša šviesą.“'
  }
];
