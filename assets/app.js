/* ClaudHQ — Prompt Library App */

var PROMPTS = [
  { id: 1, title: "Code Review Assistant", category: "coding", description: "Thorough code review with actionable feedback on bugs, security, and style.", prompt: "You are an expert code reviewer. Review the following code and provide:\n\n1. **Bugs & Errors**: Any logical errors, off-by-one mistakes, or runtime issues\n2. **Security**: Potential vulnerabilities (SQL injection, XSS, auth issues)\n3. **Performance**: Inefficient patterns or unnecessary complexity\n4. **Style**: Naming conventions, readability, code organization\n5. **Suggestions**: Specific refactoring recommendations with code examples\n\nFor each issue, rate severity as HIGH / MEDIUM / LOW.\n\nCode to review:\n```\n[PASTE YOUR CODE HERE]\n```" },
  { id: 2, title: "Unit Test Generator", category: "coding", description: "Generate comprehensive unit tests for any function or module.", prompt: "Generate unit tests for the following code. Include:\n\n- Happy path tests for normal inputs\n- Edge cases (empty inputs, null, boundary values)\n- Error cases (invalid inputs, exceptions)\n- Use descriptive test names that explain the scenario\n- Add brief comments explaining WHY each test matters\n\nFramework: [Jest / pytest / your framework]\n\nCode:\n```\n[PASTE YOUR CODE HERE]\n```\n\nOutput the tests ready to copy into a test file." },
  { id: 3, title: "Debug This Error", category: "coding", description: "Systematic debugging approach for any error or unexpected behavior.", prompt: "I'm getting this error and need help debugging it.\n\n**Error message:**\n[PASTE ERROR HERE]\n\n**Relevant code:**\n```\n[PASTE CODE HERE]\n```\n\n**What I expected:** [describe expected behavior]\n**What happened:** [describe actual behavior]\n\nPlease:\n1. Explain what the error means in plain English\n2. Identify the root cause\n3. Provide the fix with corrected code\n4. Explain WHY the fix works\n5. Suggest how to prevent this type of error in the future" },
  { id: 4, title: "Refactor Legacy Code", category: "coding", description: "Transform messy code into clean, maintainable architecture.", prompt: "Refactor the following code to be cleaner and more maintainable. Apply these principles:\n\n- Single Responsibility Principle\n- Extract reusable functions (each under 30 lines)\n- Add meaningful variable/function names\n- Remove dead code and redundancy\n- Add JSDoc/docstring comments for public functions\n- Keep the same external behavior (no breaking changes)\n\nShow the refactored code and explain each major change.\n\n```\n[PASTE YOUR CODE HERE]\n```" },
  { id: 5, title: "API Endpoint Design", category: "coding", description: "Design RESTful API endpoints with proper status codes and payloads.", prompt: "Design a RESTful API for the following feature:\n\n**Feature:** [describe your feature]\n\nFor each endpoint, provide:\n- HTTP method and URL path\n- Request body (JSON example)\n- Response body (JSON example) for success and error\n- HTTP status codes\n- Authentication requirements\n- Rate limiting recommendations\n\nFollow REST best practices: proper resource naming, pagination for lists, consistent error format." },
  { id: 6, title: "Blog Post Writer", category: "writing", description: "Well-structured blog post with SEO-friendly formatting.", prompt: "Write a blog post on the following topic:\n\n**Topic:** [YOUR TOPIC]\n**Target audience:** [WHO READS THIS]\n**Tone:** [professional / conversational / technical]\n**Word count:** [800-1500]\n\nStructure:\n- Compelling headline (under 60 characters)\n- Hook intro paragraph that states the problem\n- 3-5 sections with H2 subheadings\n- Practical examples or actionable tips in each section\n- Conclusion with a clear takeaway\n\nDo NOT use filler phrases like \"In today's fast-paced world\". Be specific and direct." },
  { id: 7, title: "Email Rewriter", category: "writing", description: "Rewrite emails to be clearer, more professional, or more persuasive.", prompt: "Rewrite the following email to be [more professional / more concise / more persuasive].\n\nOriginal email:\n---\n[PASTE YOUR EMAIL HERE]\n---\n\nRules:\n- Keep the core message intact\n- Remove filler words and unnecessary hedging\n- Use active voice\n- Add a clear call-to-action\n- Keep it under [X] sentences\n- Match a [formal / friendly / assertive] tone\n\nProvide the rewritten email, then explain the key changes you made." },
  { id: 8, title: "Technical Documentation", category: "writing", description: "Generate clear docs for functions, APIs, or systems.", prompt: "Write technical documentation for the following:\n\n```\n[PASTE CODE / API / SYSTEM DESCRIPTION]\n```\n\nInclude:\n1. **Overview**: What it does in 1-2 sentences\n2. **Quick Start**: Minimal example to get working in 30 seconds\n3. **Parameters/Options**: Table with name, type, required, default, description\n4. **Examples**: 3 real-world usage examples (basic, intermediate, advanced)\n5. **Common Errors**: Top 3 mistakes and how to fix them\n6. **Notes**: Edge cases or important caveats\n\nFormat in Markdown." },
  { id: 9, title: "Social Media Thread", category: "writing", description: "Create engaging social threads with hooks and CTAs.", prompt: "Create a social media thread (5-8 posts) about:\n\n**Topic:** [YOUR TOPIC]\n**Platform:** [Twitter/X / LinkedIn / Threads]\n**Goal:** [educate / promote / entertain]\n\nRules:\n- Post 1: Strong hook that creates curiosity (no \"Thread:\" prefix)\n- Each post: One clear idea, under 280 chars for Twitter\n- Use specific numbers and examples, not vague claims\n- Include 1-2 posts with actionable advice\n- Final post: Clear CTA\n- No hashtags unless specifically requested\n- Suggest where to add images or screenshots" },
  { id: 10, title: "Resume Bullet Points", category: "writing", description: "Transform job duties into impact-driven resume bullets.", prompt: "Transform these job responsibilities into strong resume bullet points:\n\n**Role:** [YOUR JOB TITLE]\n**Responsibilities:**\n- [LIST YOUR DUTIES]\n\nRules:\n- Start each bullet with a strong action verb\n- Include quantified results where possible (%, $, time saved)\n- Follow the format: [Action Verb] + [What You Did] + [Result/Impact]\n- Keep each bullet to 1-2 lines\n- Focus on achievements, not just duties\n\nIf I haven't provided metrics, suggest realistic ones I could insert based on the role." },
  { id: 11, title: "Data Analysis Brief", category: "analysis", description: "Structured analysis framework for any dataset.", prompt: "Analyze the following data and provide insights:\n\n**Data:**\n[PASTE YOUR DATA / DESCRIBE YOUR DATASET]\n\n**Questions I want answered:**\n1. [YOUR QUESTION]\n2. [YOUR QUESTION]\n\nProvide:\n1. **Summary Statistics**: Key metrics at a glance\n2. **Trends**: What patterns emerge from the data?\n3. **Outliers**: Any anomalies or surprising data points?\n4. **Correlations**: What factors seem related?\n5. **Recommendations**: What actions should be taken based on this data?\n6. **Caveats**: What limitations exist in this analysis?\n\nUse specific numbers from the data to support every claim." },
  { id: 12, title: "SWOT Analysis", category: "analysis", description: "Complete SWOT breakdown for business decisions.", prompt: "Perform a SWOT analysis for:\n\n**Subject:** [COMPANY / PRODUCT / DECISION]\n**Context:** [MARKET / SITUATION DETAILS]\n\nFor each quadrant, provide 4-6 specific points:\n\n**Strengths** (internal positive)\n**Weaknesses** (internal negative)\n**Opportunities** (external positive)\n**Threats** (external negative)\n\nThen provide:\n- Top 3 strategic recommendations based on the SWOT\n- Key risks to monitor\n- Suggested next steps with timeline" },
  { id: 13, title: "Competitive Analysis", category: "analysis", description: "Deep-dive comparison against competitors.", prompt: "Create a competitive analysis comparing:\n\n**Your product:** [NAME + BRIEF DESCRIPTION]\n**Competitors:** [LIST 2-4 COMPETITORS]\n\nAnalyze each on:\n1. Core features comparison (table format)\n2. Pricing model\n3. Target audience\n4. Unique selling proposition\n5. Market positioning\n6. Strengths and weaknesses\n\nConclude with:\n- Where you have competitive advantage\n- Where you're vulnerable\n- Recommended differentiation strategy\n- Features to prioritize on your roadmap" },
  { id: 14, title: "Meeting Notes Summarizer", category: "analysis", description: "Turn messy meeting notes into structured action items.", prompt: "Summarize these meeting notes into a structured format:\n\n**Raw Notes:**\n[PASTE YOUR NOTES HERE]\n\nOutput format:\n\n## Meeting Summary\n**Date:** [date]\n**Attendees:** [names]\n**Duration:** [time]\n\n## Key Decisions\n- [Decision 1]\n- [Decision 2]\n\n## Action Items\n| Owner | Task | Deadline |\n|-------|------|----------|\n| [name] | [task] | [date] |\n\n## Discussion Points\n- [Summarize each topic in 1-2 sentences]\n\n## Open Questions\n- [Unresolved items that need follow-up]\n\n## Next Meeting\n- [Date/agenda items]" },
  { id: 15, title: "Root Cause Analysis", category: "analysis", description: "Systematic 5-Whys approach to find the real problem.", prompt: "Help me perform a root cause analysis for this problem:\n\n**Problem:** [DESCRIBE THE ISSUE]\n**When it started:** [TIMELINE]\n**Impact:** [WHO/WHAT IS AFFECTED]\n\nApply the 5 Whys method:\n1. Ask \"Why did this happen?\" and answer\n2. For that answer, ask \"Why?\" again\n3. Continue 5 levels deep\n\nThen provide:\n- The root cause (not just a symptom)\n- Short-term fix (stop the bleeding)\n- Long-term solution (prevent recurrence)\n- Preventive measures to add to processes" },
  { id: 16, title: "Story Plot Generator", category: "creative", description: "Generate detailed story outlines with characters and arcs.", prompt: "Create a story outline for:\n\n**Genre:** [YOUR GENRE]\n**Setting:** [TIME AND PLACE]\n**Theme:** [CORE THEME]\n**Length:** [short story / novella / novel]\n\nInclude:\n1. **Premise**: One-paragraph hook\n2. **Main Character**: Name, background, flaw, desire, need\n3. **Supporting Characters**: 2-3 with their role in the story\n4. **Three-Act Structure**:\n   - Act 1: Setup + Inciting incident\n   - Act 2: Rising action + Midpoint twist + Dark moment\n   - Act 3: Climax + Resolution\n5. **Key Scenes**: 5-7 pivotal moments described in 2-3 sentences each\n6. **Opening Line**: A compelling first sentence" },
  { id: 17, title: "Dialogue Writer", category: "creative", description: "Write natural dialogue between characters for any scenario.", prompt: "Write a dialogue scene between these characters:\n\n**Character 1:** [NAME, personality, goal in scene]\n**Character 2:** [NAME, personality, goal in scene]\n**Setting:** [WHERE AND WHEN]\n**Conflict:** [WHAT THEY DISAGREE ABOUT]\n**Tone:** [tense / humorous / emotional / casual]\n\nRules:\n- Each character should have a distinct voice (word choice, sentence length, verbal tics)\n- Show subtext — what they mean vs. what they say\n- Include brief action beats between dialogue lines\n- Build tension toward a turning point\n- End the scene on an unresolved note or revelation\n- 500-800 words" },
  { id: 18, title: "Product Name Brainstorm", category: "creative", description: "Generate creative product or brand names.", prompt: "Generate 20 name ideas for:\n\n**What it is:** [PRODUCT/SERVICE DESCRIPTION]\n**Target audience:** [WHO]\n**Vibe:** [professional / playful / techy / elegant / bold]\n**Constraints:** [max characters, must include specific word, etc.]\n\nFor each name provide:\n- The name\n- Why it works (1 sentence)\n- Available as .com? (guess based on common patterns)\n\nGroup them into categories:\n- Descriptive names (say what it does)\n- Abstract names (evoke a feeling)\n- Compound names (combine two words)\n- Invented names (new words)" },
  { id: 19, title: "Creative Writing Feedback", category: "creative", description: "Detailed constructive feedback on fiction or creative writing.", prompt: "Provide constructive feedback on this creative writing:\n\n---\n[PASTE YOUR WRITING HERE]\n---\n\nAnalyze:\n1. **Opening Hook**: Does it grab attention in the first paragraph?\n2. **Voice & Style**: Is the prose style consistent and distinctive?\n3. **Pacing**: Where does it drag? Where does it rush?\n4. **Character**: Do characters feel real? Distinct voices?\n5. **Dialogue**: Natural and purposeful?\n6. **Show vs Tell**: Point out specific tell instances and rewrite as show\n7. **Strongest Line**: Quote the best sentence and explain why\n8. **Weakest Section**: Identify and suggest a rewrite\n\nBe honest but encouraging. End with 3 specific revision priorities." },
  { id: 20, title: "Business Plan One-Pager", category: "business", description: "Concise business plan covering all essential elements.", prompt: "Create a one-page business plan for:\n\n**Business idea:** [DESCRIBE YOUR IDEA]\n**Target market:** [WHO WILL PAY]\n**Stage:** [idea / prototype / launched]\n\nCover these sections concisely:\n\n1. **Problem**: What pain point do you solve? (2-3 sentences)\n2. **Solution**: How you solve it (2-3 sentences)\n3. **Target Customer**: Specific persona with demographics\n4. **Revenue Model**: How you make money (pricing strategy)\n5. **Market Size**: TAM / SAM / SOM estimates\n6. **Competition**: Top 3 competitors and your differentiator\n7. **Go-to-Market**: First 3 channels to acquire customers\n8. **Milestones**: 3-month, 6-month, 12-month goals\n9. **Ask**: What you need (funding, team, partnerships)\n\nKeep the total under 500 words. Be specific, not generic." },
  { id: 21, title: "Sales Email Sequence", category: "business", description: "Multi-touch email sequence for cold outreach.", prompt: "Create a 5-email cold outreach sequence for:\n\n**Product/Service:** [WHAT YOU SELL]\n**Target:** [JOB TITLE / COMPANY TYPE]\n**Key benefit:** [MAIN VALUE PROPOSITION]\n**Social proof:** [ANY STATS, CLIENTS, RESULTS]\n\nFor each email:\n- Subject line (under 50 characters, no clickbait)\n- Body (under 100 words)\n- Clear CTA\n- Send timing (days between emails)\n\nTone: Conversational, not salesy. Focus on their problem, not your product.\n\nEmail 1: Problem-aware intro\nEmail 2: Value-add (share insight, no pitch)\nEmail 3: Social proof + soft ask\nEmail 4: Different angle or use case\nEmail 5: Breakup email" },
  { id: 22, title: "Pricing Strategy", category: "business", description: "Develop pricing tiers and positioning for your product.", prompt: "Help me create a pricing strategy for:\n\n**Product:** [NAME AND DESCRIPTION]\n**Current price:** [IF ANY]\n**Competitors' prices:** [LIST IF KNOWN]\n**Target customer:** [WHO]\n**Cost per user/unit:** [IF KNOWN]\n\nProvide:\n1. **Pricing Model**: Recommend the best model (freemium, tiered, per-seat, usage-based) and explain why\n2. **Tier Structure**: Design 3 tiers with names, prices, and included features\n3. **Feature Gating**: Which features drive upgrades?\n4. **Anchoring Strategy**: How to make the middle tier most attractive\n5. **Annual vs Monthly**: Discount recommendations\n6. **Launch Pricing**: Any introductory pricing tactics\n7. **Pricing Page Copy**: Brief descriptions for each tier" },
  { id: 23, title: "Investor Pitch Script", category: "business", description: "Compelling 3-minute pitch script for investor meetings.", prompt: "Write a 3-minute investor pitch script for:\n\n**Company:** [NAME]\n**What it does:** [ONE SENTENCE]\n**Stage:** [pre-seed / seed / Series A]\n**Traction:** [ANY METRICS]\n**Ask:** [HOW MUCH AND FOR WHAT]\n\nStructure (with time allocation):\n- Hook: 15 seconds — surprising stat or story\n- Problem: 30 seconds — make them feel the pain\n- Solution: 30 seconds — your product demo moment\n- Market: 20 seconds — size and timing\n- Business model: 20 seconds — how you make money\n- Traction: 20 seconds — proof it works\n- Team: 15 seconds — why you'll win\n- Ask: 10 seconds — specific amount and use of funds\n\nWrite it as a spoken script. Conversational, confident, not robotic." },
  { id: 24, title: "Lesson Plan Builder", category: "education", description: "Structured lesson plan for any topic and age group.", prompt: "Create a lesson plan for:\n\n**Subject:** [TOPIC]\n**Age group:** [GRADE LEVEL / AGE]\n**Duration:** [CLASS LENGTH]\n**Prior knowledge:** [WHAT STUDENTS ALREADY KNOW]\n**Learning objective:** [WHAT STUDENTS SHOULD BE ABLE TO DO AFTER]\n\nInclude:\n1. **Warm-up** (5 min): Engaging opener that activates prior knowledge\n2. **Introduction** (10 min): Present new concept with real-world connection\n3. **Guided Practice** (15 min): Teacher-led activity with examples\n4. **Independent Practice** (15 min): Student activity or exercise\n5. **Assessment**: How to check understanding (quiz, exit ticket, discussion)\n6. **Extension**: Challenge activity for advanced students\n7. **Materials needed**: List everything required\n8. **Common misconceptions**: What students often get wrong and how to address it" },
  { id: 25, title: "Explain Like I'm 5", category: "education", description: "Break down complex topics into simple analogies anyone can understand.", prompt: "Explain this concept in the simplest possible way:\n\n**Concept:** [TOPIC TO EXPLAIN]\n\nRules:\n- Start with a relatable analogy from everyday life\n- Use zero jargon\n- Build up in 3 layers:\n  1. ELI5 version (a 5-year-old could get it)\n  2. ELI15 version (add more nuance for a teenager)\n  3. Adult version (the full picture with proper terminology)\n- Include a \"So what?\" section: why this matters in real life\n- End with a common misconception about this topic and the truth" },
  { id: 26, title: "Study Guide Generator", category: "education", description: "Comprehensive study guide with key concepts and practice questions.", prompt: "Create a study guide for:\n\n**Subject:** [TOPIC / CHAPTER / COURSE]\n**Exam type:** [multiple choice / essay / practical]\n**Key areas:** [LIST MAIN TOPICS TO COVER]\n\nInclude:\n1. **Key Concepts**: 10-15 essential terms with definitions\n2. **Summary**: Core ideas in your own words (not textbook language)\n3. **Connections**: How concepts relate to each other (a simple diagram description)\n4. **Practice Questions**:\n   - 5 multiple choice (with answer key)\n   - 3 short answer\n   - 1 essay prompt\n5. **Common Exam Mistakes**: What students lose points on\n6. **Memory Aids**: Mnemonics or tricks for hard-to-remember content\n7. **Quick Review Checklist**: 10 yes/no questions to test readiness" },
  { id: 27, title: "Flashcard Set Creator", category: "education", description: "Generate effective flashcards using spaced repetition principles.", prompt: "Create a set of 20 flashcards for studying:\n\n**Topic:** [YOUR TOPIC]\n**Difficulty:** [beginner / intermediate / advanced]\n\nRules for effective flashcards:\n- One concept per card\n- Questions should require recall, not recognition\n- Include \"why\" questions, not just \"what\"\n- Mix fact-based and application-based questions\n- Add a hint on harder cards\n\nFormat each card as:\n**Q:** [question]\n**A:** [answer]\n**Hint:** [optional hint]\n**Difficulty:** [1-3 stars]\n\nGroup cards by subtopic. Start with foundational concepts, then build to advanced." },
  { id: 28, title: "SQL Query Builder", category: "coding", description: "Generate optimized SQL queries from plain English descriptions.", prompt: "Write a SQL query for the following:\n\n**Database:** [PostgreSQL / MySQL / SQLite]\n**Tables:**\n[DESCRIBE YOUR TABLES AND COLUMNS]\n\n**What I need:**\n[DESCRIBE IN PLAIN ENGLISH WHAT DATA YOU WANT]\n\nProvide:\n1. The SQL query with proper formatting\n2. Explanation of each clause (what it does and why)\n3. Expected output format (column names and sample row)\n4. Performance notes (will it be slow? add an index?)\n5. Common modifications (how to adjust for similar queries)" },
  { id: 29, title: "Git Commit Messages", category: "coding", description: "Write clear, conventional commit messages from code diffs.", prompt: "Write a git commit message for these changes:\n\n```diff\n[PASTE YOUR DIFF OR DESCRIBE CHANGES]\n```\n\nFollow Conventional Commits format:\n- type(scope): description\n- Types: feat, fix, docs, style, refactor, test, chore\n- Description: imperative mood, under 72 chars\n- Body: explain WHY, not what (the diff shows what)\n- Footer: reference issues if applicable\n\nProvide 3 options:\n1. One-liner (for simple changes)\n2. With body (for changes needing context)\n3. With body + footer (for tracked issues)" },
  { id: 30, title: "Regex Pattern Builder", category: "coding", description: "Create and explain regular expressions for any pattern matching need.", prompt: "Create a regex pattern for:\n\n**What to match:** [DESCRIBE THE PATTERN]\n**Language/tool:** [JavaScript / Python / grep / etc.]\n**Examples that should match:**\n- [example 1]\n- [example 2]\n\n**Examples that should NOT match:**\n- [example 1]\n- [example 2]\n\nProvide:\n1. The regex pattern\n2. Character-by-character explanation\n3. Test results against all provided examples\n4. Edge cases it might miss\n5. A simpler alternative if the regex is complex\n6. Code snippet showing how to use it" },
  { id: 31, title: "Project Kickoff Checklist", category: "business", description: "Comprehensive checklist for launching any new project.", prompt: "Create a project kickoff checklist for:\n\n**Project:** [DESCRIBE THE PROJECT]\n**Timeline:** [START TO END]\n**Team size:** [NUMBER OF PEOPLE]\n**Budget:** [IF APPLICABLE]\n\nOrganize into phases:\n\n**Phase 1: Planning**\n- [ ] Define objectives and success metrics\n- [ ] Identify stakeholders\n- [ ] [MORE ITEMS...]\n\n**Phase 2: Setup**\n- [ ] Tools and infrastructure\n- [ ] Team roles and responsibilities\n- [ ] [MORE ITEMS...]\n\n**Phase 3: Execution**\n- [ ] Sprint/milestone planning\n- [ ] Communication cadence\n- [ ] [MORE ITEMS...]\n\n**Phase 4: Launch**\n- [ ] Testing checklist\n- [ ] Rollback plan\n- [ ] [MORE ITEMS...]\n\nInclude 5-8 items per phase. Make items specific and actionable." },
  { id: 32, title: "Persona Creator", category: "business", description: "Build detailed user personas for product development.", prompt: "Create a detailed user persona for:\n\n**Product:** [YOUR PRODUCT]\n**Segment:** [WHICH USER TYPE]\n\nInclude:\n- **Name & Photo description** (fictional but realistic)\n- **Demographics**: Age, location, job title, income, education\n- **Bio**: 3-4 sentence backstory\n- **Goals**: Top 3 things they want to achieve\n- **Frustrations**: Top 3 pain points\n- **Tech Comfort**: Scale of 1-5 with context\n- **A Day in Their Life**: Brief narrative of a typical day\n- **How They Find Products**: Discovery channels\n- **Objections**: Why they might NOT buy/use your product\n- **Trigger**: What event makes them search for a solution\n- **Quote**: A sentence they might say that captures their mindset" }
];

