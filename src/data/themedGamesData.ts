import { SortingItem, ThemedQuiz } from '../types';

export const SORTING_GAME_ITEMS: SortingItem[] = [
  {
    id: 'sort-1',
    text: 'Prilaikyti duris iš paskos einančiam mokytojui ar klasiokui',
    isPolite: true,
    explanation: 'Tai paprastas ir labai gražus pagarbos bei paslaugumo ženklas.',
    category: 'Mokykla'
  },
  {
    id: 'sort-2',
    text: 'Čiaudėti tiesiai į delną arba į kito žmogaus nugarą',
    isPolite: false,
    explanation: 'Čiaudėti reikia į vienkartinę nosinaitę arba į sulenktos alkūnės vidų („vampyro poza“).',
    category: 'Higiena'
  },
  {
    id: 'sort-3',
    text: 'Pasidėti servetėlę ant kelių vos atsisėdus prie pietų stalo',
    isPolite: true,
    explanation: 'Stalo etiketas numato, kad servetėlė apsaugo drabužius ir yra dedama ant kelių.',
    category: 'Stalas'
  },
  {
    id: 'sort-4',
    text: 'Svečiuose sakyti: „O pas mus namie žaislai daug geresni!“',
    isPolite: false,
    explanation: 'Niekada nelygink šeimininkų namų savo naudai – tai skaudina ir įžeidžia.',
    category: 'Svečiai'
  },
  {
    id: 'sort-5',
    text: 'Pasveikinti varžovą ir paspausti ranką net ir pralaimėjus rungtynes',
    isPolite: true,
    explanation: 'Garbingas žaidėjas moka oriai priimti pralaimėjimą ir gerbia varžovą.',
    category: 'Sportas'
  },
  {
    id: 'sort-6',
    text: 'Prie stalo tiestis per kito žmogaus lėkštę siekiant duonos ar druskos',
    isPolite: false,
    explanation: 'Mandagu paprašyti: „Prašau, perduokite duoną“. Patiekalai prie stalo perduodami į dešinę.',
    category: 'Stalas'
  },
  {
    id: 'sort-7',
    text: 'Kine ar teatre išjungti telefono garsą ir kalbėti tik pasibaigus spektakliui',
    isPolite: true,
    explanation: 'Taip gerbi aktorius ir kitus žiūrovus, kurie nori mėgautis pasirodymu.',
    category: 'Vieša vieta'
  },
  {
    id: 'sort-8',
    text: 'Slapta naršyti draugo tėvų miegamojo spintoje ar stalčiuose',
    isPolite: false,
    explanation: 'Uždarytos durys ir stalčiai yra privati erdvė, kurios svečias niekada neliečia.',
    category: 'Svečiai'
  },
  {
    id: 'sort-9',
    text: 'Po viešnagės ar gavus dovaną parašyti nuoširdų padėkos laiškelį',
    isPolite: true,
    explanation: 'Padėkos atvirukas ar žinutė parodo ypatingą dėkingumą ir džiugina dovanotoją.',
    category: 'Bendravimas'
  },
  {
    id: 'sort-10',
    text: 'Iš anksto sviestu ištepti visą duonos riekę, kad sutaupytum laiko',
    isPolite: false,
    explanation: 'Pagal etiketą atsilaužiama po vieną kąsnį pirštais ir tepamas tik tas kąsnelis.',
    category: 'Stalas'
  },
  {
    id: 'sort-11',
    text: 'Pasitikus svečią prie durų pasiūlyti atsigerti vandens ir pakabinti striukę',
    isPolite: true,
    explanation: 'Svetingumas prasideda nuo šilto sutikimo ir dėmesio svečio patogumui.',
    category: 'Svetingumas'
  },
  {
    id: 'sort-12',
    text: 'Burbuliuoti per šiaudelį kavinėje ar restorane',
    isPolite: false,
    explanation: 'Burbulų pūtimas sukelia triukšmą ir gali aptaškyti staltiesę ar kaimynus.',
    category: 'Stalas'
  },
  {
    id: 'sort-13',
    text: 'Viešajame transporte užleisti sėdimą vietą seneliui, nėščiai moteriai ar žmogui su ramentais',
    isPolite: true,
    explanation: 'Tai vienas gražiausių ir labiausiai vertinamų pagarbos poelgių kasdienybėje.',
    category: 'Vieša vieta'
  },
  {
    id: 'sort-14',
    text: 'Valgyti maistą pilna burna ir tuo pačiu metu bandyti papasakoti juokingą istoriją',
    isPolite: false,
    explanation: 'Pirma sukramtome ir nuryjame maistą, o tik tada kalbame.',
    category: 'Stalas'
  },
  {
    id: 'sort-15',
    text: 'Prieš įeinant į uždarytą kabinetą, kambarį ar vonią – visada pasibelsti ir palaukti leidimo',
    isPolite: true,
    explanation: 'Beldimasis saugo kitų žmonių privatumą ir ramybę.',
    category: 'Mokykla'
  },
  {
    id: 'sort-16',
    text: 'Tyčiotis ar garsiai juoktis iš draugo, kai jam nesiseka fizinio lavinimo rungtyje',
    isPolite: false,
    explanation: 'Tikras draugas ir sportininkas padrąsina: „Nieko tokio, kitą kartą pasiseks!“',
    category: 'Sportas'
  },
  {
    id: 'sort-17',
    text: 'Prieš skolinantis kito žmogaus daiktą ar pieštuką, visada mandagiai atsiklausti',
    isPolite: true,
    explanation: 'Svetimi daiktai niekada neimami be šeimininko leidimo.',
    category: 'Mokykla'
  },
  {
    id: 'sort-18',
    text: 'Prie bendro pietų stalo be perstojo žiūrėti į telefoną ar planšetę',
    isPolite: false,
    explanation: 'Valgymo metas skirtas bendravimui ir maisto skanavimui – telefonai padedami į šalį.',
    category: 'Stalas'
  },
  {
    id: 'sort-19',
    text: 'Praleisti pro duris ar lifte pirma išlipančius / išeinančius žmones',
    isPolite: true,
    explanation: 'Geležinė etiketo taisyklė: pirma leidžiame išeiti, o tik tada patys įeiname.',
    category: 'Vieša vieta'
  },
  {
    id: 'sort-20',
    text: 'Gimtadienyje išvynioti dovaną ir pasakyti: „Fui, man tokia nepatinka, aš jau tokią turiu!“',
    isPolite: false,
    explanation: 'Dėkojame už dovanotojo dėmesį ir pastangas, nepriklausomai nuo pačios dovanos.',
    category: 'Svečiai'
  },
  {
    id: 'sort-21',
    text: 'Atsisveikinant ištarti: „Ačiū už nuostabų vakarą, geros jums dienos!“',
    isPolite: true,
    explanation: 'Šiltas atsisveikinimas palieka puikų įspūdį ir pakelia nuotaiką visiems.',
    category: 'Bendravimas'
  },
  {
    id: 'sort-22',
    text: 'Klasėje ar renginyje pertraukti kalbantį mokytoją ar draugą nepalaukus savo eilės',
    isPolite: false,
    explanation: 'Išklausome iki galo, pakeliame ranką ar sulaukiame pauzės prieš kalbėdami.',
    category: 'Mokykla'
  },
  {
    id: 'sort-23',
    text: 'Pamatęs naujoką mokykloje, prieiti, nusišypsoti ir pasiūlyti aprodyti klasę',
    isPolite: true,
    explanation: 'Padėti naujokui apsiprasti rodo didelę širdį ir lyderystės savybes.',
    category: 'Bendravimas'
  },
  {
    id: 'sort-24',
    text: 'Spjaudyti ant grindų, kramtomąją gumą klijuoti po mokyklos stalu ar ant kėdės',
    isPolite: false,
    explanation: 'Guma ir šiukšlės keliauja tik į šiukšliadėžę, suvyniotos į popieriuką.',
    category: 'Higiena'
  },
  {
    id: 'sort-25',
    text: 'Prieš sėdant prie stalo švariai nusiplauti rankas su muilu ir šiltu vandeniu',
    isPolite: true,
    explanation: 'Švarios rankos saugo tavo ir aplinkinių sveikatą bei rodo stalo kultūrą.',
    category: 'Higiena'
  },
  {
    id: 'sort-26',
    text: 'Rodyti pirštu į nepažįstamą žmogų gatvėje ir garsiai aptarinėti jo išvaizdą',
    isPolite: false,
    explanation: 'Rodyti pirštu ir komentuoti svetimus žmones yra grubus etiketo pažeidimas.',
    category: 'Vieša vieta'
  },
  {
    id: 'sort-27',
    text: 'Kai kas nors netyčia išmeta daiktą ar knygas – padėti jas pakelti nuo žemės',
    isPolite: true,
    explanation: 'Paslaugumas ir empatija paverčia pasaulį draugiškesne vieta.',
    category: 'Bendravimas'
  },
  {
    id: 'sort-28',
    text: 'Paskambinus telefonu iškart rėkti: „Duokit Joną!“, neprisistačius ir nepasisveikinus',
    isPolite: false,
    explanation: 'Pirma pasisveikiname, prisistatome: „Laba diena, čia kalba Lukas...“ ir mandagiai pakviečiame.',
    category: 'Bendravimas'
  },
  {
    id: 'sort-29',
    text: 'Prieš darant bendrą draugo nuotrauką ar keliant į internetą – atsiklausti jo sutikimo',
    isPolite: true,
    explanation: 'Skaitmeninis etiketas reikalauja gerbti kito žmogaus atvaizdą ir privatumą.',
    category: 'Vieša vieta'
  },
  {
    id: 'sort-30',
    text: 'Išsitepus lūpas prie stalo, jas nusivalyti į savo megztinio rankovę ar užuolaidą',
    isPolite: false,
    explanation: 'Lūpoms ir pirštams nusivalyti skirta popierinė arba medžiaginė stalo servetėlė.',
    category: 'Stalas'
  },
  {
    id: 'sort-31',
    text: 'Grįžus namo iškart nusimauti batus ir padėti juos į vietą, o ne palikti vidury koridoriaus',
    isPolite: true,
    explanation: 'Tvarka namuose prasideda nuo tvarkingo batų padėjimo – tai palengvina darbą tėvams ir saugo švarą.',
    category: 'Namai'
  },
  {
    id: 'sort-32',
    text: 'Sėdėti ant stalo arba susidėti kojas ant kėdės lankantis pas draugą ar kavinėje',
    isPolite: false,
    explanation: 'Stalai skirti maistui ir darbui, o kėdės – sėdėjimui. Kojų kėlimas ant baldų yra nepagarbus.',
    category: 'Vieša vieta'
  },
  {
    id: 'sort-33',
    text: 'Visada pasakyti „prašau“ ir „ačiū“, net kai bendrauji su broliu ar seserimi namuose',
    isPolite: true,
    explanation: 'Mandagumas šeimoje yra pats svarbiausias – jis stiprina ryšį ir rodo meilę artimiesiems.',
    category: 'Namai'
  },
  {
    id: 'sort-34',
    text: 'Garsiai čepsėti ir siurbti valgant sriubą, nes ji labai skani',
    isPolite: false,
    explanation: 'Valgome tyliai, užčiaupta burna. Papildomi garsai gali būti nemalonūs kitiems prie stalo.',
    category: 'Stalas'
  },
  {
    id: 'sort-35',
    text: 'Baigus skaityti knygą bibliotekoje, ją padėti į tą pačią vietą, iš kurios paėmei',
    isPolite: true,
    explanation: 'Knygų grąžinimas į vietą padeda bibliotekininkams ir kitiems skaitytojams jas lengvai rasti.',
    category: 'Mokykla'
  },
  {
    id: 'sort-36',
    text: 'Bėgioti mokyklos koridoriais ir stumdyti kitus vaikus, kad greičiau nubėgtum į valgyklą',
    isPolite: false,
    explanation: 'Bėgiojimas koridoriuose pavojingas tau ir aplinkiniams. Mandagu vaikščioti ramiu žingsniu.',
    category: 'Mokykla'
  },
  {
    id: 'sort-37',
    text: 'Jei matai šiukšlę ant žemės parke ar prie mokyklos, pakelti ją ir įmesti į šiukšliadėžę',
    isPolite: true,
    explanation: 'Rūpintis aplinka yra kiekvieno piliečio pareiga – taip rodai pavyzdį kitiems.',
    category: 'Vieša vieta'
  },
  {
    id: 'sort-38',
    text: 'Kalėdinio vaidinimo metu šnabždėtis ir komentuoti klasiokų kostiumus su šalia sėdinčiu draugu',
    isPolite: false,
    explanation: 'Pasirodymo metu reikia tylėti ir gerbti scenoje esančius draugus bei jų pastangas.',
    category: 'Mokykla'
  },
  {
    id: 'sort-39',
    text: 'Prieš einant į svečius, visada pasiteirauti, ar nereikia ko nors atsinešti (pvz., šlepečių ar vaisių)',
    isPolite: true,
    explanation: 'Pasiteiravimas rodo tavo rūpestį šeimininkais ir padeda jiems geriau pasiruošti tavo vizitui.',
    category: 'Svečiai'
  },
  {
    id: 'sort-40',
    text: 'Užimti visą suolą parke su savo daiktais, kai matai, kad kiti žmonės neturi kur prisėsti',
    isPolite: false,
    explanation: 'Viešos vietos yra bendros – mandagu pasislinkti ir palikti vietos kitiems.',
    category: 'Vieša vieta'
  }
];

