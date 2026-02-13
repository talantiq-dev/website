<script setup lang="ts">
import { onMounted } from 'vue'

definePageMeta({
  title: 'Sapid - Technical Documentation'
})

useSeoMeta({
  title: 'Technical Documentation - Sapid',
  description: 'Technical architecture and implementation details for Sapid, the AI-powered meal planning application.',
})

const initMermaid = () => {
  // Load mermaid script dynamically
  const script = document.createElement('script')
  script.src = 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js'
  script.onload = () => {
    setTimeout(() => {
      if ((window as any).mermaid) {
        (window as any).mermaid.initialize({ 
          startOnLoad: true,
          theme: 'base',
          themeVariables: {
            primaryColor: '#3b8048',
            primaryTextColor: '#fff',
            primaryBorderColor: '#3b8048',
            lineColor: '#3b8048',
            secondaryColor: '#fef9f0',
            secondaryTextColor: '#1B1B1B',
            tertiaryColor: '#f5fbf6',
            tertiaryTextColor: '#1B1B1B',
            noteBkgColor: '#fef9f0',
            noteTextColor: '#1B1B1B',
            textColor: '#1B1B1B',
            mainBkg: '#ffffff',
            nodeBorder: '#3b8048',
            clusterBkg: '#fef9f0',
            clusterBorder: '#3b8048',
            labelTextColor: '#1B1B1B',
            edgeLabelBackground: '#fef9f0',
            nodeTextColor: '#1B1B1B',
            actorTextColor: '#1B1B1B',
            signalTextColor: '#1B1B1B',
            labelColor: '#1B1B1B',
            loopTextColor: '#1B1B1B',
            activationBorderColor: '#3b8048',
            activationBkgColor: '#fef9f0',
            fontSize: '14px',
            fontFamily: 'Inter, sans-serif'
          }
        });
        
        // Use run() to render all .mermaid elements
        (window as any).mermaid.run();
      }
    }, 100);
  }
  document.head.appendChild(script)
}

onMounted(() => {
  initMermaid()
})
</script>

<template>
  <div class="technical-page">
    <div class="container content-container">
      <header class="tech-header">
        <p class="brand-link"><NuxtLink to="/sapid">Sapid</NuxtLink>: Technical Documentation</p>
        <h1 class="main-title">Architecture & Implementation</h1>
      </header>

      <div class="prose">
        <h2>System Architecture</h2>
        <p>Sapid is built as a modern cross-platform mobile application with cloud-based synchronization and AI capabilities.</p>
        <section id="system-overview">
          <h2>1. System Overview</h2>
          <p>Sapid is a client-first mobile application that turns unstructured recipe inspiration into structured, actionable meal plans. We chose a "thick client, thin backend" architecture to ensure maximum responsiveness while maintaining a production-grade security posture for sensitive AI and monetization logic.</p>
          
          <p>The system is built on a modern distributed architecture:</p>
          <ul>
            <li><strong>Frontend (Mobile):</strong> React Native + Expo (SDK 54), Expo Router for file-based navigation.</li>
            <li><strong>Frontend (Website):</strong> Nuxt 3 with Vue 3 and Tailwind CSS.</li>
            <li><strong>Identity:</strong> Clerk for authentication and cross-service identity management.</li>
            <li><strong>Data Layer:</strong> Firebase Firestore (Real-time DB) and Firebase Storage (Images).</li>
            <li><strong>Monetization:</strong> RevenueCat for cross-platform subscriptions and entitlement enforcement.</li>
            <li><strong>Backend Layer:</strong> Node.js Express Proxy hosted on Google Cloud Run.</li>
            <li><strong>AI Integration:</strong> Google Vertex AI (Gemini 2.5 Flash) for multimodal recipe extraction.</li>
            <li><strong>Analytics:</strong> Mixpanel for event-driven behavior analysis.</li>
            <li><strong>Local Logic:</strong> Zustand for state management and Fuse.js for fuzzy ingredient matching.</li>
          </ul>

          <div class="diagram-container">
            <p class="diagram-caption">Diagram 1: High-Level Architecture</p>
            <pre class="mermaid">