var favorites = loadFavorites();
var activeCategory = "all";
var searchTerm = "";

function loadFavorites() {
  try {
    var data = localStorage.getItem("claudhq_favorites");
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
}

function saveFavorites() {
  try {
    localStorage.setItem("claudhq_favorites", JSON.stringify(favorites.slice(0, 200)));
  } catch (e) { /* quota exceeded — ignore */ }
}

function toggleFavorite(id, event) {
  event.stopPropagation();
  var idx = favorites.indexOf(id);
  if (idx === -1) {
    favorites.push(id);
  } else {
    favorites.splice(idx, 1);
  }
  saveFavorites();
  renderPrompts();
}

function copyPrompt(id, event) {
  event.stopPropagation();
  var prompt = null;
  for (var i = 0; i < PROMPTS.length; i++) {
    if (PROMPTS[i].id === id) { prompt = PROMPTS[i]; break; }
  }
  if (!prompt) return;
  navigator.clipboard.writeText(prompt.prompt).then(function() {
    var el = document.getElementById("feedback-" + id);
    if (el) {
      el.classList.add("show");
      setTimeout(function() { el.classList.remove("show"); }, 1500);
    }
  });
}

function toggleExpand(id) {
  var card = document.getElementById("card-" + id);
  if (!card) return;
  card.classList.toggle("expanded");
}

function fuzzyMatch(text, query) {
  var lower = text.toLowerCase();
  var q = query.toLowerCase();
  return lower.indexOf(q) !== -1;
}

function filterPrompts() {
  var results = [];
  for (var i = 0; i < PROMPTS.length; i++) {
    var p = PROMPTS[i];
    var matchCat = (activeCategory === "all") || (p.category === activeCategory);
    var matchSearch = !searchTerm || fuzzyMatch(p.title + " " + p.description, searchTerm);
    if (matchCat && matchSearch) {
      results.push(p);
    }
  }
  return results;
}

function renderPrompts() {
  var grid = document.getElementById("prompt-grid");
  if (!grid) return;
  var filtered = filterPrompts();
  var html = "";
  for (var i = 0; i < filtered.length; i++) {
    var p = filtered[i];
    var isFav = favorites.indexOf(p.id) !== -1;
    html += '<div class="prompt-card" id="card-' + p.id + '" onclick="toggleExpand(' + p.id + ')">';
    html += '<div class="prompt-card-header">';
    html += '<h3>' + escapeHtml(p.title) + '</h3>';
    html += '<span class="category-tag">' + escapeHtml(p.category) + '</span>';
    html += '</div>';
    html += '<div class="description">' + escapeHtml(p.description) + '</div>';
    html += '<div class="prompt-text">' + escapeHtml(p.prompt) + '</div>';
    html += buildTokenPanel(p);
    html += '<div class="prompt-actions">';
    html += '<button class="btn btn-accent" onclick="copyPrompt(' + p.id + ', event)">Copy Prompt</button>';
    html += '<span class="copied-feedback" id="feedback-' + p.id + '">Copied!</span>';
    html += '<button class="star-btn' + (isFav ? ' favorited' : '') + '" onclick="toggleFavorite(' + p.id + ', event)" title="Favorite">' + (isFav ? '\u2605' : '\u2606') + '</button>';
    html += '</div>';
    html += '</div>';
  }
  if (filtered.length === 0) {
    html = '<div style="text-align:center;color:var(--text-muted);padding:3rem 0;">No prompts match your search.</div>';
  }
  grid.innerHTML = html;
}

function escapeHtml(str) {
  var div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

function setCategory(cat) {
  activeCategory = cat;
  var chips = document.querySelectorAll(".chip");
  for (var i = 0; i < chips.length; i++) {
    chips[i].classList.toggle("active", chips[i].getAttribute("data-cat") === cat);
  }
  renderPrompts();
}

function initApp() {
  var searchInput = document.getElementById("search-input");
  if (searchInput) {
    searchInput.addEventListener("input", function() {
      searchTerm = this.value;
      renderPrompts();
    });
  }
  var chips = document.querySelectorAll(".chip");
  for (var i = 0; i < chips.length; i++) {
    chips[i].addEventListener("click", function() {
      setCategory(this.getAttribute("data-cat"));
    });
  }
  renderPrompts();
}

/* --- Token Counter + Model Recommender --- */

var MODEL_PRICING = {
  haiku: { name: "Claude 3 Haiku", inputPer1M: 0.25, outputPer1M: 1.25 },
  sonnet: { name: "Claude 3.5 Sonnet", inputPer1M: 3.00, outputPer1M: 15.00 },
  opus: { name: "Claude 3 Opus", inputPer1M: 15.00, outputPer1M: 75.00 }
};

function estimateTokens(text) {
  var words = text.split(/\s+/).filter(function(w) { return w.length > 0; });
  return Math.ceil(words.length * 1.3);
}

function classifyComplexity(text) {
  var codeBlocks = (text.match(/```/g) || []).length / 2;
  var bullets = (text.match(/^\s*[-*\d.]+/gm) || []).length;
  var longWords = text.split(/\s+/).filter(function(w) { return w.length > 12; }).length;
  var score = codeBlocks * 3 + bullets * 0.5 + longWords * 0.3;
  if (score > 10) return "complex";
  if (score > 3) return "moderate";
  return "simple";
}

function getModelRecommendation(tokens, complexity) {
  if (tokens >= 4000 || complexity === "complex") {
    return { key: "opus", reason: "Long or complex prompt" };
  }
  if (tokens >= 1000 || complexity === "moderate") {
    return { key: "sonnet", reason: "Moderate length & complexity" };
  }
  return { key: "haiku", reason: "Short & straightforward" };
}

function formatCost(dollars) {
  if (dollars < 0.001) return "<$0.001";
  return "$" + dollars.toFixed(4);
}

function buildTokenPanel(prompt) {
  var tokens = estimateTokens(prompt.prompt);
  var complexity = classifyComplexity(prompt.prompt);
  var rec = getModelRecommendation(tokens, complexity);
  var estOutputTokens = Math.min(tokens * 2, 4096);

  var html = '<div class="token-panel">';
  html += '<div class="token-header">Token & Cost Estimate</div>';
  html += '<div class="token-stats">';
  html += '<span class="token-badge">~' + tokens.toLocaleString() + ' input tokens</span>';
  html += '<span class="token-badge">' + complexity + ' complexity</span>';
  html += '</div>';
  html += '<div class="model-rec">';

  var keys = ["haiku", "sonnet", "opus"];
  for (var i = 0; i < keys.length; i++) {
    var m = MODEL_PRICING[keys[i]];
    var inputCost = (tokens / 1e6) * m.inputPer1M;
    var outputCost = (estOutputTokens / 1e6) * m.outputPer1M;
    var totalCost = inputCost + outputCost;
    var isRec = keys[i] === rec.key;
    html += '<div class="model-option' + (isRec ? ' recommended' : '') + '">';
    if (isRec) html += '<span class="rec-badge">Recommended</span>';
    html += '<strong>' + m.name + '</strong>';
    html += '<span class="model-cost">' + formatCost(totalCost) + '/use</span>';
    html += '</div>';
  }

  html += '</div>';
  html += '<div class="rec-reason">' + escapeHtml(rec.reason) + '</div>';
  html += '</div>';
  return html;
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  initApp();
}


// === Zovo V5 Pro Nudge System ===
(function() {
  var V5_LIMIT = 20;
  var V5_FEATURE = 'Full prompt library';
  var v5Count = 0;
  var v5Shown = false;

  function v5ShowNudge() {
    if (v5Shown || sessionStorage.getItem('v5_pro_nudge')) return;
    v5Shown = true;
    sessionStorage.setItem('v5_pro_nudge', '1');
    var host = location.hostname;
    var el = document.createElement('div');
    el.className = 'pro-nudge';
    el.innerHTML = '<div class="pro-nudge-inner">' +
      '<span class="pro-nudge-icon">\u2726</span>' +
      '<div class="pro-nudge-text">' +
      '<strong>' + V5_FEATURE + '</strong> is a Pro feature. ' +
      '<a href="https://zovo.one/pricing?utm_source=' + host +
      '&utm_medium=satellite&utm_campaign=pro-nudge" target="_blank">' +
      'Get Zovo Lifetime \u2014 $99 once, access everything forever.</a>' +
      '</div></div>';
    var target = document.querySelector('main') ||
      document.querySelector('.tool-section') ||
      document.querySelector('.container') ||
      document.querySelector('section') ||
      document.body;
    if (target) target.appendChild(el);
  }

  // Track meaningful user actions (button clicks, form submits)
  document.addEventListener('click', function(e) {
    var t = e.target;
    if (t.closest('button, [onclick], .btn, input[type="submit"], input[type="button"]')) {
      v5Count++;
      if (v5Count >= V5_LIMIT) v5ShowNudge();
    }
  }, true);

  // Track file drops/selections (for file-based tools)
  document.addEventListener('change', function(e) {
    if (e.target && e.target.type === 'file') {
      v5Count++;
      if (v5Count >= V5_LIMIT) v5ShowNudge();
    }
  }, true);
})();
