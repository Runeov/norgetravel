/**
 * Social Media Post Generator
 * 
 * Generates LinkedIn and Facebook posts from article content
 * following Averdi's voice architecture rules.
 */

import type { Article } from '@/types/admin';

export interface SocialMediaPost {
  platform: 'linkedin' | 'facebook';
  content: string;
  hashtags: string[];
  characterCount: number;
  generatedAt: string;
}

export interface SocialMediaPostSet {
  articleId: string;
  articleTitle: string;
  linkedin: SocialMediaPost;
  facebook: SocialMediaPost;
}

/**
 * Generate social media posts for an article
 * 
 * This function uses AI to create platform-specific posts following
 * Averdi's voice architecture:
 * - LinkedIn: TANGEN mode (energetic, question-based, professional)
 * - Facebook: TANGEN mode with more casual tone
 */
export async function generateSocialMediaPosts(
  article: Article
): Promise<SocialMediaPostSet> {
  // Extract key information from article
  const { title, excerpt, content, category, tags } = article;
  
  // Generate LinkedIn post (TANGEN mode)
  const linkedinPost = await generateLinkedInPost({
    title,
    excerpt,
    content,
    category,
    tags,
  });
  
  // Generate Facebook post (TANGEN mode, more casual)
  const facebookPost = await generateFacebookPost({
    title,
    excerpt,
    content,
    category,
    tags,
  });
  
  return {
    articleId: article.id,
    articleTitle: title,
    linkedin: linkedinPost,
    facebook: facebookPost,
  };
}

/**
 * Generate LinkedIn post following TANGEN voice architecture
 * 
 * Structure:
 * 1. THE HOOK → Contrarian statement or question
 * 2. THE MEAT → 3-4 short paragraphs, sparingly use emojis (✅, 📉, 💡)
 * 3. THE TWIST → The unique Averdi perspective
 * 4. THE ENGAGEMENT → Direct question to audience
 */
async function generateLinkedInPost(params: {
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
}): Promise<SocialMediaPost> {
  const { title, excerpt, category, tags } = params;
  
  // Use AI to generate the post
  // For now, we'll create a template-based approach
  // In production, this would call an AI API (OpenAI, Anthropic, etc.)
  
  const prompt = buildLinkedInPrompt(params);
  const generatedContent = await callAIService(prompt, 'linkedin');
  
  // Extract hashtags from tags and category
  const hashtags = generateHashtags(tags, category, 'linkedin');
  
  const content = generatedContent;
  
  return {
    platform: 'linkedin',
    content,
    hashtags,
    characterCount: content.length,
    generatedAt: new Date().toISOString(),
  };
}

/**
 * Generate Facebook post following TANGEN voice architecture
 * Similar to LinkedIn but more casual and community-focused
 */
async function generateFacebookPost(params: {
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
}): Promise<SocialMediaPost> {
  const { title, excerpt, category, tags } = params;
  
  const prompt = buildFacebookPrompt(params);
  const generatedContent = await callAIService(prompt, 'facebook');
  
  const hashtags = generateHashtags(tags, category, 'facebook');
  
  const content = generatedContent;
  
  return {
    platform: 'facebook',
    content,
    hashtags,
    characterCount: content.length,
    generatedAt: new Date().toISOString(),
  };
}

/**
 * Build LinkedIn prompt following voice architecture rules
 */
