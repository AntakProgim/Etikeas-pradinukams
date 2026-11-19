import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type, ThinkingLevel, GenerateVideosOperation } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini client with required User-Agent
let aiClient: GoogleGenAI | null = null;
function getAIClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// API Routes
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// AI Etiquette Owl helper endpoint
app.post("/api/ask-owl", async (req, res) => {
  try {
    const { question, category } = req.body || {};
    if (!question || typeof question !== "string" || !question.trim()) {
      return res.status(400).json({ error: "Prašome įrašyti klausimą pelėdai." });
    }

    const ai = getAIClient();
    if (!ai) {
      return res.status(503).json({
        error: "Pelėdos išmanusis patarėjas šiuo metu nepasiekiamas, nes trūksta sukonfigūruoto DI ryšio."
      });
    }

    const systemPrompt = `Tu esi „Išmintingoji Etiketo Pelėda“ – linksmas, palaikantis, šiltas ir draugiškas etiketo mokytojas pradinukams (7–11 m. vaikams).
Tavo žinios paremtos knyga „Good Manners for Today's Kids“ (Bob & Emilie Barnes).
Svarbiausios knygos taisyklės ir temos:
1. Pagarba kitiems (Auksinė taisyklė: elgtis su kitais taip, kaip nori, kad elgtųsi su tavimi).
2. Garbingas žaidimas (Fair play): pasveikinti laimėtoją, paspausti ranką pralaimėjus, paguosti susižeidusį, neapgaudinėti, nesišaipyti.
3. Svečiuose ir namuose: neliesti svetimų daiktų, neknisti stalčių, nusiauti batus, atnešti mažą dovanėlę šeimininkams, padėti susitvarkyti, niekada nesakyti „o pas mus namie geriau...“.
4. Stalo etiketas: servetėlė ant kelių, šakutė kairėje, peilis dešinėje (ašmenys į vidų), kramtyti sučiaupta burna, nesiurbti su šiaudeliu, nesiekti per visą stalą (paprašyti paduoti), maistą siųsti į dešinę.
5. Higiena ir tvarka: plauti rankas, čiaudėti į nosinaitę/alkūnę (ne į rankovę!), palikti švarų vonios kambarį, nuleisti tualeto dangtį, rengtis tvarkingai.
6. Bendravimas: žiūrėti į akis, pasisveikinti, nepriekaištauti dėl keistumų, rašyti padėkos laiškelį.

Atsakyk tiksliai į konkretų vaiko klausimą LIETUVIŲ KALBA, vaikiškai, aiškiai, šiltai ir padrąsinančiai (2–3 trumpos pastraipos).
Taip pat pateik 3 konkrečius praktinius žingsnius („tips“).`;

    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite",
      contents: `Vaiko klausimas (tema: ${category || 'Bendra'}): "${question.trim()}"`,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            answer: {
              type: Type.STRING,
              description: "Šiltas, aiškus atsakymas pradinukui lietuvių kalba."
            },
            tips: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "2-3 konkretūs praktiniai patarimai vaikui."
            }
          },
          required: ["answer", "tips"]
        },
        thinkingConfig: { thinkingLevel: ThinkingLevel.MINIMAL },
      }
    });

    const rawText = (response.text ?? "").trim();
    const cleanJson = rawText.replace(/^```json\s*/i, "").replace(/```$/i, "").trim();
    if (!cleanJson) {
      return res.status(502).json({ error: "Pelėda nespėjo suformuluoti atsakymo. Bandyk dar kartą!" });
    }

    try {
      const parsed = JSON.parse(cleanJson);
      return res.json({
        answer: typeof parsed.answer === "string" && parsed.answer.trim() ? parsed.answer : cleanJson,
        tips: Array.isArray(parsed.tips) ? parsed.tips.filter((t: unknown) => typeof t === "string") : []
      });
    } catch {
      return res.json({
        answer: cleanJson,
        tips: ["Būk mandagus ir atidus kitiems!", "Pasisveikink ir padėkok.", "Šypsena padeda visada!"]
      });
    }
  } catch (error: unknown) {
    console.error("AI Owl error:", error);
    const errObj = error as { status?: number; message?: string };
    const status = errObj?.status;
    const rawMsg = error instanceof Error ? error.message : String(error);
    if (status === 429 || rawMsg.includes("429") || rawMsg.includes("RESOURCE_EXHAUSTED")) {
      return res.status(429).json({
        error: "Šiuo metu pelėda sulaukė labai daug klausimų (viršytas užklausų limitas). Luktelėk kelias sekundes ir pabandyk dar kartą!"
      });
    }
    if (status === 403 || status === 401 || rawMsg.includes("403") || rawMsg.includes("PERMISSION_DENIED") || rawMsg.includes("API_KEY_INVALID") || rawMsg.includes("API key not valid")) {
      return res.status(403).json({
        error: "Nepavyko prisijungti prie pelėdos DI tarnybos (patikrinkite API rakto nustatymus)."
      });
    }
    if (status === 404 || rawMsg.includes("404") || rawMsg.includes("NOT_FOUND")) {
      return res.status(502).json({
        error: "DI modelis laikinai nepasiekiamas (404)."
      });
    }
    return res.status(500).json({
      error: `Nepavyko gauti pelėdos atsakymo (${status || 'klaida'}). Pabandyk dar kartą!`,
      details: rawMsg.slice(0, 200)
    });
  }
});

