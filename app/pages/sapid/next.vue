<script setup lang="ts">
definePageMeta({
  title: 'Sapid - Next Generation'
})

useSeoMeta({
  title: 'Stop Typing, Start Cooking: The Next Generation of Sapid',
  description: 'Meet the new Sapid AI Sous-Chef. A true kitchen companion that can see your progress, hear your questions, and cook alongside you in real-time.',
})
</script>

<template>
  <div class="blog-page">
    <div class="container content-container">
      <header class="tech-header">
        <p class="brand-link"><NuxtLink to="/sapid">Sapid</NuxtLink>: Product Announcement</p>
        <h1 class="main-title">Stop Typing, Start Cooking: The Next Generation of Sapid</h1>
        <div class="availability-badge">Available March 16th</div>
      </header>

      <div class="prose">
        <p class="lead">
          Cooking is inherently a hands-on experience. Your hands are covered in flour, you're stirring a simmering sauce, and you carefully watch a steak sear to perfection.
        </p>
        <p>
          So why do recipe apps still expect you to swipe, tap, and type on a fragile glass screen with messy hands?
        </p>
        <p>
          At Sapid, we believe technology should get out of the way when you step into the kitchen. That's why we're moving beyond the text box. The future isn't about <em>reading</em> a recipe—it's about an immersive, real-time experience.
        </p>
        <p>
          To celebrate the power of multimodal AI, we are thrilled to announce we're building the next generation of Sapid for the <strong>#GeminiLiveAgentChallenge</strong>. We are introducing a true <strong>AI Sous-Chef</strong> that can see, hear, and proactively guide your cooking journey—all built natively into your phone.
        </p>

        <section id="meet-sous-chef">
          <h2>Meet Your New AI Sous-Chef 👨‍🍳</h2>
          <p>We are upgrading Sapid from a smart recipe organizer into a real-time kitchen companion. We aren't just adding a chatbot; we're giving you a cooking partner.</p>
          <p>Here is what it feels like to cook with the new Sapid:</p>

          <h3>1. A Conversation, Not a Command 🗣️</h3>
          <p>Imagine you are making an intricate Risotto. Your hands are busy stirring continuously. With our new <em>Live Assistant Mode</em>, you don't need to look at your phone to know what's next.</p>
          
          <div class="dialogue-box">
            <p><strong>You:</strong> "Sapid, parameter check. What's the next step?"</p>
            <p><strong>Sapid:</strong> "Keep stirring until the liquid is mostly absorbed. Then, we need to add the next ladle of warm broth."</p>
            <p><strong>You:</strong> "Wait, I just realized I only have chicken broth, not vegetable. Is that okay?"</p>
            <p><strong>Sapid:</strong> "Absolutely fine! It will give it a richer flavor. Since it's chicken broth, you might not need as much salt at the end. I'll remind you to taste test it before serving."</p>
          </div>

          <p>Because it's powered by Google’s <strong>Gemini Live</strong>, the conversation is natural. You can interrupt it, change your mind, and ask follow-up questions without ever pressing a button.</p>
        </section>

        <section id="second-set-of-eyes">
          <h3>2. A Second Set of Eyes 🙈</h3>
          <p>Cooking is visual. How do you know if the onions are perfectly translucent or if the chicken is fully cooked?</p>
          <p>With our new <strong>Multimodal Camera Mode</strong>, Sapid becomes your second set of eyes. By leaning your phone against the backsplash, the camera securely watches your cutting board or stove.</p>
          
          <div class="dialogue-box">
            <p><strong>You:</strong> "Does this crust look brown enough?"</p>
            <p><strong>Sapid (looking at your pan):</strong> "Not quite! Give it another two minutes. You want a much deeper, golden-brown crust for maximum flavor."</p>
          </div>
        </section>

        <section id="assistant-that-assists">
          <h3>3. An Assistant That Actually <em>Assists</em> 🧠</h3>
          <p>Voice bots only speak when spoken to. An <em>agent</em> understands the context of your kitchen.</p>
          <p>Because Sapid is deeply integrated with your phone (using Android App Functions and iOS App Intents), the assistant knows exactly where you are in the recipe and your active timers.</p>
          <p>It doesn't just wait for you; it anticipates your needs.</p>

          <div class="dialogue-box">
            <p><em>You are chopping vegetables while the oven pre-heats.</em></p>
            <p><strong>Sapid (unprompted):</strong> "Hey, I see you're still chopping the bell peppers. Just a heads up, your oven timer just finished pre-heating, and the chicken needs to go in soon to stay on schedule!"</p>
          </div>
        </section>

        <section id="culinary-knowledge">
          <h3>4. The World's Culinary Knowledge at Your Voice 🌍</h3>
          <p>A great Sous-Chef knows the recipe, but an exceptional one knows the science of food.</p>
          <p>If you ask a complex question—like substituting a rare ingredient or the science behind a technique—Sapid leverages <strong>Google Search Grounding</strong>. It temporarily pauses to search the web, instantly bringing back authoritative culinary knowledge directly to your kitchen.</p>

          <div class="dialogue-box">
            <p><strong>You:</strong> "Sapid, I don't have buttermilk for these pancakes. What can I do?"</p>
            <p><strong>Sapid:</strong> "No problem. I just checked the web. You can make a quick substitute: add exactly one tablespoon of white vinegar or lemon juice to a cup of regular milk, and let it sit for 5 minutes. Shall we start a 5-minute timer?"</p>
          </div>
        </section>

        <section id="beyond-cutting-board">
          <h3>5. Beyond the Cutting Board 🛒</h3>
          <p>Our AI Sous-Chef isn't just for cooking; it's your personal kitchen manager. Because Sapid integrates deeply with your app state, the Live Assistant can help you plan your week and manage your groceries without lifting a finger.</p>

          <div class="dialogue-box">
            <p><strong>You (opening your empty fridge):</strong> "Sapid, look at what I have. What can I make for dinner tonight?"</p>
            <p><strong>Sapid (using the camera):</strong> "I see some wilted spinach, chicken breasts, and half a jar of sun-dried tomatoes. How about a creamy Tuscan chicken? I can add the missing heavy cream to your shopping list right now."</p>
            <p><strong>You:</strong> "That sounds perfect. Add it to my meal planner for tonight and put the cream on my list."</p>
          </div>
          
          <p>Whether you're brainstorming meals for the week, importing a recipe from a social media video in real-time, or checking what you need from the store while tying your shoes, the Live Assistant is always just a voice command away.</p>
        </section>

        <section id="built-in-open">
          <h2>Built Natively. Built in the Open. 🔓</h2>
          <p>The best part? This isn't a separate app. The Live Assistant lives right inside the Sapid app. When you open a recipe's drawer, the new Voice Assistant button is right there. Long-press it, and the camera mode activates. It's fluid, native, and accompanied by beautiful waveform animations that react to your voice.</p>
          <p>And for the developer community: as part of this hackathon challenge, the core infrastructure behind the AI Sous-Chef will be <strong>Open Source</strong>. We're releasing the backend and the React Native frontend components so any developer can learn from and build upon our work to create their own incredible, hands-free voice experiences.</p>
          <p>Get ready to put your phone on the counter, wash your hands, and never touch a messy screen again.</p>
          <p>Stay tuned for the live demo video, and follow our journey using <code>#GeminiLiveAgentChallenge</code>!</p>
        </section>
      </div>

      <div class="footer-actions">
         <NuxtLink to="/sapid" class="btn btn-primary btn-xl">Back to Sapid</NuxtLink>
         <NuxtLink to="/sapid/technical" class="btn btn-outline btn-xl">Read the Tech Docs</NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.blog-page {
  background-color: var(--color-background-light);
  color: var(--color-neutral-900);
  min-height: 100vh;
  padding: 6rem 0;
  font-family: var(--font-sans);
}