function buildLinkedInPrompt(params: {
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
}): string {
  const { title, excerpt, content } = params;
  
  // Strip HTML from content for analysis
  const plainContent = stripHtml(content);
  const contentPreview = plainContent.substring(0, 500);
  
  return `
Du er en ekspert på å skrive LinkedIn-innlegg for Averdi AS, et regnskapsselskap i Nord-Norge.

AVERDI'S VOICE ARCHITECTURE - TANGEN MODE (LinkedIn):
- Start med et spørsmål eller kontrær påstand (THE HOOK)
- 3-4 korte avsnitt, maks 15-20 ord per setning
- Bruk aktive verb: dykket ned i, knekket, avdekket, bygget
- Nordnorske metaforer når relevant
- Vis entusiasme og energi
- Avslutt med et engasjerende spørsmål til publikum
- Bruk emojis sparsomt: ✅, 📉, 💡, 📋

STRUKTUR:
1. THE HOOK (1-2 setninger) → Spørsmål eller kontrær påstand
2. THE MEAT (3-4 korte avsnitt) → Hovedpoeng med data/innsikt
3. THE TWIST (1-2 setninger) → Averdi's unike perspektiv
4. THE ENGAGEMENT (1 setning) → Spørsmål til publikum

ARTIKKEL INFO:
Tittel: ${title}
Sammendrag: ${excerpt}
Innhold (første 500 tegn): ${contentPreview}

EKSEMPEL PÅ GOD LINKEDIN-POST:
"Er du klar over at din ansatt i Alta tjener mer enn din ansatt i Oslo – for samme lønn?

Med 2026-forslaget om 60 000 kr i nedskrivning og 45 000 kr i Finnmarksfradrag, er en lønn på 600k i nord verdt 750k i sør.

Det handler ikke om geografi. Det handler om regnekraft. 💡

Vi har dykket ned i tallene. Resultatet? Nordnorske bedrifter har en skjult konkurransefordel som få utnytter fullt ut.

Hvordan bruker din bedrift Nord-Norge-fordelen?"

Generer nå en LinkedIn-post basert på artikkelen. Maks 1300 tegn. Skriv på norsk.
`.trim();
}

/**
 * Build Facebook prompt following voice architecture rules
 */
function buildFacebookPrompt(params: {
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
}): string {
  const { title, excerpt, content } = params;
  
  const plainContent = stripHtml(content);
  const contentPreview = plainContent.substring(0, 500);
  
  return `
Du er en ekspert på å skrive Facebook-innlegg for Averdi AS, et regnskapsselskap i Nord-Norge.

AVERDI'S VOICE ARCHITECTURE - TANGEN MODE (Facebook):
- Mer uformell og personlig enn LinkedIn
- Start med et spørsmål eller relaterbar situasjon
- Kortere avsnitt, lettere å lese på mobil
- Vis menneskene bak selskapet
- Bruk emojis mer generøst: 💡, 📊, 🎯, ✨, 🔥
- Avslutt med oppfordring til handling eller spørsmål

STRUKTUR:
1. HOOK (1-2 setninger) → Relaterbar situasjon eller spørsmål
2. VERDI (2-3 korte avsnitt) → Hva artikkelen handler om
3. CALL TO ACTION → Les mer / Kontakt oss / Spørsmål

ARTIKKEL INFO:
Tittel: ${title}
Sammendrag: ${excerpt}
Innhold (første 500 tegn): ${contentPreview}

EKSEMPEL PÅ GOD FACEBOOK-POST:
"Visste du at du kan spare 14,1% på hver lønnskrone i Finnmark? 💡

Vi har skrevet en ny artikkel om hvordan nordnorske bedrifter kan bruke tiltakssonen til sin fordel.

Kort fortalt: Med 0% arbeidsgiveravgift har du plutselig et innovasjonsfond på 14,1% av lønnsbudsjettet. Det er reelle penger som kan brukes på vekst. 📊

Les hele artikkelen på averdi.no (link i kommentarfeltet) 👇

Har du spørsmål om hvordan dette gjelder din bedrift? Send oss en melding! ✨"

Generer nå en Facebook-post basert på artikkelen. Maks 1000 tegn. Skriv på norsk.
`.trim();
}

/**
 * Call AI service to generate content
 * 
 * This is a placeholder for the actual AI API call.
 * In production, this would call OpenAI, Anthropic Claude, or similar.
 */