graph TD
    subgraph Client ["Mobile App (React Native + Expo)"]
        UI[User Interface]
        Heuristics[Local Heuristics & Fuse.js]
        UX[Zustand State]
    end

    subgraph Identity ["Identity & Auth"]
        Clerk[Clerk Auth]
    end

    subgraph Data ["Cloud Services"]
        Firebase[(Firebase Firestore)]
        RC[RevenueCat]
        Mixpanel[Mixpanel Analytics]
    end

    subgraph AI ["AI Strategy Layer"]
        Proxy[Express AI Proxy]
        Gemini[Google Vertex AI]
    end

    UI <--> Clerk
    UI <--> Firebase
    UI <--> RC
    UI --> Mixpanel
    
    UI --> Proxy
    Proxy --> RC
    Proxy --> Gemini
    Proxy --> UI

    style Client fill:#f5fbf6,stroke:#3b8048
    style Proxy fill:#3b8048,color:#fff
    style Gemini fill:#fef9f0,stroke:#3b8048
            </pre>
          </div>
        </section>

        <section id="auth-identity">
          <h2>2. Authentication and Identity (Clerk)</h2>
          <p>We utilize Clerk to provide a secure, frictionless entry point for users across Google, Apple, and Email providers. This choice allows us to focus on our core product value while delegating complex security tasks like multi-factor authentication and session management.</p>
          <ul>
            <li><strong>Canonical Identifier:</strong> The Clerk <code>user_id</code> serves as the primary key across our entire ecosystem.</li>
            <li><strong>ID Linking:</strong> This identifier is mapped directly to <strong>Firebase</strong> documents, <strong>RevenueCat</strong> app_user_ids, and <strong>Mixpanel</strong> user profiles, ensuring a consistent user history regardless of the device.</li>
            <li><strong>Proxy Security:</strong> Auth tokens are attached to every proxy request. The proxy validates the sender's identity with Clerk before any AI processing begins, preventing unauthorized API usage.</li>
          </ul>
        </section>

        <section id="data-storage">
          <h2>3. Data Storage and Sync (Firebase)</h2>
          <p>Sapid is built for the "always-on" user. All user-generated data, including custom recipes, weekly meal plans, pantry items, and shopping lists, is stored in Firebase Firestore.</p>
          <p><strong>The Sync Model:</strong> We chose Firebase because it provides seamless cloud persistence with minimal latency. The client architecture handles <strong>optimistic updates</strong>, meaning users see their changes instantly even if they have a weak connection. Full offline support is achieved through local persistence, with data syncing automatically once a connection is re-established.</p>
        </section>

        <section id="monetization">
          <h2>4. Monetization Architecture (RevenueCat)</h2>
          <p>Our monetization engine is designed for professional reliability, centered around the <strong>Sapid Pro</strong> entitlement. We chose RevenueCat because it abstracts the complexity of cross-platform billing, expiration dates, and grace periods.</p>
          
          <h4>Server-Side Enforcement</h4>
          <p>Critical to our security is the realization that client-side checks are not enough. While the app UI unlocks features based on RevenueCat status, all <strong>AI-powered Pro features</strong> are strictly routed through our Express proxy. </p>
          <p>The proxy validates the entitlement by calling the <strong>RevenueCat Subscriber API</strong> directly using a secret server-side token. We implement a custom caching layer (TTL: 5 mins) to minimize latency while ensuring that if a subscription expires or is revoked, the Pro features are immediately disabled. If the entitlement is invalid, the request is rejected before any AI cost or processing is incurred.</p>

          <div class="diagram-container">
            <p class="diagram-caption">Diagram 2: Pro Feature Enforcement Flow</p>
            <pre class="mermaid">
