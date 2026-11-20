import { QuizQuestion } from '../types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "Jei per šventę nesi tikras, kurį stalo įrankį paimti, geriausia stebėti šeimininką ar šeimininkę ir daryti kaip jie?",
    correctAnswer: true,
    category: "table",
    explanation: "Teisingai! Stebėti šeimininkus ir sekti jų pavyzdžiu yra puikus ir mandagus būdas nesuklysti.",
    hint: "Pagalvok, ar šeimininkai geriausiai žino savo vaišių tvarką."
  },
  {
    id: 2,
    question: "Ar restorane arba kavinėje tinka garsiai šūkauti telefonu ar kalbėtis su žmogumi prie kito tolimo staliuko?",
    correctAnswer: false,
    category: "public",
    explanation: "Tikrai ne! Viešoje vietoje kalbame ramiu balsu, kad netrukdytume kitiems žmonėms ilsėtis ir mėgautis maistu.",
    hint: "Kaip jaustųsi kiti lankytojai, jei visi rėkautų?"
  },
  {
    id: 3,
    question: "Prieš atsivedant papildomą draugą ar brolį/sesę į svečius ar gimtadienį, būtina iš anksto atsiklausti šeimininko?",
    correctAnswer: true,
    category: "friends",
    explanation: "Taip! Šeimininkai turi žinoti, kiek svečių laukti, kad paruoštų pakankamai vietos ir vaišių.",
    hint: "Ar šeimininkams būtų lengva, jei atvyktų netikėti svečiai?"
  },
  {
    id: 4,
    question: "Ar mandagu restorane pūsti oro burbulus į sultis ar limonadą per šiaudelį?",
    correctAnswer: false,
    category: "table",
    explanation: "Tikrai ne! Burbulų pūtimas sukelia triukšmą ir gali aptaškyti staltiesę ar kaimynus.",
    hint: "Ar tai skamba mandagiai prie pietų stalo?"
  },
  {
    id: 5,
    question: "Serviruojant stalą, salotų šakutė dedama į kairę nuo pagrindinės pietų šakutės (išorėje)?",
    correctAnswer: true,
    category: "table",
    explanation: "Taip! Šakutės visada dedamos kairėje lėkštės pusėje, o pirmoji naudojama ta, kuri yra toliausiai nuo lėkštės (išorėje).",
    hint: "Prisimink stalo serviravimo taisyklę iš išorės į vidų."
  },
  {
    id: 6,
    question: "Ar galima pačiam tiesti ranką per visą stalą siekiant duonos ar druskos, jei tik nieko nenuverti?",
    correctAnswer: false,
    category: "table",
    explanation: "Ne! Tiestis per kitų lėkštes nemandagu. Reikia gražiai paprašyti: „Prašau, paduokite duonos.“",
    hint: "Ką geriau daryti – siekti ar mandagiai paprašyti?"
  },
  {
    id: 7,
    question: "Jei tarpdančiuose įstrigo maisto ir reikia pasinaudoti dantų krapštuku, geriau atsiprašyti ir nueiti į tualetą?",
    correctAnswer: true,
    category: "table",
    explanation: "Būtent taip! Dantų krapštymas prie stalo kitiems gali pasirodyti nemalonus, todėl tai daroma vonios kambaryje.",
    hint: "Ar malonu kitiems žiūrėti į krapštomus dantis?"
  },
  {
    id: 8,
    question: "Kai gauni dovaną, visai nebūtina pasakyti „Ačiū“ ar parašyti padėkos žinutės?",
    correctAnswer: false,
    category: "communication",
    explanation: "Klaidinga! Už kiekvieną dovaną privaloma nuoširdžiai padėkoti – žodžiu arba gražiu padėkos laišku.",
    hint: "Pagalvok, kaip jaučiasi dovanotojas, kai jam nepadėkoja."
  },
  {
    id: 9,
    question: "Ar tinka iškart sviestu ištepti visą duonos riekę, kad sutaupytum laiko ir jėgų?",
    correctAnswer: false,
    category: "table",
    explanation: "Ne! Pagal stalo etiketą atsilaužiamas vieno kąsnio dydžio gabalėlis duonos ir užtepamas sviestu tik tas kąsnis.",
    hint: "Duoną valgome po vieną mažą kąsnelį."
  },
  {
    id: 10,
    question: "Pietų peilis dedamas į dešinę nuo lėkštės, o jo ašmenys turi būti nukreipti į išorę (nuo lėkštės)?",
    correctAnswer: false,
    category: "table",
    explanation: "Ne! Peilio ašmenys VISADA turi būti atsukti į lėkštę – tai taikumo ir pagarbos ženklas.",
    hint: "Į kurią pusę žiūri peilio dantukai ar ašmenys?"
  },
  {
    id: 11,
    question: "Kai prie stalo svečiai prašo perduoti maisto dubenį ar duoną, perduodame ratu į kairę?",
    correctAnswer: false,
    category: "table",
    explanation: "Ne! Pagal tradicinį etiketą patiekalai prie stalo visada perduodami į dešinę pusę (pagal laikrodžio rodyklę).",
    hint: "Kokia ranka dažniausiai priimame daiktus?"
  },
  {
    id: 12,
    question: "Už ypatingą ar didelę dovaną pakanka atsiųsti tik trumpą šypsenėlę per telefoną?",
    correctAnswer: false,
    category: "communication",
    explanation: "Ne! Nors greita žinutė geriau nei nieko, ranka parašytas atvirukas ar nuoširdus skambutis parodo tikrą pagarbą.",
    hint: "Kuris padėkos būdas šiltesnis ir nuoširdesnis?"
  },
  {
    id: 13,
    question: "Siunčiant gimtadienio kvietimus, draugams reikia duoti pakankamai laiko apsispręsti ir atsakyti?",
    correctAnswer: true,
    category: "friends",
    explanation: "Taip! Kvietimus dera išsiųsti prieš 1–2 savaites, kad draugų šeimos spėtų susiplanuoti laiką.",
    hint: "Ar lengva atvykti į šventę, jei sužinai tik prieš 10 minučių?"
  },
  {
    id: 14,
    question: "Jei valgio metu trumpam atsistoji nuo stalo, servetėlę reikia numesti dešinėje lėkštės pusėje?",
    correctAnswer: false,
    category: "table",
    explanation: "Ne! Trumpam pasitraukus, servetėlė tvarkingai paliekama ant kėdės sėdynės arba kairėje lėkštės pusėje.",
    hint: "Kur dėti servetėlę, kad padavėjas žinotų, jog tu dar grįši?"
  },
  {
    id: 15,
    question: "Teatre, koncerte ar pamokos metu mobilusis telefonas turi būti visiškai nutildytas arba išjungtas?",
    correctAnswer: true,
    category: "public",
    explanation: "Tikrai taip! Netikėtas skambutis ar žaidimo garsas blaško aktorius, mokytojus ir kitus žiūrovus.",
    hint: "Ar norėtum, kad per įdomiausią filmo vietą kažkam užgroti telefonas?"
  },
  {
    id: 16,
    question: "Ar tinka į teatrą, šventę ar bažnyčią ateiti su sportine apranga ar purvinais kedais?",
    correctAnswer: false,
    category: "hygiene",
    explanation: "Ne! Apranga parodo pagarbą vietai ir renginiui. Šventinėms progoms renkamės švaresnius, puošnesnius drabužius.",
    hint: "Ar į futbolo varžybas eitume su fraku, o į teatrą su sportine apranga?"
  },
  {
    id: 17,
    question: "Jei susirgai ir negali atvykti į draugo šventę, būtina jam paskambinti ar parašyti iš anksto?",
    correctAnswer: true,
    category: "friends",
    explanation: "Būtinai! Taip šeimininkas nesijaudins, žinos, kad neatvyksi dėl ligos, ir palinkės tau pasveikti.",
    hint: "Ar draugas nerimautų, jei tiesiog nepasirodytum be žinios?"
  },
  {
    id: 18,
    question: "Džentelmenui ar mandagiam berniukui dera praleisti mergaites pirma ir prilaikyti duris?",
    correctAnswer: true,
    category: "friends",
    explanation: "Taip! Durų prilaikymas ir paslaugumas yra tikro mandagumo ir pagarbos ženklas visiems.",
    hint: "Ar durų prilaikymas parodo rūpestį?"
  },
  {
    id: 19,
    question: "Sveikinantis, berniukas turėtų palaukti, kol suaugusi moteris ar mergaitė pirmoji išties ranką pasisveikinimui?",
    correctAnswer: true,
    category: "communication",
    explanation: "Taip! Pagal klasikinį etiketą moteris ar vyresnis asmuo pirmas sprendžia, ar ištiesti ranką paspaudimui.",
    hint: "Kas turi pirmenybę siūlyti rankos paspaudimą?"
  },
  {
    id: 20,
    question: "Signalizavimas padavėjui, kad baigei valgyti – tai peilio ir šakutės padėjimas sukryžiuotų ties 9 valanda?",
    correctAnswer: false,
    category: "table",
    explanation: "Ne! Baigus valgyti, šakutė ir peilis sudedami lygiagrečiai vienas šalia kito (maždaug ties 4–5 valandos arba 6 valandos rodykle).",
    hint: "Kaip padėti įrankius – sukryžiuotus ar gražiai suglaustus?"
  }
];

