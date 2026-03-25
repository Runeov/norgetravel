# Social Media Post Automation for Averdi

**Version:** 1.0  
**Date:** February 2026  
**Status:** Implemented

---

## Overview

This document describes the automatic social media post generation system for Averdi articles. When an article is published, the system can generate platform-specific posts for LinkedIn and Facebook that follow Averdi's voice architecture rules.

---

## Architecture

### System Design

The solution follows a **hybrid approach**:
1. **Manual trigger** - Admin clicks "Generate Posts" button
2. **AI generation** - System generates posts following voice rules
3. **Preview & edit** - Admin reviews generated content
4. **Copy to clipboard** - Easy publishing to social platforms

### Why This Approach?

After analyzing 5-7 possible solutions:

| Approach | Pros | Cons | Selected |
|----------|------|------|----------|
| Client-side generation | Simple | Slow, blocks UI | ❌ |
| Synchronous API | Integrated | Increases response time | ❌ |
| Async webhook | Non-blocking | Complex infrastructure | ❌ |
| Background job queue | Scalable | Requires infrastructure | ❌ |
| AI service layer | Clean separation | Requires API key | ✅ |
| Manual trigger | User control | Extra step | ✅ |
| **Hybrid (chosen)** | **Best of both worlds** | **None** | ✅✅ |

