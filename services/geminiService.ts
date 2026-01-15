
import { GoogleGenAI, Type } from "@google/genai";
import { ScriptFormValues, GeneratedScript, SocialMediaBundle, GroundingSource } from "../types";

const getAIClient = () => {
  // Ambil key manual dari localStorage jika ada, jika tidak gunakan env
  const userKey = localStorage.getItem('USER_PROVIDED_API_KEY');
  const apiKey = userKey || (process.env.API_KEY as string);
  
  if (!apiKey) {
    throw new Error("API Key tidak ditemukan. Silakan masukkan API Key Anda secara manual.");
  }
  
  return new GoogleGenAI({ apiKey });
};

export const generateViralScripts = async (params: ScriptFormValues): Promise<GeneratedScript[]> => {
  const { productUrl, style, length, hook, scriptCount } = params;
  const ai = getAIClient();

  const prompt = `
    Anda adalah seorang Expert Digital Marketer dan Copywriter Affiliate terbaik di Indonesia.
    Tugas Anda: Buatlah ${scriptCount} variasi skrip video pendek (Reels/TikTok/Shorts) berdasarkan informasi produk dari link berikut: ${productUrl}.
    
    Kriteria Skrip:
    - Gaya Bahasa: ${style}
    - Estimasi Durasi: ${length}
    - Jenis Hook: ${hook}
    
    PENTING: Gunakan format penulisan MARKDOWN yang sangat rapi untuk bagian 'content':
    ### 🪝 HOOK
    (Kalimat pembuka yang provokatif/menarik)

    > 👁️ **VISUAL**: (Instruksi visual/action di kamera)

    ### 💬 DIALOG / SCRIPT
    **Dialog**: "(Kata-kata yang diucapkan secara jelas)"

    ### 🎯 CTA (Call to Action)
    (Instruksi klik keranjang/link bio)
    
    Format Output:
    Berikan hasil dalam bentuk JSON array yang berisi tepat ${scriptCount} objek. 
    Setiap objek memiliki properti: 'id', 'title', 'content', 'hashtags' (array 5 string).
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              title: { type: Type.STRING },
              content: { type: Type.STRING },
              hashtags: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ["id", "title", "content", "hashtags"]
          }
        }
      }
    });

    const jsonStr = response.text.trim();
    const scripts = JSON.parse(jsonStr) as GeneratedScript[];
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    const sources: GroundingSource[] = [];
    if (groundingChunks) {
      groundingChunks.forEach((chunk: any) => {
        if (chunk.web) sources.push({ title: chunk.web.title, uri: chunk.web.uri });
      });
    }

    return scripts.map(script => ({ ...script, sources: sources.length > 0 ? sources : undefined }));
  } catch (error) {
    console.error("Error generating scripts:", error);
    throw error;
  }
};

export const generateSocialMediaBundle = async (selectedScript: GeneratedScript): Promise<SocialMediaBundle> => {
  const ai = getAIClient();
  const prompt = `Buat paket konten sosial media lengkap (VO, Feed, Carousel, Threads) berdasarkan skrip ini: "${selectedScript.content}". Kembalikan dalam format JSON.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            reels: { type: Type.STRING },
            feed: {
              type: Type.OBJECT,
              properties: { title: { type: Type.STRING }, visual: { type: Type.STRING }, caption: { type: Type.STRING } },
              required: ["title", "visual", "caption"]
            },
            carousel: {
              type: Type.OBJECT,
              properties: {
                slides: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { title: { type: Type.STRING }, content: { type: Type.STRING } }, required: ["title", "content"] } }
              },
              required: ["slides"]
            },
            threads: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["reels", "feed", "carousel", "threads"]
        }
      }
    });

    return JSON.parse(response.text.trim()) as SocialMediaBundle;
  } catch (error) {
    console.error("Error generating bundle:", error);
    throw error;
  }
};
