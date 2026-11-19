import { AnimationCharacter, AICharacterAnimationStory } from '../types';

export const ANIMATION_CHARACTERS: AnimationCharacter[] = [
  {
    id: 'owl',
    name: 'Pelėdžiukas Barnis',
    role: 'Išmintingas etiketo mokytojas',
    avatar: '🦉',
    personality: 'Ramus, išmintingas, žino visas taisykles iš knygos.',
    color: 'from-amber-400 to-yellow-500'
  },
  {
    id: 'fox',
    name: 'Laputė Lėja',
    role: 'Mandagi ir linksma draugė',
    avatar: '🦊',
    personality: 'Draugiška, greita, moka pasakyti nuoširdų komplimentą.',
    color: 'from-orange-400 to-rose-500'
  },
  {
    id: 'bear',
    name: 'Meškiukas Benas',
    role: 'Gerasirdis stipruolis',
    avatar: '🐻',
    personality: 'Rūpestingas, visada padeda panešti krepšį ar atidaryti duris.',
    color: 'from-amber-600 to-amber-800'
  },
  {
    id: 'puppy',
    name: 'Šunelis Reksas',
    role: 'Garbingas žaidėjas (Fair play)',
    avatar: '🐶',
    personality: 'Moka džiaugtis draugų pergalėmis ir niekada nepyksta pralaimėjęs.',
    color: 'from-blue-400 to-indigo-500'
  },
  {
    id: 'kitten',
    name: 'Katytė Miciukė',
    role: 'Stalo ir švaros meistrė',
    avatar: '🐱',
    personality: 'Visada pasitiesia servetėlę, valgo gražiai ir plauna letenėles.',
    color: 'from-purple-400 to-pink-500'
  }
];

