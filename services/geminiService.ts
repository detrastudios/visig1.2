
import { GoogleGenAI, Type } from "@google/genai";
import { ScriptFormValues, GeneratedScript, SocialMediaBundle, GroundingSource } from "../types";

// Always create a new instance right before use to ensure the latest API key is used.
// Named parameter mandatory as per guidelines.
const getAIClient = () => new GoogleGenAI({ apiKey: process.env.API_KEY as string });

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

    Aturan:
    - Gunakan baris kosong antar bagian.
    - Gunakan emoji yang relevan.
    - Pastikan pesan sangat mudah dipahami oleh kreator konten pemula sekalipun.
    
    Format Output:
    Berikan hasil dalam bentuk JSON array yang berisi tepat ${scriptCount} objek. 
    Setiap objek memiliki properti: 'id', 'title', 'content' (berisi markdown di atas), 'hashtags' (array 5 string).
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
              hashtags: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              }
            },
            required: ["id", "title", "content", "hashtags"]
          }
        }
      }
    });

    const jsonStr = response.text.trim();
    const scripts = JSON.parse(jsonStr) as GeneratedScript[];

    // Extracting website URLs from groundingChunks as mandatory when using googleSearch tool
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    const sources: GroundingSource[] = [];
    if (groundingChunks) {
      groundingChunks.forEach((chunk: any) => {
        if (chunk.web) {
          sources.push({
            title: chunk.web.title,
            uri: chunk.web.uri
          });
        }
      });
    }

    // Attach grounding sources to the scripts
    return scripts.map(script => ({
      ...script,
      sources: sources.length > 0 ? sources : undefined
    }));
  } catch (error) {
    console.error("Error generating scripts:", error);
    throw error;
  }
};

export const generateSocialMediaBundle = async (selectedScript: GeneratedScript): Promise<SocialMediaBundle> => {
  const ai = getAIClient();
  
  const prompt = `
    Anda adalah expert social media manager. Berdasarkan skrip video ini:
    "${selectedScript.content}"
    
    Buatlah paket konten sosial media lengkap yang mencakup:
    1. **Skrip Voice-over Iklan**: Versi skrip video pendek yang sudah dipoles sempurna untuk voice-over konten promosi.
    2. **Instagram Feed**: 1 post single image yang terdiri dari:
       - 'title': Judul HOOK yang sangat kuat, kekinian, dan powerful (Gunakan teknik copywriting kelas atas seperti curiosity gap atau benefit-driven).
       - 'visual': Deskripsi visual detail untuk desainer grafis.
       - 'caption': Detail Caption yang sangat rapi menggunakan format markdown, sertakan emoji, CTA, dan Hashtags.
    3. **Instagram Carousel**: Outline slide demi slide (Minimal 5 slide).
    4. **Threads Thread**: Utas berisi 3-5 post yang saling terhubung dan sangat conversational.

    Gunakan format JSON yang sesuai dengan schema. Gunakan emoji yang menarik dan bahasa yang sesuai dengan skrip aslinya.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            reels: { type: Type.STRING, description: "Full markdown for Voice-over script" },
            feed: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING, description: "A powerful, catchy hook title" },
                visual: { type: Type.STRING },
                caption: { type: Type.STRING }
              },
              required: ["title", "visual", "caption"]
            },
            carousel: {
              type: Type.OBJECT,
              properties: {
                slides: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      title: { type: Type.STRING },
                      content: { type: Type.STRING }
                    },
                    required: ["title", "content"]
                  }
                }
              },
              required: ["slides"]
            },
            threads: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
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
