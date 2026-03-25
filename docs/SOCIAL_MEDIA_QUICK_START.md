# Social Media Automation - Quick Start Guide

## 🚀 What This Does

Automatically generates LinkedIn and Facebook posts from your published articles, following Averdi's voice architecture (TANGEN mode).

---

## ✅ Setup (5 minutes)

### Option 1: Use Without AI (Template-Based)

**No setup required!** The system works out of the box with template-based generation.

### Option 2: Enable AI Generation (Recommended)

1. **Get an API key** from one of these providers:
   - [OpenAI](https://platform.openai.com/api-keys) (GPT-4)
   - [Anthropic](https://console.anthropic.com/) (Claude)

2. **Add to `.env` file:**
   ```bash
   # For OpenAI
   OPENAI_API_KEY=sk-...
   
   # OR for Anthropic (cheaper)
   ANTHROPIC_API_KEY=sk-ant-...
   ```

3. **Restart your dev server:**
   ```bash
   npm run dev
   ```

---

## 📝 How to Use

### Step 1: Publish an Article
1. Go to `/admin/articles`
2. Create or edit an article
3. Set status to **"Published"**
4. Click "Oppdater artikkel"

### Step 2: Generate Posts
1. Scroll down to **"Sosiale medier-innlegg"** section
2. Click **"Generer innlegg"** button
3. Wait 2-5 seconds

### Step 3: Copy & Publish
1. Review the generated LinkedIn and Facebook posts
2. Click **"Kopier"** button
3. Paste into LinkedIn/Facebook
4. Publish!

---

## 🎯 What You Get

### LinkedIn Post (TANGEN Mode)
```
✅ Engaging question or contrarian statement
✅ 3-4 short paragraphs with data/insights
✅ Averdi's unique perspective
✅ Question to engage audience
✅ 3-5 relevant hashtags
✅ ~1,300 characters
```

### Facebook Post (TANGEN Mode - Casual)
```
✅ Relatable hook
✅ 2-3 short paragraphs
✅ Call to action
✅ 5-8 hashtags
✅ ~1,000 characters
✅ More emojis, mobile-friendly
```

---

## 🔧 Troubleshooting

### "Publiser artikkelen først..."
**Solution:** Change article status to "Published" and save.

### Posts are too generic
**Solution:** Add an AI API key (see Setup above).

### "Kunne ikke generere innlegg"
**Solution:** 
1. Check your API key is correct
2. Check your internet connection
3. Try clicking "Generer på nytt"

---

## 💡 Pro Tips

1. **Regenerate if needed** - Click "Generer på nytt" for new variations
2. **Edit before posting** - Copy to a text editor, adjust, then post
3. **Track performance** - Note which posts get most engagement
4. **Timing matters** - Post during business hours (9-17 CET)

---

## 📊 Voice Architecture

Posts follow Averdi's **TANGEN mode**:

| Element | LinkedIn | Facebook |
|---------|----------|----------|
| **Tone** | Professional, energetic | Casual, friendly |
| **Length** | 1,200-1,500 chars | 800-1,200 chars |
| **Emojis** | Sparingly (💡, ✅, 📊) | Generously (💡, 📊, 🎯, ✨) |
| **Hashtags** | 3-5 focused | 5-8 broader |
| **Structure** | HOOK → MEAT → TWIST → ENGAGE | HOOK → VALUE → CTA |

---

## 🎓 Examples

### LinkedIn Example
```
Er du klar over at din ansatt i Alta tjener mer enn din ansatt i Oslo – for samme lønn?

Med 2026-forslaget om 60 000 kr i nedskrivning og 45 000 kr i Finnmarksfradrag, 
er en lønn på 600k i nord verdt 750k i sør.

Det handler ikke om geografi. Det handler om regnekraft. 💡

Vi har dykket ned i tallene. Resultatet? Nordnorske bedrifter har en skjult 
konkurransefordel som få utnytter fullt ut.

Hvordan bruker din bedrift Nord-Norge-fordelen?

#Bedrift #NordNorge #Regnskap #Averdi
```

### Facebook Example
```
Visste du at du kan spare 14,1% på hver lønnskrone i Finnmark? 💡

Vi har skrevet en ny artikkel om hvordan nordnorske bedrifter kan bruke 
tiltakssonen til sin fordel.

Kort fortalt: Med 0% arbeidsgiveravgift har du plutselig et innovasjonsfond 
på 14,1% av lønnsbudsjettet. Det er reelle penger som kan brukes på vekst. 📊

Les hele artikkelen på averdi.no (link i kommentarfeltet) 👇

Har du spørsmål om hvordan dette gjelder din bedrift? Send oss en melding! ✨

#Bedrift #NordNorge #Regnskap #Finnmark #Tiltakssonen #Averdi
```

---

## 📚 Full Documentation

For detailed technical documentation, see:
- [SOCIAL_MEDIA_AUTOMATION.md](./SOCIAL_MEDIA_AUTOMATION.md)

---

## 🆘 Need Help?

- **Technical issues:** Check the full documentation
- **Voice/content questions:** Review `.kilocode/rules/Voice_rules.md`
- **Support:** support@averdi.no

---

**Happy posting! 🚀**