sequenceDiagram
    participant U as User
    participant C as Client App
    participant P as AI Proxy
    participant RC as RevenueCat
    participant AI as Gemini AI

    U->>C: Taps Pro Feature (e.g. AI Import)
    C->>C: Local Entitlement Check
    C->>P: Request + Auth Token
    P->>RC: Verify Subscription (Secret Key)
    RC-->>P: Entitlement Status
    
    alt is Pro
        P->>AI: Authorize & Call LLM
        AI-->>P: Structured Result
        P-->>C: Data Delivered
    else not Pro
        P-->>C: 401 Unauthorized
        C->>U: Show Paywall
    end
            </pre>
          </div>
        </section>

        <section id="paywall-mixpanel">
          <h2>5. Paywall System and Mixpanel Integration</h2>
          <p>Sapid's growth strategy is data-driven. We've integrated Mixpanel to track significant milestones in the user's journey, from <code>recipe_import_started</code> to <code>cooking_mode_started</code>.</p>
          <p><strong>Growth Thinking:</strong> While we currently offer a single production paywall, our architecture is built for experimentation. By segmenting users based on Mixpanel behavior (e.g., users who import frequently but don't plan), we can dynamically present different RevenueCat offerings, optimizing for conversion without structural code changes.</p>

          <div class="diagram-container">
            <p class="diagram-caption">Diagram 3: Paywall Selection Flow</p>
            <pre class="mermaid">
graph LR
    subgraph Behavior ["Behavior Phase"]
        Events[Mixpanel Events] --> Segment[User Segmentation]
    end
    
    subgraph Selection ["Selection Phase"]
        Segment --> Rule{Selection Logic}
        Rule -->|Import Heavy| Off1[Annual Offer]
        Rule -->|Casual User| Off2[Monthly Trial]
    end
    
    subgraph Presentation ["Presentation Phase"]
        Off1 --> RC[RevenueCat Paywall]
        Off2 --> RC
        RC --> User((User))
    end

    style Rule fill:#3b8048,color:#fff
    style Behavior fill:#f5fbf6,stroke:#3b8048
            </pre>
          </div>
        </section>

        <section id="ai-proxy">
          <h2>6. AI and Express Proxy Layer</h2>
          <p>Our AI strategy is centralized through a secured Express Proxy. This approach was chosen to ensure:</p>
          <ul>
            <li><strong>Key Protection:</strong> No AI API keys are ever stored on the user's device.</li>
            <li><strong>Prompt Control:</strong> System prompts are managed server-side, allowing us to tune AI behavior without an app store update.</li>
            <li><strong>Usage Monitoring:</strong> We log every AI interaction to optimize performance and prevent abuse.</li>
          </ul>

          <div class="diagram-container">
            <p class="diagram-caption">Diagram 4: AI Request Sequence</p>
            <pre class="mermaid">
sequenceDiagram
    participant Client
    participant Proxy
    participant RC as RevenueCat
    participant Gemini as Vertex AI

    Client->>Proxy: AI Request (Text/Image/URL)
    Proxy->>Proxy: Validate Clerk Session
    Proxy->>RC: Enforce Entitlement
    Proxy->>Proxy: Inject Specialized System Prompt
    Proxy->>Gemini: Request Structured JSON
    Gemini-->>Proxy: Raw Data
    Proxy->>Proxy: Sanitize & Validate Schema
    Proxy-->>Client: Clean Structured Response
            </pre>
          </div>
        </section>

        <section id="import-pipeline">
          <h2>7. Recipe Import and Matching Pipeline</h2>
          <p>The import pipeline is Sapid's core differentiator. We combine deep AI reasoning with fast, local heuristics to create a "magic" import experience that actually understands food.</p>
          <p><strong>Hybrid Intelligence:</strong> We use AI for the initial extraction (turning an image or URL into JSON components), but we perform <strong>heuristic ingredient matching</strong> using <code>fuse.js</code> on the client. This allows for instant fuzzy matching of extracted ingredients to our normalized catalog, reducing costs and providing immediate feedback for user validation.</p>

          <div class="diagram-container">
            <p class="diagram-caption">Diagram 5: Import & Matching Pipeline</p>
            <pre class="mermaid">
graph TD
    Input[URL / Photo / Text] --> Jina[Content Preprocessing]
    Jina --> Proxy[AI Extraction via Proxy]
    Proxy --> Local[Client Heuristic Matching]
    Local --> Fuse[fuse.js Fuzzy Search]
    Fuse --> Validation[User Review & Edit]
    Validation --> Storage[(Firebase Storage)]

    style Proxy fill:#3b8048,color:#fff
    style Local fill:#fef9f0,stroke:#3b8048
    style Fuse fill:#fef9f0,stroke:#3b8048
            </pre>
          </div>
        </section>

        <section id="planning-logic">
          <h2>8. Planning and Smart Trip Logic</h2>
          <p>The Sapid Smart Planner is designed to eliminate the mental load of grocery shopping. The logic follows a cascading dependency model:</p>
          <ul>
            <li><strong>Pantry Subtraction:</strong> The system automatically cross-references planned ingredients with your current inventory, ensuring you only buy what you need.</li>
            <li><strong>Aggregation:</strong> Ingredients are normalized and combined across multiple recipes (e.g., "3 onions" from two different recipes).</li>
            <li><strong>Smart Trip:</strong> Our grouping logic assigns items to categories or specific stores. Users can toggle between <strong>Preferred Store Mode</strong> (prioritizing favorites) and <strong>Efficient Mode</strong> (minimizing stops).</li>
          </ul>
        </section>

        <section id="cooking-mode">
          <h2>9. Cooking Mode</h2>
          <p>The Cooking Mode is a distraction-free focused UI tailored for the heat of the kitchen. It features immersive step rendering, integrated timer management for every instruction, and a hands-free interaction model designed to keep messy fingers away from the screen.</p>
        </section>

        <section id="security-privacy">
          <h2>10. Security and Privacy</h2>
          <p>We maintain a "Privacy by Design" posture. User data is protected through Firebase security rules that enforce row-level access, and all sensitive operations, such as monetization checks and AI calls, are validated server-side with secret tokens. We chose this architecture because it offers the speed of a modern mobile app with the security of a traditional enterprise system.</p>
        </section>
      </div>
      
      <div class="footer-actions">
         <NuxtLink to="/sapid" class="btn btn-primary btn-xl">Back to Sapid</NuxtLink>
         <NuxtLink to="/sapid/proposal" class="btn btn-outline btn-xl">Read the Vision</NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.technical-page {
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

.prose h4 {
    font-family: var(--font-display);
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--color-primary-700);
    margin-top: 2rem;
    margin-bottom: 0.75rem;
}

.prose ul {
    margin-bottom: 1.5rem;
    padding-left: 1.5rem;
}

.prose li {
    margin-bottom: 0.5rem;
    padding-left: 0.5rem;
}

.prose li::marker {
    color: var(--color-primary-600);
}

.prose strong {
    color: var(--color-neutral-900);
    font-weight: 600;
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

/* Diagram Styling */
.diagram-container {
    margin: 2rem 0;
    padding: 1.5rem;
    background-color: var(--color-white);
    border-radius: 0.75rem;
    border: 1px solid rgba(59, 128, 72, 0.2);
}

.diagram-caption {
    font-weight: 600;
    color: var(--color-primary-600);
    margin-bottom: 1rem;
    text-align: center;
    font-size: 0.9375rem;
}

.diagram-container pre.mermaid {
    background: transparent;
    border: none;
    padding: 0;
    margin: 0;
    overflow-x: auto;
}

.diagram-container svg {
    max-width: 100%;
    height: auto;
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
