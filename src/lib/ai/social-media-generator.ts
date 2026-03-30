/**
 * Social Media Post Generator
 * 
 * Generates LinkedIn and Facebook posts from article content
 * following NorgeTravel's voice architecture rules.
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
 * NorgeTravel's voice architecture:
 * - LinkedIn: THE GRIT mode (reality-first, specific, anti-brochure)
 * - Facebook: THE HEARTH mode with more sensory, people-first tone
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
You are an expert at writing LinkedIn posts for NorgeTravel.com, an independent travel guide for Arctic Norway.

NORGETRAVEL VOICE ARCHITECTURE - THE GRIT MODE (LinkedIn):
- Open with an expectation vs. reality hook — correct a common misconception
- 3-4 short paragraphs, max 15-20 words per sentence
- Use active verbs: demands, rewards, clears, crosses, plunges
- Back every claim with a number, date, or named operator
- No hedging: "generally", "may vary" — cut these
- End with a specific, actionable question or next step
- Use emojis sparingly: ⛰️, 🧭, 🌌 — one maximum

STRUCTURE:
1. THE HOOK (1-2 sentences) → Reality check — what the Instagram grid doesn't show
2. THE FACTS (3-4 short paragraphs) → Specific data: distances, grades, costs, operators
3. THE NORGETRAVEL ANGLE (1-2 sentences) → The honest local guide perspective
4. THE ENGAGEMENT (1 sentence) → Specific question to the audience

ARTIKKEL INFO:
Tittel: ${title}
Sammendrag: ${excerpt}
Innhold (første 500 tegn): ${contentPreview}

EXAMPLE OF A GOOD LINKEDIN POST:
"Trolltunga is not a beautiful hike for everyone.

It is a grueling 12-hour trek with 800 meters of elevation gain. In July, expect sideways rain. The DNT grade is Red — that means scrambling over wet rock, no shelter if the weather turns.

Most tourists show up with trainers and a phone. The ferry at Odda sells out weeks in advance.

We mapped the real route, the real timing, and the real gear list. Link in the first comment. ⛰️

What's the most underestimated hike you've done in Norway?"

Generate a LinkedIn post based on the article. Max 1300 characters. Write in English.
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
You are an expert at writing Facebook posts for NorgeTravel.com, an independent travel guide for Arctic Norway.

NORGETRAVEL VOICE ARCHITECTURE - THE HEARTH MODE (Facebook):
- More personal and sensory than LinkedIn
- Lead with smell, sound, or texture — not just visuals
- Short paragraphs, easy to read on mobile
- Put the people making the experience at the centre
- One emoji maximum — functional only 🥾 🧭
- End with a specific action or question

STRUCTURE:
1. HOOK (1-2 sentences) → Sensory scene or reality check
2. THE STORY (2-3 short paragraphs) → What the article covers, who it's about
3. CALL TO ACTION → Read the guide / Plan the trip / Share your experience

ARTIKKEL INFO:
Tittel: ${title}
Sammendrag: ${excerpt}
Innhold (første 500 tegn): ${contentPreview}

EXAMPLE OF A GOOD FACEBOOK POST:
"The room smells of salted cod and birch woodsmoke. The nets on the wall were in use last winter.

This is the Lofoten the cruise ships don't show you. January to April, the skrei season turns Henningsvær into a working production facility. Ask the harbour master about the catch. You'll learn more than any museum exhibit can teach you.

We mapped the ferry from Bodø, the best rorbu to book, and the one café that the fishermen actually use. Link in the guide. 🥾

Have you visited Lofoten in winter? What did you find?"

Generate a Facebook post based on the article. Max 1000 characters. Write in English.
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

Read the full guide at norgetravel.com.

Hva er dine erfaringer med dette? Del gjerne i kommentarfeltet! 👇`;
  } else {
    return `${title} 📊

${excerpt}

Read the full guide at norgetravel.com (link in comments) 🧭

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