async function callAIService(
  prompt: string,
  platform: 'linkedin' | 'facebook'
): Promise<string> {
  // Check if AI API key is configured
  const apiKey = process.env.OPENAI_API_KEY || process.env.ANTHROPIC_API_KEY;
  
  if (!apiKey) {
    // Fallback to template-based generation if no AI API is configured
    console.warn('No AI API key configured. Using template-based generation.');
    return generateTemplateBasedPost(prompt, platform);
  }
  
  try {
    // Example using OpenAI API
    // In production, you would implement the actual API call here
    
    // For now, return a template-based post
    return generateTemplateBasedPost(prompt, platform);
    
    // TODO: Implement actual AI API call
    // const response = await fetch('https://api.openai.com/v1/chat/completions', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${apiKey}`,
    //   },
    //   body: JSON.stringify({
    //     model: 'gpt-4',
    //     messages: [
    //       { role: 'system', content: 'You are a social media expert for Averdi AS.' },
    //       { role: 'user', content: prompt }
    //     ],
    //     max_tokens: 500,
    //     temperature: 0.7,
    //   }),
    // });
    // 
    // const data = await response.json();
    // return data.choices[0].message.content;
    
  } catch (error) {
    console.error('AI service error:', error);
    return generateTemplateBasedPost(prompt, platform);
  }
}

/**
 * Generate template-based post as fallback
 * 
 * This is used when AI API is not available or fails.
 * It creates a basic post structure that can be manually edited.
 */
function generateTemplateBasedPost(
  prompt: string,
  platform: 'linkedin' | 'facebook'
): string {
  // Extract title and excerpt from prompt
  const titleMatch = prompt.match(/Tittel: (.+)/);
  const excerptMatch = prompt.match(/Sammendrag: (.+)/);
  
  const title = titleMatch ? titleMatch[1] : 'Ny artikkel';
  const excerpt = excerptMatch ? excerptMatch[1] : '';
  
  if (platform === 'linkedin') {
    return `Visste du at ${title.toLowerCase()}? 💡

${excerpt}

Vi har dykket ned i dette temaet og funnet innsikter som kan hjelpe din bedrift.

Les hele artikkelen på averdi.no for å lære mer.

Hva er dine erfaringer med dette? Del gjerne i kommentarfeltet! 👇`;
  } else {
    return `${title} 📊

${excerpt}

Les hele artikkelen på averdi.no (link i kommentarfeltet) 👇

Har du spørsmål? Send oss en melding! ✨`;
  }
}

/**
 * Generate hashtags based on tags and category
 */
function generateHashtags(
  tags: string[],
  category: string,
  platform: 'linkedin' | 'facebook'
): string[] {
  const hashtags: string[] = [];
  
  // Add category-based hashtag
  const categoryHashtags: Record<string, string[]> = {
    bedrift: ['#Bedrift', '#Regnskap', '#NordNorge'],
    sametinget: ['#Sametinget', '#Samisk', '#Tilskudd'],
    organisasjoner: ['#Organisasjoner', '#Frivillig', '#Regnskap'],
    analyse: ['#Analyse', '#Økonomi', '#Innsikt'],
    regelverk: ['#Regelverk', '#Skatt', '#Regnskap'],
  };
  
  if (categoryHashtags[category]) {
    hashtags.push(...categoryHashtags[category]);
  }
  
  // Add tag-based hashtags (max 3)
  const tagHashtags = tags
    .slice(0, 3)
    .map(tag => `#${tag.charAt(0).toUpperCase() + tag.slice(1)}`);
  
  hashtags.push(...tagHashtags);
  
  // Add Averdi brand hashtag
  hashtags.push('#Averdi');
  
  // LinkedIn typically uses fewer hashtags (3-5)
  // Facebook can use more (5-10)
  const maxHashtags = platform === 'linkedin' ? 5 : 8;
  
  return [...new Set(hashtags)].slice(0, maxHashtags);
}

/**
 * Strip HTML tags from content
 */
function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Validate generated post
 */
export function validatePost(post: SocialMediaPost): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  
  // Check character limits
  if (post.platform === 'linkedin' && post.characterCount > 3000) {
    errors.push('LinkedIn post exceeds 3000 character limit');
  }
  
  if (post.platform === 'facebook' && post.characterCount > 63206) {
    errors.push('Facebook post exceeds character limit');
  }
  
  // Check for minimum content
  if (post.characterCount < 50) {
    errors.push('Post is too short (minimum 50 characters)');
  }
  
  // Check for hashtags
  if (post.hashtags.length === 0) {
    errors.push('Post should include at least one hashtag');
  }
  
  return {
    valid: errors.length === 0,
    errors,
  };
}
