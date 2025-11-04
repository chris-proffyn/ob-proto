**🧭 1. Outbehaving Prototype -- Product Requirements Document (PRD)**

**Product Overview**

**Product Name:** Outbehaving  
**Version:** Prototype v1.0  
**Target ICP:** *Young Achievers* (ages 18--25) --- students,
early-career professionals

**Vision Statement:**

To become the trusted digital life and wealth companion for all society
--- helping people take control of their careers, finances, and futures
through intelligent, AI-powered support that adapts to every stage of
their financial journey.

**Prototype Purpose:**  
Validate that *Young Achievers* will engage with, benefit from, and
value Outbehaving's core proposition through a lean, testable product
prototype.

**Problem Statement**

Young people struggle with personal financial management and long-term
planning. Traditional financial institutions have low trust and poor
engagement with this generation.  
Outbehaving addresses this by delivering an **intelligent, emotionally
aware, and gamified platform** that makes money management simple,
relevant, and rewarding.

**Objectives**

- Demonstrate the holistic Outbehaving experience across *Goals*,
  *Profile*, *News*, *Ownership*, and *Dashboard* modules.

- Showcase real user flows that simulate micro-saving, learning, and
  reward earning.

- Provide a complete, testable experience for early user validation and
  champion engagement.

**Prototype Scope**

The prototype focuses on **five modules**:

1.  **Dashboard** --- unified hub for all user information

2.  **User Profile** --- captures personal, financial, and interest data

3.  **Goals** --- micro-saving pots for personal objectives

4.  **News** --- curated educational and lifestyle content

5.  **Ownership** --- engagement metrics, rewards, and membership levels

**Functional Requirements by Screen**

**1. Dashboard**

**Purpose:** Central hub summarizing user's goals, account status,
ownership progress, and news.  
**Key Components:**

- Greeting header with logo and avatar

- Goals summary (top 3)

- Accounts summary (mock total + credit score)

- News highlights (latest 2 articles)

- Ownership snapshot (tier + progress + rewards)

- Fixed bottom navigation bar

**2. User Profile**

**Purpose:** Collects personal and financial information to personalize
insights.  
**Fields:**

- Name, email, DOB, address

- Connected accounts (mocked via Supabase)

- Interests (chips for selection)

- Favourite champions (select from curated list)  
  **CTA:** "Save Changes" button

**3. Goals (Micro-savings)**

**Purpose:** Create, configure, and track saving pots.  
**Features:**

- Create new goal ("Pot")

- Progress bar or ring for each goal

- Key fields: pot name, description, target amount, frequency, due date,
  linked account

- Goal detail view for tracking and editing

**4. News**

**Purpose:** Deliver relevant content based on user's profile and
preferences.  
**Features:**

- Tabs for *Favourites* and *Popular*

- Article cards with thumbnail, title, source tag

- Click-through to article (web overlay or external link)

**5. Ownership**

**Purpose:** Showcase engagement and reward progress.  
**Features:**

- Membership level display

- Progress bar or ring

- Engagement metrics (Referrals, Articles read, Days active)

- Reward catalogue (mocked list)

**Data Model (Supabase Mock Schema)**

| **Table**    | **Fields**                                                          |
|--------------|---------------------------------------------------------------------|
| users        | id, name, email, dob, address, avatar_url                           |
| accounts     | id, user_id, bank_name, balance, credit_score                       |
| goals        | id, user_id, name, target_amount, saved_amount, frequency, due_date |
| articles     | id, title, summary, url, champion, category                         |
| rewards      | id, name, description, points_required, image_url                   |
| user_rewards | id, user_id, reward_id, redeemed (bool)                             |

**Technical Requirements**

| **Aspect**            | **Spec**                                   |
|-----------------------|--------------------------------------------|
| Architecture          | React (mobile-first web app or hybrid PWA) |
| Backend               | Supabase (mock data)                       |
| Design Framework      | Tailwind + Shadcn UI components            |
| Database Connectivity | Simulated; no live APIs                    |
| Hosting               | Vercel / Netlify for test prototype        |
| Auth                  | Mock email sign-in                         |
| Device Target         | Mobile (375--768px)                        |

**Validation Plan**

**Testing Methods:**

- 1:1 usability sessions

- Surveys on trust, clarity, and motivation

- Observation of navigation behavior

**Validation Hypotheses:**

- Young users feel more confident in managing goals.

- They find AI-based insights useful and trustworthy.

- They engage with the gamified "ownership" model.