export const PRESET_ANIMATION_STORIES: AICharacterAnimationStory[] = [
  {
    id: 'scene_table_excuse',
    title: 'Kaip mandagiai pasiprašyti prie stalo',
    situation: 'Pavalgei skanius pietus, nori eiti žaisti su draugais, bet suaugusieji dar kalbasi prie stalo.',
    characterId: 'owl',
    characterName: 'Pelėdžiukas Barnis',
    lessonSummary: 'Niekada nepabėk nuo stalo staigiai – mandagiai padėkok ir atsiklausk!',
    magicPhrase: '„Ačiū už skanų maistą! Ar galiu eiti į savo kambarį?“',
    frames: [
      {
        step: 1,
        stageTitle: '1. Pavalgius apima nekantrumas',
        characterAction: 'Barnis baigė valgyti, lėkštė tuščia, už lango šviečia saulė ir labai norisi bėgti į kiemą.',
        characterEmotion: 'thinking',
        speechBubble: 'Aš jau pavalgiau! Noriu greitai bėgti prie žaislų... Bet palauk, negalima tiesiog pašokti!',
        etiquetteTip: 'Sustok sekundei. Prisimink: stalo etiketas reikalauja pagarbos šeimininkams ir kartu valgantiems.',
        visualDescription: 'Pelėdžiukas sėdi prie stalo, žiūri į tuščią lėkštę ir suvaldo norą pašokti nuo kėdės.',
        bgColor: 'from-amber-100 to-orange-100'
      },
      {
        step: 2,
        stageTitle: '2. Įrankių ir servetėlės tvarka',
        characterAction: 'Barnis tvarkingai sudeda šakutę ir peilį lėkštėje (4:20 val. pozicijoje) ir servetėle nusišluosto lūpas.',
        characterEmotion: 'polite',
        speechBubble: 'Pirmiausia gražiai padedu įrankius ir nusivalau lūpas servetėle.',
        etiquetteTip: 'Tvarkingai sudėti įrankiai parodo šeimininkui: „Aš baigiau valgyti, maistas buvo puikus!“.',
        visualDescription: 'Pelėdžiukas tvarkingai pasideda servetėlę šalia lėkštės ir išsitiesia kėdėje.',
        bgColor: 'from-blue-100 to-sky-100'
      },
      {
        step: 3,
        stageTitle: '3. Magiškas atsiklausimas',
        characterAction: 'Barnis palaukia, kol suaugusieji padarys pauzę pokalbyje, nusišypso ir ramiai pasiprašo.',
        characterEmotion: 'happy',
        speechBubble: '„Ačiū už labai skanią vakarienę! Ar galiu atsikelti nuo stalo?“',
        etiquetteTip: 'Nepertrauk kito sakinio viduryje – palauk mažos pauzės ir žiūrėk į akis.',
        visualDescription: 'Barnis su šilta šypsena kreipiasi į tėvelius ir šeimininkus.',
        bgColor: 'from-emerald-100 to-teal-100'
      },
      {
        step: 4,
        stageTitle: '4. Pagiriamas ir linksmas atsisveikinimas',
        characterAction: 'Visi nusišypso, pagiria Barnį už puikias manieras ir leidžia jam eiti žaisti!',
        characterEmotion: 'proud',
        speechBubble: '„Žinoma, Barni, šaunuolis! Gero žaidimo!“ – atsako šeimininkai.',
        etiquetteTip: 'Mandagus prašymas visada sukelia šypsenas ir leidžia išeiti ramia širdimi.',
        visualDescription: 'Pelėdžiukas linksmai nuskrenda su žvaigždutėmis, visi jam šypsosi.',
        bgColor: 'from-yellow-100 to-amber-100'
      }
    ]
  },
  {
    id: 'scene_fair_play',
    title: 'Kaip garbingai elgtis pralaimėjus stalo žaidimą',
    situation: 'Žaidžiant stalo žaidimą tavo draugas meta sėkmingą kauliuką ir laimi pirmą vietą, o tu lieki antras.',
    characterId: 'puppy',
    characterName: 'Šunelis Reksas',
    lessonSummary: 'Tikras čempionas moka džiaugtis kito pergale ir paspausti ranką!',
    magicPhrase: '„Sveikinu su pergale! Buvo labai smagu žaisti kartu!“',
    frames: [
      {
        step: 1,
        stageTitle: '1. Pralaimėjimo akimirka',
        characterAction: 'Reksas mato, kad draugas pasiekė finišą pirmas. Kyla noras supykti ar numesti kauliuką.',
        characterEmotion: 'thinking',
        speechBubble: 'O ne... aš taip norėjau laimėti! Ar turėčiau supykti? Ne, prisimenu Garbingo žaidėjo taisyklę!',
        etiquetteTip: 'Nusivylimas yra normalus jausmas, bet tikras etiketo herojus suvaldo pyktį.',
        visualDescription: 'Reksas giliai įkvepia, padeda žaidimo figūrėlę ir nurimsta.',
        bgColor: 'from-blue-100 to-indigo-100'
      },
      {
        step: 2,
        stageTitle: '2. Šypsena ir akių kontaktas',
        characterAction: 'Reksas nusišypso draugui, pažvelgia tiesiai į akis ir ištiesia ranką.',
        characterEmotion: 'polite',
        speechBubble: 'Žaidimas buvo labai įtemptas ir įdomus! Tu puikiai sužaidei!',
        etiquetteTip: 'Garbingas pralaimėjimas parodo didelę brandą ir tikrą draugystę.',
        visualDescription: 'Reksas linksmai mojuoja uodegėle ir tiesia letenėlę draugui.',
        bgColor: 'from-amber-100 to-yellow-100'
      },
      {
        step: 3,
        stageTitle: '3. Nuoširdus pasveikinimas',
        characterAction: 'Reksas duoda „penkis“ arba paspaudžia ranką laimėtojui.',
        characterEmotion: 'happy',
        speechBubble: '„Sveikinu, tu buvai greitesnis! Kitą kartą revanšas?“',
        etiquetteTip: 'Pasveikink laimėtoją garsiai ir aiškiai – tai sukuria draugišką atmosferą.',
        visualDescription: 'Draugai duoda vienas kitam „penkis“, aplinkui skrajoja džiaugsmo kibirkštys.',
        bgColor: 'from-emerald-100 to-teal-100'
      },
      {
        step: 4,
        stageTitle: '4. Draugystė išsaugota ir dar stipresnė',
        characterAction: 'Visi džiaugiasi, padeda sutvarkyti žaidimo lentą ir kartu juokiasi.',
        characterEmotion: 'proud',
        speechBubble: 'Laimėti smagu, bet žaisti kartu su gerais draugais – dar smagiau!',
        etiquetteTip: 'Fair play taisyklė padaro tave visų laukiamu komandos nariu.',
        visualDescription: 'Reksas ir draugai kartu tvarkosi žaidimą ir planuoja naują partiją.',
        bgColor: 'from-purple-100 to-pink-100'
      }
    ]
  },
  {
    id: 'scene_apology_bump',
    title: 'Kaip atsiprašyti netyčia užgavus draugą',
    situation: 'Bėgdamas koridoriumi ar žaidimų aikštelėje netyčia užkliudei draugą ir jam iškrito knygos.',
    characterId: 'bear',
    characterName: 'Meškiukas Benas',
    lessonSummary: 'Niekada nepabėk! Sustok, atsiprašyk ir padėk pakelti daiktus.',
    magicPhrase: '„Labai atsiprašau, ar viskas gerai? Leisk man padėti!“',
    frames: [
      {
        step: 1,
        stageTitle: '1. Nenumatytas susidūrimas',
        characterAction: 'Benas bėgdamas netyčia kliudė Laputę Lėją. Laputė išsigando, o knygos pabiro ant grindų.',
        characterEmotion: 'surprised',
        speechBubble: 'Oij! Aš netyčia! Ką daryti? Pabėgti? Tikrai ne – privalau tuoj pat padėti!',
        etiquetteTip: 'Padarius klaidą svarbiausia – nesislėpti ir nepabėgti.',
        visualDescription: 'Meškiukas sustoja, atsisuka ir skuba prie suklupusio draugo.',
        bgColor: 'from-rose-100 to-orange-100'
      },
      {
        step: 2,
        stageTitle: '2. Pagalbos pasiūlymas',
        characterAction: 'Benas priklaupia, padeda draugui atsistoti ir surenka pabirusius daiktus.',
        characterEmotion: 'polite',
        speechBubble: '„Atsiprašau, aš per greitai bėgau ir nepastebėjau. Ar nesusižeidei?“',
        etiquetteTip: 'Pirmiausia pasiteirauk apie savijautą, o ne teisinkis.',
        visualDescription: 'Meškiukas atsargiai renka knygas ir paduoda draugui.',
        bgColor: 'from-blue-100 to-sky-100'
      },
      {
        step: 3,
        stageTitle: '3. Nuoširdus atsiprašymas',
        characterAction: 'Benas paduoda daiktus, pažiūri į akis ir dar kartą švelniai atsiprašo.',
        characterEmotion: 'happy',
        speechBubble: '„Štai tavo knygelės. Pažadu kitą kartą eiti atidžiau!“',
        etiquetteTip: 'Atsiprašymas su veiksmu (pagalba) yra pats nuoširdžiausias.',
        visualDescription: 'Laputė nusišypso, paima knygas ir padėkoja už pagalbą.',
        bgColor: 'from-emerald-100 to-teal-100'
      },
      {
        step: 4,
        stageTitle: '4. Taika ir draugiškas susitaikymas',
        characterAction: 'Draugai nusišypso vienas kitam ir tęsia dieną be jokio pykčio.',
        characterEmotion: 'proud',
        speechBubble: '„Viskas gerai, Benai, ačiū kad padėjai!“ – atsako draugas.',
        etiquetteTip: 'Gražus elgesys po klaidos paverčia nemalonią situaciją draugystės pamoka.',
        visualDescription: 'Benas ir Lėja kartu keliauja į klasę besišypsodami.',
        bgColor: 'from-yellow-100 to-amber-100'
      }
    ]
  }
];