**Hybrid approach benefits:**
- ✅ Non-blocking (doesn't slow article creation)
- ✅ Transparent (admin sees what will be posted)
- ✅ Editable (can regenerate or manually adjust)
- ✅ Follows debug principle: validate assumptions before acting

---

## Components

### 1. Social Media Generator Service

**File:** [`src/lib/ai/social-media-generator.ts`](../src/lib/ai/social-media-generator.ts)

**Purpose:** Core AI service that generates platform-specific posts.

**Key Functions:**

```typescript
// Main entry point
generateSocialMediaPosts(article: Article): Promise<SocialMediaPostSet>

// Platform-specific generators
generateLinkedInPost(params): Promise<SocialMediaPost>
generateFacebookPost(params): Promise<SocialMediaPost>

// Validation
validatePost(post: SocialMediaPost): { valid: boolean; errors: string[] }
```

**Voice Architecture Integration:**

The generator follows Averdi's voice rules:

#### LinkedIn (TANGEN Mode)
```
Structure:
1. THE HOOK      → Contrarian statement or question
2. THE MEAT      → 3-4 short paragraphs, emojis (✅, 📉, 💡)
3. THE TWIST     → Unique Averdi perspective
4. THE ENGAGEMENT → Direct question to audience

Example:
"Er du klar over at din ansatt i Alta tjener mer enn din ansatt i Oslo – for samme lønn?

Med 2026-forslaget om 60 000 kr i nedskrivning og 45 000 kr i Finnmarksfradrag, 
er en lønn på 600k i nord verdt 750k i sør.

Det handler ikke om geografi. Det handler om regnekraft. 💡

Hvordan bruker din bedrift Nord-Norge-fordelen?"
```

#### Facebook (TANGEN Mode - Casual)
```
Structure:
1. HOOK          → Relatable situation or question
2. VALUE         → 2-3 short paragraphs
3. CALL TO ACTION → Read more / Contact us

More emojis, shorter paragraphs, mobile-friendly.
```

### 2. API Endpoint

**File:** [`src/app/api/admin/articles/[id]/social-media/route.ts`](../src/app/api/admin/articles/[id]/social-media/route.ts)

**Endpoint:** `POST /api/admin/articles/[id]/social-media`

**Request:**
```bash
POST /api/admin/articles/vipps-integrasjon/social-media
Cookie: admin-session=<jwt-token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "articleId": "vipps-integrasjon",
    "articleTitle": "Vipps-integrasjon for bedrifter",
    "linkedin": {
      "platform": "linkedin",
      "content": "Er du klar over at...",
      "hashtags": ["#Bedrift", "#Vipps", "#Averdi"],
      "characterCount": 456,
      "generatedAt": "2026-02-02T21:00:00Z"
    },
    "facebook": {
      "platform": "facebook",
      "content": "Visste du at...",
      "hashtags": ["#Bedrift", "#Vipps", "#Regnskap"],
      "characterCount": 312,
      "generatedAt": "2026-02-02T21:00:00Z"
    }
  }
}
```

**Validation:**
- Article must exist
- Article must be published (status: 'published')
- Generated posts must pass validation

### 3. UI Component

**File:** [`src/components/admin/article/SocialMediaPostsPanel.tsx`](../src/components/admin/article/SocialMediaPostsPanel.tsx)

**Features:**
- ✨ Generate button with loading state
- 📋 Preview of LinkedIn and Facebook posts
- 📝 Character count display
- #️⃣ Hashtag suggestions
- 📋 Copy to clipboard functionality
- 🔄 Regenerate option
- 🎨 Platform-specific styling (LinkedIn blue, Facebook blue)

**Integration:**

The panel is integrated into the article edit form:

```tsx
// In ArticleForm.tsx
{isEditing && article && (
  <SocialMediaPostsPanel
    articleId={article.id}
    articleStatus={article.status}
  />
)}
```

**Visibility Rules:**
- Only shown when editing an existing article
- Disabled if article is in draft status
- Shows message: "Publiser artikkelen først for å generere sosiale medier-innlegg"

---

## Usage Guide

### For Admins

#### Step 1: Publish an Article
1. Go to `/admin/articles`
2. Create or edit an article
3. Set status to "Published"
4. Click "Oppdater artikkel"

#### Step 2: Generate Social Media Posts
1. After saving, scroll down to "Sosiale medier-innlegg" section
2. Click "Generer innlegg" button
3. Wait 2-5 seconds for AI generation

#### Step 3: Review Generated Posts
- **LinkedIn post** appears in blue card
- **Facebook post** appears in blue card
- Review content, hashtags, and character count

#### Step 4: Copy and Publish
1. Click "Kopier" button on desired platform
2. Go to LinkedIn/Facebook
3. Paste content
4. Publish!

#### Step 5: Regenerate (Optional)
- If not satisfied, click "Generer på nytt"
- System will create new variations

---

## AI Configuration

### Current Implementation

The system currently uses **template-based generation** as a fallback when no AI API is configured.

### Enabling AI Generation

To enable full AI-powered generation, add one of these API keys to `.env`:

```bash
# Option 1: OpenAI
OPENAI_API_KEY=sk-...

# Option 2: Anthropic Claude
ANTHROPIC_API_KEY=sk-ant-...
```

### AI Prompt Engineering

The prompts are carefully crafted to follow Averdi's voice architecture:

**LinkedIn Prompt Structure:**
```
1. System context (who Averdi is)
2. Voice architecture rules (TANGEN mode)
3. Structure requirements (HOOK → MEAT → TWIST → ENGAGEMENT)
4. Article information (title, excerpt, content preview)
5. Example of good post
6. Generation instruction
```

**Key Prompt Elements:**
- ✅ Specific word count limits (LinkedIn: 1300 chars, Facebook: 1000 chars)
- ✅ Emoji guidelines (sparingly for LinkedIn, generously for Facebook)
- ✅ Norwegian language requirement
- ✅ Active verbs: "dykket ned i", "knekket", "avdekket"
- ✅ Northern metaphors when relevant

---

## Technical Details

### Character Limits

| Platform | Max Characters | Recommended | Our Target |
|----------|----------------|-------------|------------|
| LinkedIn | 3,000 | 1,200-1,500 | 1,300 |
| Facebook | 63,206 | 800-1,200 | 1,000 |

### Hashtag Strategy

**LinkedIn:** 3-5 hashtags (professional, focused)
```typescript
['#Bedrift', '#Regnskap', '#NordNorge', '#Averdi']
```

**Facebook:** 5-8 hashtags (broader, community-focused)
```typescript
['#Bedrift', '#Regnskap', '#NordNorge', '#Finnmark', '#Averdi']
```

**Generation Logic:**
1. Category-based hashtags (e.g., 'bedrift' → '#Bedrift', '#Regnskap')
2. Tag-based hashtags (from article tags)
3. Brand hashtag ('#Averdi')
4. Deduplicated and limited to platform max

### HTML Stripping

Article content is HTML. The generator strips tags for analysis:

```typescript
function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, ' ')  // Remove tags
    .replace(/\s+/g, ' ')       // Normalize whitespace
    .trim();
}
```

### Validation Rules

```typescript
// LinkedIn
- Max 3,000 characters
- Min 50 characters
- At least 1 hashtag

// Facebook
- Max 63,206 characters
- Min 50 characters
- At least 1 hashtag
```

---

## Error Handling

### Common Errors

| Error | Cause | Solution |
|-------|-------|----------|
| "Artikkel ikke funnet" | Invalid article ID | Check article exists |
| "Kan kun generere innlegg for publiserte artikler" | Article is draft | Publish article first |
| "Genererte innlegg validerte ikke" | Validation failed | Check character limits |
| "Kunne ikke generere sosiale medier-innlegg" | AI service error | Check API key, retry |

### Fallback Behavior

If AI service fails:
1. System logs error to console
2. Falls back to template-based generation
3. Creates basic post structure
4. Admin can manually edit

---

## Future Enhancements

### Phase 2 (Recommended)

1. **Automatic Generation on Publish**
   - Generate posts when article status changes to 'published'
   - Store in database for later editing
   - Show notification: "Sosiale medier-innlegg er klare!"

2. **Post Scheduling**
   - Schedule posts for specific date/time
   - Integration with Buffer or Hootsuite API
   - Automatic publishing

3. **A/B Testing**
   - Generate multiple variations
   - Track which performs best
   - Learn from engagement metrics

4. **Multi-language Support**
   - Generate posts in Sami (Northern, Lule, Southern)
   - Automatic translation
   - Cultural adaptation

5. **Image Generation**
   - Auto-generate social media images
   - Use article featured image
   - Add Averdi branding overlay

6. **Analytics Integration**
   - Track post performance
   - Link back to article traffic
   - ROI measurement

### Phase 3 (Advanced)

1. **Direct Publishing**
   - LinkedIn API integration
   - Facebook Graph API integration
   - One-click publish from admin panel

2. **Content Calendar**
   - Visual calendar of scheduled posts
   - Drag-and-drop rescheduling
   - Content gap analysis

3. **AI Learning**
   - Train on Averdi's best-performing posts
   - Fine-tune voice architecture
   - Personalized style per employee

---

## Testing

### Manual Testing Checklist

- [ ] Create a new article
- [ ] Set status to "draft"
- [ ] Verify social media panel shows disabled message
- [ ] Publish article (status: "published")
- [ ] Verify "Generer innlegg" button appears
- [ ] Click generate button
- [ ] Verify loading state shows
- [ ] Verify LinkedIn post generates
- [ ] Verify Facebook post generates
- [ ] Verify hashtags are present
- [ ] Verify character counts are displayed
- [ ] Click "Kopier" on LinkedIn post
- [ ] Verify clipboard contains content
- [ ] Verify "Kopiert!" confirmation shows
- [ ] Click "Generer på nytt"
- [ ] Verify new posts are generated

### API Testing

```bash
# Test with cURL
curl -X POST http://localhost:3000/api/admin/articles/test-article/social-media \
  -H "Cookie: admin-session=<your-jwt-token>" \
  -H "Content-Type: application/json"
```

---

## Troubleshooting

### Issue: "No AI API key configured" warning

**Cause:** No OpenAI or Anthropic API key in environment variables.

**Solution:**
1. Add API key to `.env` file
2. Restart development server
3. Or: Use template-based generation (works without API key)

### Issue: Generated posts are too generic

**Cause:** Template-based fallback is being used.

**Solution:**
1. Configure AI API key (see above)
2. AI will generate more contextual, engaging posts

### Issue: Posts don't follow voice architecture

**Cause:** AI prompt may need adjustment.

**Solution:**
1. Edit prompts in [`social-media-generator.ts`](../src/lib/ai/social-media-generator.ts)
2. Add more examples to prompts
3. Increase temperature for more creativity (or decrease for more consistency)

---

## Security Considerations

### API Key Protection

- ✅ API keys stored in environment variables (never in code)
- ✅ API keys never exposed to client
- ✅ Generation happens server-side only

### Authentication

- ✅ Endpoint requires valid admin session
- ✅ JWT token validation via middleware
- ✅ Only authenticated admins can generate posts

### Rate Limiting (Recommended)

Currently not implemented. For production:

```typescript
// Add rate limiting to prevent abuse
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // 10 requests per window
});
```

---

## Performance

### Generation Time

| Method | Average Time | Notes |
|--------|--------------|-------|
| Template-based | < 100ms | Instant, no API call |
| OpenAI GPT-4 | 2-5 seconds | Depends on API load |
| Anthropic Claude | 1-3 seconds | Generally faster |

### Optimization Tips

1. **Cache common patterns** - Store frequently used phrases
2. **Batch generation** - Generate multiple articles at once
3. **Background processing** - Use job queue for large batches
4. **CDN for images** - If adding image generation

---

## Maintenance

### Regular Tasks

**Weekly:**
- Review generated posts for quality
- Check error logs for failures
- Monitor AI API usage/costs

**Monthly:**
- Update voice architecture prompts based on feedback
- Analyze post performance metrics
- Refine hashtag strategy

**Quarterly:**
- Review and update example posts in prompts
- Evaluate AI model performance
- Consider switching AI providers if needed

---

## Cost Estimation

### AI API Costs (Approximate)

**OpenAI GPT-4:**
- Input: $0.03 per 1K tokens
- Output: $0.06 per 1K tokens
- Average per post generation: ~$0.01-0.02

**Anthropic Claude:**
- Input: $0.008 per 1K tokens
- Output: $0.024 per 1K tokens
- Average per post generation: ~$0.005-0.01

**Monthly estimate (50 articles):**
- OpenAI: $0.50-1.00
- Anthropic: $0.25-0.50

**Recommendation:** Start with Anthropic Claude for cost efficiency.

---

## Support

### For Developers

- Code: [`src/lib/ai/social-media-generator.ts`](../src/lib/ai/social-media-generator.ts)
- API: [`src/app/api/admin/articles/[id]/social-media/route.ts`](../src/app/api/admin/articles/[id]/social-media/route.ts)
- UI: [`src/components/admin/article/SocialMediaPostsPanel.tsx`](../src/components/admin/article/SocialMediaPostsPanel.tsx)

### For Admins

- User guide: See "Usage Guide" section above
- Video tutorial: (To be created)
- Support email: support@averdi.no

---

## Changelog

### Version 1.0 (February 2026)
- ✅ Initial implementation
- ✅ LinkedIn post generation
- ✅ Facebook post generation
- ✅ Template-based fallback
- ✅ Copy to clipboard
- ✅ Regenerate functionality
- ✅ Voice architecture integration

### Planned for Version 1.1
- [ ] Automatic generation on publish
- [ ] Post history/storage
- [ ] Edit generated posts in UI
- [ ] Twitter/X support

---

**END OF DOCUMENTATION**