export function getQuizFeedback(score: number): { title: string; desc: string; badge: string; stars: number } {
  if (score >= 19) {
    return {
      title: "Etiketo karalius / karalienė! 👑",
      desc: "Neįtikėtina! Tu žinai absoliučiai visas etiketo paslaptis ir esi tikras pavyzdys visai mokyklai!",
      badge: "👑 Etiketo genijus",
      stars: 5
    };
  } else if (score >= 16) {
    return {
      title: "Nuostabus mandagumo meistras! 🌟",
      desc: "Puikus rezultatas! Tavo tėveliai ir mokytojai gali didžiuotis tavo puikiomis manieromis!",
      badge: "🌟 Mandagumo meistras",
      stars: 4
    };
  } else if (score >= 11) {
    return {
      title: "Geras etiketo žinovas! 👍",
      desc: "Esi teisingame kelyje! Dar šiek tiek pasipraktikuok stalo ir bendravimo taisykles ir tapsi tikru čempionu.",
      badge: "🌱 Sparčiai tobulėjantis",
      stars: 3
    };
  } else if (score >= 6) {
    return {
      title: "Reikia truputį pasikartoti! 📖",
      desc: "Nieko tokio! Etiketas yra kaip sportas – kuo daugiau praktikuojiesi, tuo geriau sekasi. Pavartyk knygelės skyrius!",
      badge: "🔎 Etiketo tyrėjas",
      stars: 2
    };
  } else {
    return {
      title: "Laikas pradėti mokytis! 🚀",
      desc: "Ši programėlė sukurta būtent tau! Peržiūrėk taisykles, išbandyk stalo žaidimą ir netrukus nustebinsi visus.",
      badge: "🧭 Naujokas keliautojas",
      stars: 1
    };
  }
}
