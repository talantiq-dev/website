# Sapid blog playbook

Instructions for writing Sapid blog posts, used by the weekly SEO routine and by people. Topics and their status live in [topics.md](topics.md).

## Why the blog exists

To bring people who search for help with saving recipes, planning meals and grocery shopping to talantiq.com, and to show them two things: the free [recipe extractor](/sapid/recipe-extractor) and the Sapid app. A post succeeds when it fully answers the search and the reader would have been glad to find it even if Sapid did not exist. Thin, generic or padded posts hurt the whole site in Google, so quality beats volume.

## Facts about Sapid (only claim what is listed here)

- Sapid is a meal planning app made by Talentiq Solutions. Available on **Android** (Google Play). iOS: check `app/app.config.ts`; if `appStoreUrl` is empty, say "coming to iPhone soon" or don't mention iOS.
- Languages: English, German, French, Spanish. Imported recipes are translated into the app language.
- **Free**: weekly meal planner (7–14 days), quick meals (e.g. "sandwich") and flexible days (leftovers, takeout, eating out), "shift plan forward" by a day, shopping list for the whole plan grouped by the user's stores with a custom aisle order, extra items (paper towels etc.), pantry tracking, adding your own recipes by hand, cooking mode that keeps the screen on, with timers and voice control for stepping through recipes, household size that scales recipes, sync across devices.
- **Premium**: importing recipes from a link (TikTok, Instagram, YouTube, any recipe website), from a photo (e.g. a cookbook page) or from pasted text; AI meal planner that suggests a week from your saved recipes; nutrition estimates.
- Importing: share a post from TikTok/Instagram/Safari etc. to Sapid, or paste the link. Sapid reads the caption, follows "recipe in bio" or linked blog pages, and if needed uses the video's spoken audio (transcript) to find ingredients and steps. It credits and links the original creator.
- Free web tool: [/sapid/recipe-extractor](/sapid/recipe-extractor) turns a recipe link into an ingredient shopping list in the browser, a few times per day, no sign-up.
- Users can share a meal plan or shopping list as a link that works without the app.
- **Never state or imply**: prices, user numbers, ratings, reviews, awards, "#1", partnerships, features not listed above (including the experimental AI sous-chef / live voice assistant), health or weight-loss outcomes.

## Hard rules

1. **Respect creators.** Never reproduce a recipe someone else published (ingredient list with amounts plus method, or its wording). Don't name a real creator's recipe as an example of something to copy. Link to creators' original posts only when you can verify the exact URL exists; otherwise talk about recipes generically.
2. **No full recipes.** Posts are about planning, saving, organizing, shopping and cooking habits. Meal *ideas* by name ("a tray-bake with whatever vegetables need using up") are fine; ingredient-by-ingredient recipes are not.
3. **No invented facts.** No made-up statistics, studies, surveys, quotes, testimonials or personal stories ("I tried…", "Anna from Berlin says…"). If a number matters, link a reputable primary source you actually opened (e.g. a government food-waste report). If you can't verify it, leave it out.
4. **Describe other apps accurately or not at all.** Instructions for TikTok, Instagram etc. must match how those apps work now; verify with a web search when you can, and keep UI steps general ("tap Share, then Copy link") if you can't. Don't criticize competitors or compare against them by name.
5. **German posts are written for Germans, not translated.** Native, natural German with "du". Target the German keyword from topics.md, use German examples (Rewe, Edeka, Aldi, Lidl, dm, Wochenmarkt, Pfand) and metric units. It can be structured differently from the English post.
6. **One topic per run**, in both languages, in one pull request. Never edit published posts unless a topic says so.

## Format

Files: English `content/blog/<slug>.md`, German `content/blog/de/<slug>.md`. Slugs are lowercase ASCII with hyphens and contain the main keyword (German: `tiktok-rezepte-speichern`, ä → ae, ß → ss).

Frontmatter (all fields required except `image` and `tags`; one `key: value` per line, quote strings containing a colon):

```yaml
---
title: "How to Save TikTok Recipes (and Actually Cook Them)"
description: "Saved dozens of TikTok recipes and cooked none? Here's how to save them properly, find the full recipe and turn it into a shopping list."
date: 2026-10-12
lang: en
keyword: how to save recipes from tiktok
translation: /blog/de/tiktok-rezepte-speichern
tags: [tiktok, recipes, organizing]
---
```

- `title`: 20–70 characters, contains the keyword naturally, no clickbait.
- `description`: 120–160 characters, a reason to click, contains the keyword.
- `date`: the day you write it.
- `translation`: path of the other-language post. Both posts point at each other.

Body:

- No `# ` heading (the page shows the title). Start with 2–3 sentences that directly answer the search, then go deeper.
- `## ` sections, `### ` where useful. Short paragraphs, numbered steps for procedures, a table when comparing options.
- Length: English 900–1600 words, German 800–1500. Say everything useful; cut everything that isn't.
- Insert the recipe extractor box once, where it actually helps (usually right after explaining how to get a recipe out of a video or link). Put these two lines on their own, surrounded by blank lines:

  ```
  ::tool-cta
  ::
  ```

- Mention Sapid where it genuinely solves the step being discussed, typically 2–4 times, never in every section. Be honest about what is Premium.
- External links only to domains listed in `seo/allowed-domains.txt` (platform help pages, official and scientific sources). If a source you need isn't on the list, describe it without a link and mention it in your summary. Plain Markdown only: no HTML.
- Internal links (relative paths): the recipe extractor and/or `/sapid`, plus related posts that already exist in `content/blog/` (same language). At least 2, ideally 3+.
- End with `## FAQ` (German: `## Häufige Fragen`) containing 3–4 questions people actually search for, each as `### Question?` followed by a 2–4 sentence answer.
- The page adds an app download box at the end; don't add your own closing pitch.

## Voice

Friendly, practical and specific, like a friend who cooks a lot and is organized about it. Concrete examples over abstractions. No hype, no filler intros ("In today's busy world…"), no emoji, no exclamation-mark enthusiasm. `scripts/check-blog.mjs` rejects common AI clichés ("delve", "seamless", "game-changer", "in conclusion", …); write so it never has to.

## Process for each run

The weekly workflow (`.github/workflows/weekly-blog-post.yml`) picks the first `todo` topic from `topics.md` and gives the writer its keywords, slugs and date. The writer then:

1. Reads this playbook and the existing posts in `content/blog/` (to link to them and match their style).
2. Researches the keyword on the web: what searchers need, and verification of every app instruction and fact to be stated. Only sources actually opened count.
3. Writes the English and German posts at the given paths, each pointing at the other with `translation`.
4. Runs `node scripts/check-blog.mjs` and fixes every error, and warnings unless there is a good reason.
5. Changes nothing else and doesn't use git.

The workflow then checks that only those two files changed, re-runs the quality check, builds the site, marks the topic `published (date)` in `topics.md`, commits to `main` and deploys. With `AUTO_PUBLISH: "false"` in the workflow it opens a pull request instead (branch `seo/<english-slug>`) and pauses while 3 posts await review.

Writing a post by hand works the same way: follow steps 1–4, then set the topic's status yourself.
