/*
  # Futures Trading Education Platform Schema

  1. New Tables
    - `prop_firms` - Trading prop firms directory
      - `id` (uuid, primary key)
      - `name` (text) - Firm name
      - `slug` (text, unique) - URL-friendly identifier
      - `logo` (text) - Logo image URL
      - `tagline` (text) - Short description
      - `description` (text) - Full description
      - `website_url` (text) - Official website
      - `activation_fee` (numeric) - Account activation cost
      - `starting_balance` (numeric) - Initial account size
      - `max_drawdown` (numeric) - Maximum percentage drawdown allowed
      - `daily_loss_limit` (numeric) - Daily loss limit percentage
      - `payout_split` (numeric) - Trader payout percentage (0-100)
      - `min_days_to_payout` (integer) - Minimum days before withdrawal
      - `featured` (boolean) - Display in featured section
      - `rating` (numeric) - Average rating (0-5)
      - `review_count` (integer) - Number of reviews
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `prop_firm_reviews` - User reviews and experiences
      - `id` (uuid, primary key)
      - `prop_firm_id` (uuid, foreign key to prop_firms)
      - `user_name` (text) - Reviewer name
      - `rating` (numeric) - Review rating (1-5)
      - `title` (text) - Review title
      - `content` (text) - Review body
      - `experience_level` (text) - User's trading experience
      - `verified_trader` (boolean) - Whether user is verified
      - `helpful_count` (integer) - Number of helpful votes
      - `created_at` (timestamp)

    - `trading_guides` - Educational content
      - `id` (uuid, primary key)
      - `title` (text) - Guide title
      - `slug` (text, unique) - URL-friendly identifier
      - `category` (text) - Guide category
      - `content` (text) - Full guide content
      - `excerpt` (text) - Short preview
      - `difficulty` (text) - Beginner/Intermediate/Advanced
      - `read_time_minutes` (integer) - Estimated read time
      - `featured` (boolean) - Display in featured section
      - `view_count` (integer) - Number of views
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `trading_tools` - Calculators and utilities
      - `id` (uuid, primary key)
      - `name` (text) - Tool name
      - `slug` (text, unique) - URL-friendly identifier
      - `description` (text) - What the tool does
      - `tool_type` (text) - position_size/drawdown/payout/risk_reward/tick_value
      - `formula` (text) - Mathematical formula used
      - `created_at` (timestamp)

    - `faqs` - Frequently asked questions
      - `id` (uuid, primary key)
      - `question` (text) - FAQ question
      - `answer` (text) - FAQ answer
      - `category` (text) - Question category
      - `helpful_count` (integer) - Helpful votes
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `coupon_codes` - Affiliate and discount codes
      - `id` (uuid, primary key)
      - `prop_firm_id` (uuid, foreign key) - Associated firm
      - `code` (text, unique) - Coupon code
      - `discount_percentage` (numeric) - Discount amount
      - `description` (text) - What discount applies to
      - `affiliate_link` (text) - Tracking/affiliate URL
      - `active` (boolean) - Whether code is active
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Public read access for prop_firms, guides, tools, faqs, coupons
    - Public read for reviews (reviews are public but creation is restricted)

  3. Indexes
    - prop_firms: slug (unique), featured
    - trading_guides: slug (unique), category, difficulty
    - trading_tools: slug (unique), tool_type
    - faqs: category
*/

-- Prop Firms Table
CREATE TABLE IF NOT EXISTS prop_firms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  logo text,
  tagline text,
  description text NOT NULL,
  website_url text,
  activation_fee numeric DEFAULT 0,
  starting_balance numeric NOT NULL,
  max_drawdown numeric NOT NULL,
  daily_loss_limit numeric,
  payout_split numeric DEFAULT 80,
  min_days_to_payout integer DEFAULT 0,
  featured boolean DEFAULT false,
  rating numeric DEFAULT 0,
  review_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Prop Firm Reviews Table
CREATE TABLE IF NOT EXISTS prop_firm_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  prop_firm_id uuid NOT NULL REFERENCES prop_firms(id) ON DELETE CASCADE,
  user_name text NOT NULL,
  rating numeric NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title text NOT NULL,
  content text NOT NULL,
  experience_level text DEFAULT 'intermediate',
  verified_trader boolean DEFAULT false,
  helpful_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Trading Guides Table
CREATE TABLE IF NOT EXISTS trading_guides (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  category text NOT NULL,
  content text NOT NULL,
  excerpt text,
  difficulty text DEFAULT 'intermediate',
  read_time_minutes integer DEFAULT 5,
  featured boolean DEFAULT false,
  view_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Trading Tools Table
CREATE TABLE IF NOT EXISTS trading_tools (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text NOT NULL,
  tool_type text NOT NULL,
  formula text,
  created_at timestamptz DEFAULT now()
);

-- FAQs Table
CREATE TABLE IF NOT EXISTS faqs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question text NOT NULL,
  answer text NOT NULL,
  category text NOT NULL,
  helpful_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Coupon Codes Table
CREATE TABLE IF NOT EXISTS coupon_codes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  prop_firm_id uuid REFERENCES prop_firms(id) ON DELETE CASCADE,
  code text UNIQUE NOT NULL,
  discount_percentage numeric DEFAULT 0,
  description text,
  affiliate_link text,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE prop_firms ENABLE ROW LEVEL SECURITY;
ALTER TABLE prop_firm_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE trading_guides ENABLE ROW LEVEL SECURITY;
ALTER TABLE trading_tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE coupon_codes ENABLE ROW LEVEL SECURITY;

-- RLS Policies - Public Read Access
CREATE POLICY "Prop firms are public"
  ON prop_firms FOR SELECT
  USING (true);

CREATE POLICY "Reviews are public"
  ON prop_firm_reviews FOR SELECT
  USING (true);

CREATE POLICY "Guides are public"
  ON trading_guides FOR SELECT
  USING (true);

CREATE POLICY "Tools are public"
  ON trading_tools FOR SELECT
  USING (true);

CREATE POLICY "FAQs are public"
  ON faqs FOR SELECT
  USING (true);

CREATE POLICY "Coupons are public"
  ON coupon_codes FOR SELECT
  USING (true);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS prop_firms_slug ON prop_firms(slug);
CREATE INDEX IF NOT EXISTS prop_firms_featured ON prop_firms(featured);
CREATE INDEX IF NOT EXISTS guides_slug ON trading_guides(slug);
CREATE INDEX IF NOT EXISTS guides_category ON trading_guides(category);
CREATE INDEX IF NOT EXISTS guides_difficulty ON trading_guides(difficulty);
CREATE INDEX IF NOT EXISTS tools_slug ON trading_tools(slug);
CREATE INDEX IF NOT EXISTS tools_type ON trading_tools(tool_type);
CREATE INDEX IF NOT EXISTS faqs_category ON faqs(category);
CREATE INDEX IF NOT EXISTS reviews_firm_id ON prop_firm_reviews(prop_firm_id);