.content-container {
  max-width: 900px;
}

.tech-header {
  margin-bottom: 4rem;
}

.brand-link {
    font-weight: 600;
    color: var(--color-primary-600);
    margin-bottom: 1rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-size: 0.875rem;
}

.brand-link a {
    text-decoration: underline;
    text-decoration-color: rgba(59, 128, 72, 0.3);
    text-underline-offset: 4px;
}

.brand-link a:hover {
    text-decoration-color: var(--color-primary-600);
}

.main-title {
  font-family: var(--font-display);
  font-size: 3rem;
  font-weight: 700;
  color: var(--color-neutral-900);
  line-height: 1.1;
  margin-bottom: 1.5rem;
}

.availability-badge {
    display: inline-block;
    background-color: var(--color-primary-600);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 2rem;
    font-weight: 600;
    font-size: 0.9rem;
    letter-spacing: 0.05em;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.lead {
    font-size: 1.25rem;
    font-weight: 500;
    color: var(--color-neutral-800);
    margin-bottom: 2rem;
}

.prose {
    font-size: 1.0625rem;
    line-height: 1.7;
    color: var(--color-neutral-700);
}

.prose p {
    margin-bottom: 1.5rem;
}

.prose h2 {
    font-family: var(--font-display);
    font-size: 2rem;
    font-weight: 700;
    color: var(--color-neutral-900);
    margin-top: 3.5rem;
    margin-bottom: 1.5rem;
    border-bottom: 2px solid var(--color-primary-600);
    padding-bottom: 0.5rem;
}

.prose h3 {
    font-family: var(--font-display);
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--color-neutral-900);
    margin-top: 2.5rem;
    margin-bottom: 1rem;
}

.prose strong {
    color: var(--color-neutral-900);
    font-weight: 600;
}

.prose em {
    color: var(--color-primary-700);
    font-style: italic;
}

.dialogue-box {
    background-color: var(--color-white);
    border-left: 4px solid var(--color-primary-600);
    padding: 1.5rem;
    margin: 2rem 0;
    border-radius: 0 0.5rem 0.5rem 0;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
}

.dialogue-box p {
    margin-bottom: 0.75rem;
}

.dialogue-box p:last-child {
    margin-bottom: 0;
}

.footer-actions {
    margin-top: 5rem;
    display: flex;
    gap: 1rem;
    justify-content: center;
    border-top: 1px solid rgba(0,0,0,0.1);
    padding-top: 3rem;
    flex-wrap: wrap;
}

/* Responsive */
@media (max-width: 768px) {
    .main-title {
        font-size: 2.5rem;
    }
    .prose h2 {
        font-size: 1.75rem;
    }
}
</style>