// AI Character Animation Scene Generator
app.post("/api/ai/generate-character-scene", async (req, res) => {
  try {
    const { situation, characterId, characterName } = req.body;
    if (!situation) {
      return res.status(400).json({ error: "Trūksta situacijos aprašymo." });
    }

    const ai = getAIClient();
    const charName = characterName || "Pelėdžiukas Barnis";

    if (!ai) {
      // High-quality local generator fallback
      return res.json({
        id: `scene_${Date.now()}`,
        title: situation,
        situation: situation,
        characterId: characterId || "owl",
        characterName: charName,
        lessonSummary: "Mandagumas padeda išspręsti bet kokią keblią situaciją ramiai ir draugiškai.",
        magicPhrase: "„Ačiū, prašau ir atsiprašau visada atveria duris!“",
        frames: [
          {
            step: 1,
            stageTitle: "1. Keista ar kebli akimirka",
            characterAction: `${charName} atsiduria situacijoje: „${situation}“. Pirmas impulsas – sutrikti arba padaryti nepagalvojus.`,
            characterEmotion: "thinking",
            speechBubble: "Hm, ką dabar geriausia daryti? Reikia prisiminti etiketo taisykles!",
            etiquetteTip: "Prieš ką nors sakydamas ar darydamas, sekundę sustok ir pagalvok apie kitus.",
            visualDescription: `${charName} susimąstęs žiūri į situaciją ir apgalvoja geriausią elgesio būdą.`,
            bgColor: "from-amber-100 to-orange-100"
          },
          {
            step: 2,
            stageTitle: "2. Mandagus pasirinkimas",
            characterAction: `${charName} nusišypso, išsitiesia ir pasirenka pagarbų elgesį pagal knygos taisykles.`,
            characterEmotion: "polite",
            speechBubble: "Aš elgsiuosi taip, kaip norėčiau, kad su manimi elgtųsi kiti!",
            etiquetteTip: "Pažvelk pašnekovui tiesiai į akis, nusiramink ir nusišypsok.",
            visualDescription: `${charName} su šypsena kreipiasi į aplinkinius ramiai ir pagarbiai.`,
            bgColor: "from-blue-100 to-indigo-100"
          },
          {
            step: 3,
            stageTitle: "3. Magiškas sakinys ar veiksmas",
            characterAction: `${charName} ištaria mandagų prašymą, atsiprašymą ar padėką.`,
            characterEmotion: "happy",
            speechBubble: "„Atsiprašau, ar galėtumėte man padėti?“ / „Ačiū už jūsų supratimą!“",
            etiquetteTip: "Taisyklingai ištarti stebuklingi žodžiai akimirksniu sušvelnina atmosferą.",
            visualDescription: `${charName} mandagiai pasako reikiamus žodžius ir visi aplinkui pradeda šypsotis.`,
            bgColor: "from-emerald-100 to-teal-100"
          },
          {
            step: 4,
            stageTitle: "4. Laiminga ir džiugi pabaiga",
            characterAction: `Visi džiaugiasi, situacija išspręsta gražiai, ${charName} gauna pagyrimą ir tampa dienos herojumi!`,
            characterEmotion: "proud",
            speechBubble: "Valio! Mandagus elgesys visada atneša geriausią rezultatą!",
            etiquetteTip: "Šaunuolis! Tikras etiketo meistras sukuria gerą nuotaiką visiems.",
            visualDescription: `${charName} linksmai mojuoja su etiketo žvaigždute, o draugai jam ploja.`,
            bgColor: "from-yellow-100 to-amber-100"
          }
        ]
      });
    }

    const prompt = `Tu esi vaikų etiketo animacijų scenaristas. Sukurk 4 kadrų (scenų) linksmą, mokomąją animacijos istoriją pradinukams apie teisingą elgesį situacijoje: "${situation}".
Pagrindinis animacijos personažas: ${charName} (pvz. mielas animacinis gyvūnėlis ar vaikas).
Knyga: Bob & Emilie Barnes „Good Manners for Today's Kids“.
Auksinė taisyklė: elkis su kitais taip, kaip nori, kad su tavimi elgtųsi.

SVARBU: Visi tekstai LIETUVIŲ KALBA, taisyklinga sakinio pradžios didžiąja raide (Lithuanian sentence case).

Grąžink griežtai JSON formatu:
{
  "id": "scene_custom",
  "title": "Trumpas situacijos pavadinimas",
  "situation": "${situation}",
  "characterId": "${characterId || 'owl'}",
  "characterName": "${charName}",
  "lessonSummary": "Vieno sakinio aiški etiketo pamoka vaikui",
  "magicPhrase": "Magiškas mandagus sakinys, kurį vaikas turi įsiminti",
  "frames": [
    {
      "step": 1,
      "stageTitle": "1. Situacijos pradžia (Iššūkis)",
      "characterAction": "Ką personažas daro ir su kuo susiduria...",
      "characterEmotion": "thinking",
      "speechBubble": "Personažo mintis ar sakinys...",
      "etiquetteTip": "Patarimas vaikui, kaip atpažinti šį momentą",
      "visualDescription": "Vaizdo aprašymas animacijai",
      "bgColor": "from-amber-100 to-orange-100"
    },
    {
      "step": 2,
      "stageTitle": "2. Teisingas sprendimas",
      "characterAction": "Personažas prisimena gerų manierų taisyklę...",
      "characterEmotion": "polite",
      "speechBubble": "Personažo sakinys...",
      "etiquetteTip": "Patarimas, kaip elgtis",
      "visualDescription": "Vaizdo aprašymas",
      "bgColor": "from-blue-100 to-cyan-100"
    },
    {
      "step": 3,
      "stageTitle": "3. Mandagus veiksmas / Magiškas žodis",
      "characterAction": "Personažas atlieka mandagų veiksmą...",
      "characterEmotion": "happy",
      "speechBubble": "Konkretus mandagus sakinys balsu...",
      "etiquetteTip": "Praktinė etiketo taisyklė",
      "visualDescription": "Vaizdo aprašymas",
      "bgColor": "from-emerald-100 to-teal-100"
    },
    {
      "step": 4,
      "stageTitle": "4. Laiminga pabaiga ir pergalė",
      "characterAction": "Visi patenkinti, draugystė išsaugota...",
      "characterEmotion": "proud",
      "speechBubble": "Personažo džiaugsminga išvada...",
      "etiquetteTip": "Paskatinimas būti mandagiu kasdien",
      "visualDescription": "Vaizdo aprašymas",
      "bgColor": "from-yellow-100 to-amber-100"
    }
  ]
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        thinkingConfig: { thinkingLevel: ThinkingLevel.MINIMAL },
      }
    });

    const responseText = (response.text || "{}").replace(/^```json\s*/i, "").replace(/```$/i, "").trim();
    const parsed = JSON.parse(responseText);
    return res.json(parsed);
  } catch (err) {
    console.error("Generate scene error (providing graceful fallback):", err);
    const { situation, characterId, characterName } = req.body || {};
    const charName = characterName || "Pelėdžiukas Barnis";
    // Graceful fallback if Gemini API is rate-limited or unavailable
    return res.json({
      id: `scene_${Date.now()}`,
      title: situation || "Mandagus elgesys kasdienybėje",
      situation: situation || "Kaip elgtis mandagiai",
      characterId: characterId || "owl",
      characterName: charName,
      lessonSummary: "Mandagumas padeda išspręsti bet kokią keblią situaciją ramiai ir draugiškai.",
      magicPhrase: "„Ačiū, prašau ir atsiprašau visada atveria duris!“",
      frames: [
        {
          step: 1,
          stageTitle: "1. Keista ar kebli akimirka",
          characterAction: `${charName} atsiduria situacijoje: „${situation}“. Pirmas impulsas – sutrikti arba padaryti nepagalvojus.`,
          characterEmotion: "thinking",
          speechBubble: "Hm, ką dabar geriausia daryti? Reikia prisiminti etiketo taisykles!",
          etiquetteTip: "Prieš ką nors sakydamas ar darydamas, sekundę sustok ir pagalvok apie kitus.",
          visualDescription: `${charName} susimąstęs žiūri į situaciją ir apgalvoja geriausią elgesio būdą.`,
          bgColor: "from-amber-100 to-orange-100"
        },
        {
          step: 2,
          stageTitle: "2. Mandagus pasirinkimas",
          characterAction: `${charName} nusišypso, išsitiesia ir pasirenka pagarbų elgesį pagal knygos taisykles.`,
          characterEmotion: "polite",
          speechBubble: "Aš elgsiuosi taip, kaip norėčiau, kad su manimi elgtųsi kiti!",
          etiquetteTip: "Pažvelk pašnekovui tiesiai į akis, nusiramink ir nusišypsok.",
          visualDescription: `${charName} su šypsena kreipiasi į aplinkinius ramiai ir pagarbiai.`,
          bgColor: "from-blue-100 to-indigo-100"
        },
        {
          step: 3,
          stageTitle: "3. Magiškas sakinys ar veiksmas",
          characterAction: `${charName} ištaria mandagų prašymą, atsiprašymą ar padėką.`,
          characterEmotion: "happy",
          speechBubble: "„Atsiprašau, ar galėtumėte man padėti?“ / „Ačiū už jūsų supratimą!“",
          etiquetteTip: "Taisyklingai ištarti stebuklingi žodžiai akimirksniu sušvelnina atmosferą.",
          visualDescription: `${charName} mandagiai pasako reikiamus žodžius ir visi aplinkui pradeda šypsotis.`,
          bgColor: "from-emerald-100 to-teal-100"
        },
        {
          step: 4,
          stageTitle: "4. Laiminga ir džiugi pabaiga",
          characterAction: `Visi džiaugiasi, situacija išspręsta gražiai, ${charName} gauna pagyrimą ir tampa dienos herojumi!`,
          characterEmotion: "proud",
          speechBubble: "Valio! Mandagus elgesys visada atneša geriausią rezultatą!",
          etiquetteTip: "Šaunuolis! Tikras etiketo meistras sukuria gerą nuotaiką visiems.",
          visualDescription: `${charName} linksmai mojuoja su etiketo žvaigždute, o draugai jam ploja.`,
          bgColor: "from-yellow-100 to-amber-100"
        }
      ]
    });
  }
});

// AI Video Generation (Veo 3.1 Lite) - 3-step POST flow
app.post("/api/ai/generate-video", async (req, res) => {
  try {
    const { situation, characterName } = req.body;
    const ai = getAIClient();
    if (!ai) {
      return res.status(503).json({ error: "AI vaizdo generavimui reikalingas sukonfigūruotas API raktas." });
    }

    const videoPrompt = `Cute 3D animated Pixar-style cartoon short clip for kids. A friendly character (${characterName || 'a wise little owl'}) demonstrating good manners in a modern setting: ${situation || 'politely asking to be excused from the dinner table'}. Bright pastel colors, warm lighting, cheerful happy expressions, educational and heartwarming.`;

    const operation = await ai.models.generateVideos({
      model: "veo-3.1-lite-generate-preview",
      prompt: videoPrompt,
      config: {
        numberOfVideos: 1,
        resolution: "720p",
        aspectRatio: "16:9",
      }
    });

    return res.json({ operationName: operation.name });
  } catch (error: unknown) {
    console.error("Video generation start error:", error);
    const rawMsg = error instanceof Error ? error.message : String(error);
    const isQuotaExceeded =
      rawMsg.includes("429") ||
      rawMsg.includes("RESOURCE_EXHAUSTED") ||
      rawMsg.includes("quota") ||
      rawMsg.includes("rate-limit") ||
      rawMsg.includes("exceeded your current quota");

    if (isQuotaExceeded) {
      return res.status(429).json({
        error: "DI vaizdo modelio (Veo) užklausų kvota šiuo metu išnaudota (429 Rate Limit / Quota Exceeded). Rekomenduojame naudotis interaktyviu animuotų scenų grotuvu!",
        isQuota: true
      });
    }

    return res.status(500).json({ error: rawMsg || "Nepavyko paleisti vaizdo generavimo." });
  }
});

app.post("/api/ai/video-status", async (req, res) => {
  try {
    const { operationName } = req.body;
    if (!operationName) {
      return res.status(400).json({ error: "Trūksta operationName parametro." });
    }

    const ai = getAIClient();
    if (!ai) {
      return res.status(503).json({ error: "AI klientas neaktyvus." });
    }

    const op = new GenerateVideosOperation();
    op.name = operationName;
    const updated = await ai.operations.getVideosOperation({ operation: op });

    return res.json({ done: Boolean(updated.done), error: updated.error });
  } catch (error) {
    console.error("Video status error:", error);
    return res.status(500).json({ error: "Klaida tikrinant vaizdo įrašo būseną." });
  }
});

app.post("/api/ai/video-download", async (req, res) => {
  try {
    const { operationName } = req.body;
    const ai = getAIClient();
    if (!ai || !process.env.GEMINI_API_KEY) {
      return res.status(503).json({ error: "AI klientas neaktyvus." });
    }

    const op = new GenerateVideosOperation();
    op.name = operationName;
    const updated = await ai.operations.getVideosOperation({ operation: op });
    const uri = updated.response?.generatedVideos?.[0]?.video?.uri;

    if (!uri) {
      return res.status(404).json({ error: "Vaizdo įrašo nuoroda nerasta." });
    }

    const videoRes = await fetch(uri, {
      headers: { "x-goog-api-key": process.env.GEMINI_API_KEY },
    });

    if (!videoRes.ok) {
      return res.status(videoRes.status).json({ error: "Nepavyko atsiųsti vaizdo įrašo." });
    }

    res.setHeader("Content-Type", "video/mp4");
    const arrayBuffer = await videoRes.arrayBuffer();
    return res.send(Buffer.from(arrayBuffer));
  } catch (error) {
    console.error("Video download error:", error);
    return res.status(500).json({ error: "Klaida atsiunčiant vaizdo įrašą." });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