export const THEMED_QUIZZES: ThemedQuiz[] = [
  {
    id: 'quiz-dining',
    title: 'Stalo karalystės viktorina',
    description: 'Ar moki teisingai laikyti įrankius, kramtyti ir bendrauti prie pietų stalo?',
    icon: '🍽️',
    category: 'Stalo etiketas',
    questions: [
      {
        question: 'Į kurią pusę prie stalo turi būti atsukti peilio ašmenys?',
        options: ['Į lėkštės pusę', 'Į kaimyno pusę (į išorę)', 'Visiškai nesvarbu'],
        correctIndex: 0,
        explanation: 'Peilio ašmenys VISADA turi būti atsukti į lėkštę – tai ramybės ir taikos ženklas.'
      },
      {
        question: 'Ką darome su stalo servetėle vos atsisėdę prie stalo?',
        options: ['Užsikišame už marškinių apykaklės', 'Išskleidžiame ir pasidedame ant kelių', 'Paliekame gulėti ant stalo'],
        correctIndex: 1,
        explanation: 'Servetėlė iškart dedama ant kelių, kad apsaugotų drabužius.'
      },
      {
        question: 'Į kurią pusę prie stalo perduodami bendri patiekalai ir duona?',
        options: ['Į dešinę pusę', 'Į kairę pusę', 'Kas greičiau pasiekia'],
        correctIndex: 0,
        explanation: 'Tradicinis stalo etiketas reikalauja perduoti maisto indus ratu į dešinę.'
      },
      {
        question: 'Kaip teisingai valgoma batono ar duonos riekelė su sviestu?',
        options: [
          'Visą riekę iškart storai ištepame sviestu ir kandame',
          'Pirštais atsilaužiame vieną kąsnelį, peiliuku užtepame sviesto ir dedame į burną',
          'Sulankstome duoną per pusę'
        ],
        correctIndex: 1,
        explanation: 'Pagal etiketo taisyklę duona laužoma po vieną kąsnelį ir tepamas tik tas atsilaužtas gabaliukas.'
      },
      {
        question: 'Kaip padedami stalo įrankiai lėkštėje, kai baigiame valgyti?',
        options: [
          'Sukryžiuoti per lėkštės vidurį',
          'Lygiagrečiai vienas šalia kito (kaip laikrodžio rodyklės ties 4:20 ar 5:00)',
          'Nuleisti ant staltiesės abiejose lėkštės pusėse'
        ],
        correctIndex: 1,
        explanation: 'Lygiagrečiai sudėti įrankiai padavėjui ar šeimininkui aiškiai parodo, kad lėkštę jau galima nunešti.'
      },
      {
        question: 'Kurioje lėkštės pusėje dedama vandens stiklinė ar taurė?',
        options: [
          'Viršuje dešinėje pusėje (virš peilio smaigalio)',
          'Kairėje pusėje šalia šakutės',
          'Pačiame lėkštės viduryje'
        ],
        correctIndex: 0,
        explanation: 'Gėrimai visada stovi dešinėje viršuje, kad dešine ranka būtų patogu pasiekti.'
      }
    ]
  },
  {
    id: 'quiz-visiting',
    title: 'Super svečio ir šeimininko viktorina',
    description: 'Kaip elgtis atvykus pas draugą ir kaip sutikti svečius savo namuose?',
    icon: '🏡',
    category: 'Svetingumas ir svečiai',
    questions: [
      {
        question: 'Ką vadiname „šeimininkės dovana“?',
        options: [
          'Brangų brangakmenį',
          'Mažą nuoširdžią dovanėlę, gėlę ar skanėstą namų šeimininkams',
          'Sąskaitą už viešnagę'
        ],
        correctIndex: 1,
        explanation: 'Tai maža padėkos dovanėlė (augalėlis, pačių kepti sausainiai ar arbata) už pakvietimą į svečius.'
      },
      {
        question: 'Kuris skanėstas ar patogiausia kėdė atitenka svečiui, kai esi šeimininkas?',
        options: [
          'Pats mažiausias, nes aš esu namų šeimininkas',
          'Pasiūlai didžiausią ir skaniausią svečiui',
          'Suvalgai viską pats'
        ],
        correctIndex: 1,
        explanation: 'Svetingumas reiškia svečią iškelti į pirmą vietą – jam geriausia vieta ir pirmasis vaišių pasirinkimas!'
      },
      {
        question: 'Ką dera padaryti prieš išvažiuojant po nakvynės pas draugą?',
        options: [
          'Palikti visus rūbus ir žaislus ant grindų',
          'Padėti draugui sutvarkyti kambarį, pakloti lovą ir padėkoti jo tėvams',
          'Išeiti nieko nesakius'
        ],
        correctIndex: 1,
        explanation: 'Geras svečias visada padeda susitvarkyti, pakloja patalynę ir nuoširdžiai padėkoja šeimininkams.'
      },
      {
        question: 'Ką daryti, jei svečiuose netyčia išpylei stiklinę sulčių ar sudaužei puodelį?',
        options: [
          'Pasislėpti po stalu arba apkaltinti draugo šunį',
          'Iškart nuoširdžiai atsiprašyti, padėti viską išvalyti ir pasiūlyti nupirkti naują',
          'Juoktis ir rodyti pirštu'
        ],
        correctIndex: 1,
        explanation: 'Nelaimių pasitaiko visiems. Brandus ir mandagus žmogus iškart atsiprašo ir padeda sutvarkyti.'
      },
      {
        question: 'Ar galima be atsiklausimo vestis papildomus draugus į gimtadienį ar svečius?',
        options: [
          'Ne, būtina iš anksto atsiklausti šeimininkų',
          'Taip, kuo daugiau žmonių, tuo linksmiau',
          'Tik jei atsivedi daugiau nei tris'
        ],
        correctIndex: 0,
        explanation: 'Šeimininkai planuoja vietas ir vaišes, todėl netikėti svečiai gali sukelti nepatogumų.'
      }
    ]
  },
  {
    id: 'quiz-sports',
    title: 'Garbingo sportininko viktorina',
    description: 'Kaip elgtis varžybose, žaidžiant kieme ar stalo žaidimus?',
    icon: '⚽',
    category: 'Sportas ir garbė',
    questions: [
      {
        question: 'Ką daro tikras nugalėtojas pasibaigus varžyboms?',
        options: [
          'Garsiai tyčiojasi iš pralaimėjusių ir juokiasi',
          'Padėkoja priešininkui už gerą kovą ir paspaudžia ranką',
          'Rodo liežuvį'
        ],
        correctIndex: 1,
        explanation: 'Tikras nugalėtojas matomas iš jo pagarbos ir dėkingumo varžovams.'
      },
      {
        question: 'Jei varžovas aikštelėje susižeidė ir nukrito, ką darome?',
        options: [
          'Džiūgaujame, kad dabar lengvai laimėsime',
          'Sustojame, padedame atsistoti, palaikome plojimais ir palinkime sveikatos',
          'Apsimetame, kad nieko nematome'
        ],
        correctIndex: 1,
        explanation: 'Niekada nedžiūgaujame dėl kito traumos. Garbingas sportininkas visada rodo atjautą.'
      },
      {
        question: 'Jei teisėjas priėmė sprendimą, su kuriuo tu asmeniškai nesutinki?',
        options: [
          'Pradėti šūkauti, keiktis ir mesti kamuolį į teisėją',
          'Išlikti ramiam, gerbti teisėjo sprendimą ir leisti kapitonui mandagiai pasitikslinti',
          'Iškart išeiti iš aikštelės'
        ],
        correctIndex: 1,
        explanation: 'Teisėjo gerbimas ir savitvarda yra viena svarbiausių sporto vertybių.'
      },
      {
        question: 'Žaidžiant stalo žaidimą matai, kad pralaimėsi. Koks poelgis teisingas?',
        options: [
          'Nusviesti žaidimo lentą ant žemės ir sušukti, kad visi sukčiauja',
          'Žaisti garbingai iki galo, o pralaimėjus nusišypsoti ir pasveikinti laimėtoją',
          'Pavogti figūrėles'
        ],
        correctIndex: 1,
        explanation: 'Mokėjimas oriai pralaimėti yra brandaus žmogaus bruožas – stalo žaidimai skirti smagumui!'
      },
      {
        question: 'Ką reiškia garbingas žaidimas sporte?',
        options: [
          'Žaidimas, kuriame laimi bet kokiomis priemonėmis',
          'Taisyklių laikymasis, pagarba varžovui, teisėjams ir savo komandos draugams',
          'Tik žaidimas lauke saulėtą dieną'
        ],
        correctIndex: 1,
        explanation: 'Garbingas žaidimas – tai principas, reiškiantis sąžiningumą, pagarbą ir lygybę sporte.'
      }
    ]
  },
  {
    id: 'quiz-school',
    title: 'Mokyklos ir draugystės etiketas',
    description: 'Kaip bendrauti su mokytojais, elgtis per pamokas ir būti geriausiu draugu?',
    icon: '🎒',
    category: 'Mokykla ir klasė',
    questions: [
      {
        question: 'Kaip mandagu kreiptis į mokytoją ar mokyklos darbuotoją?',
        options: [
          '„Ei, tu, parodyk man kelią!“',
          '„Laba diena, mokytoja [Vardas]...“ kreipiantis „Jūs“',
          'Švilpauti ir baksnoti pirštu'
        ],
        correctIndex: 1,
        explanation: 'Į suaugusius mokyklos darbuotojus kreipiamės pagarbiai „Jūs“ ir pasisveikiname vardu.'
      },
      {
        question: 'Ką daryti, jei nori atsakyti į mokytojo klausimą per pamoką?',
        options: [
          'Rėkti per visą klasę pertraukiant kitus',
          'Ramiai pakelti ranką ir sulaukti, kol mokytojas tave pakvies',
          'Mesti trintuką į lentą'
        ],
        correctIndex: 1,
        explanation: 'Pakelta ranka palaiko tvarką klasėje ir leidžia kiekvienam pasisakyti ramiai.'
      },
      {
        question: 'Jei matai, kad naujas klasiokas per pertrauką stovi vienas ir liūdi?',
        options: [
          'Prieiti, pakalbinti ir pakviesti kartu pažaisti ar pavalgyti',
          'Juoktis iš jo kartu su kitais',
          'Visiškai nekreipti dėmesio'
        ],
        correctIndex: 0,
        explanation: 'Paprastas kvietimas prisijungti gali pakeisti kito žmogaus visą dieną į gera.'
      },
      {
        question: 'Prieš pasiskolinant draugo liniuotę ar knygą, ką būtina padaryti?',
        options: [
          'Pasiimti slapta iš kuprinės, kol jis nemato',
          'Mandagiai atsiklausti: „Ar galėtum prašau paskolinti?“ ir grąžinti laiku',
          'Atimti per jėgą'
        ],
        correctIndex: 1,
        explanation: 'Kito žmogaus daiktai liečiami TIK gavus aiškų leidimą.'
      },
      {
        question: 'Kaip reaguoti, jei draugas netyčia pasidalino su tavimi savo paslaptimi?',
        options: [
          'Išpasakoti visai klasei per mikrofoną',
          'Išsaugoti paslaptį ir nenuvilti draugo pasitikėjimo',
          'Parašyti apie tai socialiniuose tinkluose'
        ],
        correctIndex: 1,
        explanation: 'Ištikimybė ir pasitikėjimas yra tvirtos draugystės pamatas.'
      }
    ]
  },
  {
    id: 'quiz-public-places',
    title: 'Viešų vietų ir kelionių etiketas',
    description: 'Kaip elgtis teatre, autobuse, muziejuje, bibliotekoje ir lėktuve?',
    icon: '🎭',
    category: 'Viešos erdvės',
    questions: [
      {
        question: 'Kaip teisingai praeiti pro sėdinčius žiūrovus teatre ar kine link savo vietos?',
        options: [
          'Atsukus nugarą į sėdinčius žmones',
          'Veidu atsisukus į sėdinčius žmones ir tyliai atsiprašius už sutrukdymą',
          'Bėgti greitai ir stumdyti kėdes'
        ],
        correctIndex: 1,
        explanation: 'Teatro taisyklė: link savo vietos visada einame VEIDU į sėdinčius žiūrovus.'
      },
      {
        question: 'Kada tinka ploti spektaklyje ar koncerte?',
        options: [
          'Vidury ramiausios dainos solo partijos',
          'Kūrinio ar veiksmo pabaigoje, kai artistai nusilenkia',
          'Rėkti ir švilpti bet kada'
        ],
        correctIndex: 1,
        explanation: 'Plojimais atlikėjams dėkojame pasibaigus kūriniui ar scenos veiksmui.'
      },
      {
        question: 'Kaip elgtis bibliotekoje ar muziejuje?',
        options: [
          'Bėgioti, garsiai šūkauti ir liesti visus eksponatus rankomis',
          'Vaikščioti ramiai, kalbėti pašnibždomis ir saugoti knygas bei ramybę',
          'Valgyti traškučius šalia senovinių paveikslų'
        ],
        correctIndex: 1,
        explanation: 'Biblioteka ir muziejus yra tylos ir susikaupimo erdvės.'
      },
      {
        question: 'Viešajame transporte įlipa vyresnio amžiaus žmogus su sunkiais krepšiais. Ką darai?',
        options: [
          'Apsimeti, kad kietai miegi arba įnirtingai žiūri pro langą',
          'Nusišypsai, atsistoji ir mandagiai pasiūlai atsisėsti į tavo vietą',
          'Uždedi kojas ant gretimos kėdės'
        ],
        correctIndex: 1,
        explanation: 'Vietos užleidimas yra kilnus ir mandagus poelgis, rodantis aukštą vidinę kultūrą.'
      },
      {
        question: 'Kaip elgtis viešbutyje ar daugiabutyje po 22 valandos?',
        options: [
          'Šokinėti, trankyti duris ir leisti garsią muziką',
          'Laikytis ramybės meto (ramybės valandų) ir nebekelti triukšmo',
          'Bėgioti koridoriais'
        ],
        correctIndex: 1,
        explanation: 'Vakare ir naktį žmonės ilsisi, todėl triukšmauti griežtai nemandagu.'
      }
    ]
  },
  {
    id: 'quiz-digital',
    title: 'Skaitmeninis etiketas ir išmanieji',
    description: 'Kaip mandagiai naudotis telefonu, rašyti žinutes ir elgtis internete?',
    icon: '📱',
    category: 'Skaitmeninis pasaulis',
    questions: [
      {
        question: 'Ar tinka rašyti žinutę draugui ar mokytojui TIK DIDŽIOSIOMIS RAIDĖMIS (CAPS LOCK)?',
        options: [
          'Taip, nes atrodo gražiau',
          'Ne, nes interneto kultūroje tai reiškia ŠAUKIMĄ ir rėkimą ant pašnekovo',
          'Nesvarbu, kokiomis raidėmis rašai'
        ],
        correctIndex: 1,
        explanation: 'DIDŽIOSIOS RAIDĖS internete suvokiamos kaip piktas šaukimas, todėl rašome įprastai.'
      },
      {
        question: 'Ką darome su telefonu, kai bendraujame gyvai su draugu ar šeima prie stalo?',
        options: [
          'Laikome prieš nosį ir nuolat tikriname socialinius tinklus',
          'Nusukame ekranu žemyn, išjungiame garsą ir skiriame dėmesį šalia esantiems',
          'Garsiai žaidžiame žaidimus'
        ],
        correctIndex: 1,
        explanation: 'Tikras ryšys su šalia esančiu žmogumi yra daug svarbesnis už telefono ekraną.'
      },
      {
        question: 'Jei nori nufotografuoti draugą ir įkelti į internetą, ką pirmiausia privalai padaryti?',
        options: [
          'Įkelti slapta ir pažymėti visus jo kontaktus',
          'Atsiklausti draugo leidimo: „Ar galiu tave nufotografuoti ir pasidalinti?“',
          'Nuotrauką parduoti'
        ],
        correctIndex: 1,
        explanation: 'Kiekvienas žmogus turi teisę į savo atvaizdą ir privatumą.'
      },
      {
        question: 'Kaip elgtis pamačius piktą ar žeidžiantį komentarą internete (kiberpatyčias)?',
        options: [
          'Prisidėti prie patyčių ir parašyti dar pikčiau',
          'Nepalaikyti patyčių, palaikyti skriaudžiamąjį ir pranešti suaugusiems / administratoriui',
          'Išsaugoti ir dalintis su visais'
        ],
        correctIndex: 1,
        explanation: 'Kiberpatyčios yra žalingos. Tikras etiketo meistras visada palaiko pagarbą ir saugumą.'
      },
      {
        question: 'Koks laikas yra tinkamiausias skambinti draugams ar mokytojams darbo/mokslo klausimais?',
        options: [
          'Vidurnaktį arba 5 valandą ryto',
          'Dienos metu, tarp 9:00 ir 20:00 valandos',
          'Per pamokos vidurį'
        ],
        correctIndex: 1,
        explanation: 'Gerbiame kitų žmonių poilsio laiką ir skambiname tik tinkamu dienos metu.'
      }
    ]
  },
  {
    id: 'quiz-nature',
    title: 'Gamtos ir parko etiketas',
    description: 'Kaip elgtis miške, parke ir prie vandens telkinių?',
    icon: '🌳',
    category: 'Gamta',
    questions: [
      {
        question: 'Ar mandagu garsiai klausytis muzikos per kolonėlę miške ar viešajame paplūdimyje?',
        options: [
          'Taip, tegul visi džiaugiasi gera muzika',
          'Ne, tai trikdo gyvūnus ir kitus žmones, kurie atėjo pailsėti gamtos tyloje',
          'Tik jei muzika labai linksma'
        ],
        correctIndex: 1,
        explanation: 'Gamtoje gerbiame ramybę. Triukšmas gąsdina miško gyventojus ir erzina poilsiautojus.'
      },
      {
        question: 'Ką darome su šiukšlėmis po iškylos gamtoje, jei netoliese nėra šiukšliadėžės?',
        options: [
          'Paliekame po medžiu, nes jos „pasislėps“',
          'Susidedame į maišelį ir išsivežame su savimi iki artimiausio konteinerio',
          'Užkasame po žemėmis'
        ],
        correctIndex: 1,
        explanation: 'Auksinė taisyklė: iš gamtos išsinešk viską, ką atsinešei.'
      },
      {
        question: 'Ar galima skinti gražias gėles ir ardyti medžių šakas viešuosiuose parkuose?',
        options: [
          'Ne, gėlės skirtos tam, kad jomis džiaugtųsi visi lankytojai',
          'Taip, po vieną gėlę niekam nepakenks',
          'Tik jei niekas nemato'
        ],
        correctIndex: 0,
        explanation: 'Parko augalai yra bendras visų turtas. Skinti juos draudžiama, kad parkas išliktų gražus.'
      },
      {
        question: 'Kaip elgtis pamačius laukinį gyvūną ar paukščio lizdą?',
        options: [
          'Bėgti link jo, bandyti paglostyti ar paimti į rankas',
          'Stebėti iš tolo, elgtis tyliai ir nieko neliesti',
          'Mesti į jį kankorėžį'
        ],
        correctIndex: 1,
        explanation: 'Žmogaus prisilietimas ar kvapas gali išgąsdinti gyvūną ar priversti paukščius palikti lizdą.'
      },
      {
        question: 'Ar mandagu šerti antis ar gulbes batono trupiniais?',
        options: [
          'Taip, tai joms labai skanu',
          'Geriau to nedaryti, nes miltai joms kenkia; geriau pasiūlyti specialių grūdų ar daržovių',
          'Tik žiemą'
        ],
        correctIndex: 1,
        explanation: 'Batonas nėra natūralus paukščių maistas ir gali susargdinti. Geriau šerti tam skirtu lesalu.'
      }
    ]
  },
  {
    id: 'quiz-celebrations',
    title: 'Dovanų ir švenčių etiketas',
    description: 'Kaip mandagiai sveikinti, dovanoti ir priimti dovanas?',
    icon: '🎁',
    category: 'Šventės',
    questions: [
      {
        question: 'Ką daryti gavus dovaną, kuri tau visiškai nepatinka ar jau tokią turi?',
        options: [
          'Pasakyti: „Ačiū, bet man ji nepatinka, pasiimk atgal“',
          'Nusišypsoti ir nuoširdžiai padėkoti už dovanotojo dėmesį ir laiką',
          'Iškart bandyti ją parduoti'
        ],
        correctIndex: 1,
        explanation: 'Dėkojame ne už daiktą, o už tai, kad žmogus apie tave galvojo ir norėjo pradžiuginti.'
      },
      {
        question: 'Ar mandagu lankytojui klausti, kiek kainavo gauta dovana?',
        options: [
          'Ne, tai labai nemandagu ir sukelia nepatogumų',
          'Taip, kad žinotum, kiek atsilyginti',
          'Tik jei dovana atrodo labai brangi'
        ],
        correctIndex: 0,
        explanation: 'Dovanos vertė matuojama ne pinigais, o nuoširdumu. Klausti kainos yra etiketo klaida.'
      },
      {
        question: 'Kada geriausia pranešti, jei gavai kvietimą į gimtadienį, bet tikrai negalėsi atvykti?',
        options: [
          'Tą pačią šventės dieną likus valandai',
          'Kuo skubiau, kad šeimininkai galėtų planuoti vaišes ir vietas',
          'Visai nieko nesakyti'
        ],
        correctIndex: 1,
        explanation: 'Greitas atsakymas rodo pagarbą šeimininkų laikui ir pastangoms.'
      },
      {
        question: 'Ką tinka parašyti ant padėkos atviruko po šventės?',
        options: [
          'Tik savo vardą',
          'Už ką konkrečiai dėkoji ir kodėl tai tau buvo svarbu ar malonu',
          'Sąrašą kitų daiktų, kurių norėtum'
        ],
        correctIndex: 1,
        explanation: 'Konkreti padėka parodo, kad dovana ar apsilankymas tau iš tiesų paliko gerą įspūdį.'
      },
      {
        question: 'Jei šventėje matai žmogų, kuris nieko nepažįsta ir stovi vienas?',
        options: [
          'Prieiti, prisistatyti ir padėti jam įsitraukti į bendrą pokalbį ar žaidimą',
          'Aptarinėti jį su kitais draugais',
          'Palikti jį ramybėje'
        ],
        correctIndex: 0,
        explanation: 'Geras šventės dalyvis rūpinasi, kad visi jaustųsi laukiami ir jaukiai.'
      }
    ]
  }
];

