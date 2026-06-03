/*
  # Separate Futures and CFD Prop Firms Architecture

  1. New Tables
    - `futures_prop_firms` - Futures-specific prop firms (NQ, ES, CL, Micro futures)
      - `id` (uuid, primary key)
      - `name` (text) - Firm name
      - `slug` (text, unique) - URL-friendly identifier
      - `logo` (text) - Logo/abbreviation
      - `tagline` (text) - Short description
      - `description` (text) - Full description
      - `website_url` (text) - Official website
      - `evaluation_cost` (numeric) - Challenge/evaluation fee
      - `starting_balance` (numeric) - Initial account balance
      - `max_drawdown` (numeric) - Max drawdown percentage
      - `daily_drawdown` (numeric) - Daily loss limit
      - `payout_split` (numeric) - Trader payout percentage
      - `payout_frequency` (text) - Daily/Weekly/On-demand
      - `platform` (text) - Trading platform used
      - `supports_scalping` (boolean) - Allow scalping
      - `supports_news_trading` (boolean) - Allow news trading
      - `min_holding_time` (text) - Minimum hold time
      - `affiliate_link` (text) - Tracking link
      - `featured` (boolean) - Featured status
      - `rating` (numeric) - Average rating
      - `review_count` (integer) - Number of reviews
      - `created_at` (timestamp)

    - `cfd_prop_firms` - CFD-specific prop firms (Forex, Gold, Indices, Crypto)
      - `id` (uuid, primary key)
      - `name` (text) - Firm name
      - `slug` (text, unique) - URL-friendly identifier
      - `logo` (text) - Logo/abbreviation
      - `tagline` (text) - Short description
      - `description` (text) - Full description
      - `website_url` (text) - Official website
      - `challenge_cost` (numeric) - Challenge cost
      - `profit_split` (numeric) - Profit split percentage
      - `max_drawdown` (numeric) - Account drawdown limit
      - `daily_loss_limit` (numeric) - Daily loss limit
      - `leverage` (text) - Max leverage offered
      - `platform` (text) - Trading platform
      - `supports_forex` (boolean) - Forex available
      - `supports_gold` (boolean) - Gold/Metals available
      - `supports_indices` (boolean) - Indices available
      - `supports_crypto` (boolean) - Crypto available
      - `affiliate_link` (text) - Tracking link
      - `featured` (boolean) - Featured status
      - `rating` (numeric) - Average rating
      - `review_count` (integer) - Number of reviews
      - `created_at` (timestamp)

    - `futures_reviews` - Reviews for futures firms
      - `id` (uuid, primary key)
      - `futures_firm_id` (uuid, foreign key)
      - `user_name` (text)
      - `rating` (numeric, 1-5)
      - `title` (text)
      - `content` (text)
      - `traded_contracts` (text) - Which contracts they traded
      - `verified_trader` (boolean)
      - `helpful_count` (integer)
      - `created_at` (timestamp)

    - `cfd_reviews` - Reviews for CFD firms
      - `id` (uuid, primary key)
      - `cfd_firm_id` (uuid, foreign key)
      - `user_name` (text)
      - `rating` (numeric, 1-5)
      - `title` (text)
      - `content` (text)
      - `traded_instruments` (text) - Which instruments (Forex/Gold/etc)
      - `verified_trader` (boolean)
      - `helpful_count` (integer)
      - `created_at` (timestamp)

    - `futures_education_guides` - Futures trading education
      - `id` (uuid, primary key)
      - `title` (text)
      - `slug` (text, unique)
      - `category` (text) - CME Futures / NQ Trading / ES Trading / Risk Management / Margin Concepts
      - `content` (text)
      - `excerpt` (text)
      - `difficulty` (text) - Beginner/Intermediate/Advanced
      - `read_time_minutes` (integer)
      - `featured` (boolean)
      - `view_count` (integer)
      - `created_at` (timestamp)

    - `cfd_education_guides` - CFD trading education
      - `id` (uuid, primary key)
      - `title` (text)
      - `slug` (text, unique)
      - `category` (text) - Forex / Gold / Indices / Risk Management / Leverage Concepts
      - `content` (text)
      - `excerpt` (text)
      - `difficulty` (text)
      - `read_time_minutes` (integer)
      - `featured` (boolean)
      - `view_count` (integer)
      - `created_at` (timestamp)

    - `comparison_pairs` - Predefined comparison pairs
      - `id` (uuid, primary key)
      - `type` (text) - 'futures' or 'cfd'
      - `firm_1_id` (uuid)
      - `firm_2_id` (uuid)
      - `comparison_slug` (text, unique)
      - `title` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Public read access for all firm and review tables
    - Public read for education guides

  3. Indexes
    - futures_prop_firms: slug (unique), featured, rating
    - cfd_prop_firms: slug (unique), featured, rating
    - futures_education_guides: slug (unique), category
    - cfd_education_guides: slug (unique), category
*/

-- Futures Prop Firms Table
CREATE TABLE IF NOT EXISTS futures_prop_firms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  logo text,
  tagline text,
  description text NOT NULL,
  website_url text,
  evaluation_cost numeric NOT NULL,
  starting_balance numeric NOT NULL,
  max_drawdown numeric NOT NULL,
  daily_drawdown numeric,
  payout_split numeric DEFAULT 80,
  payout_frequency text DEFAULT 'daily',
  platform text,
  supports_scalping boolean DEFAULT true,
  supports_news_trading boolean DEFAULT false,
  min_holding_time text,
  affiliate_link text,
  featured boolean DEFAULT false,
  rating numeric DEFAULT 0,
  review_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- CFD Prop Firms Table
CREATE TABLE IF NOT EXISTS cfd_prop_firms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  logo text,
  tagline text,
  description text NOT NULL,
  website_url text,
  challenge_cost numeric NOT NULL,
  profit_split numeric NOT NULL,
  max_drawdown numeric NOT NULL,
  daily_loss_limit numeric,
  leverage text,
  platform text,
  supports_forex boolean DEFAULT true,
  supports_gold boolean DEFAULT true,
  supports_indices boolean DEFAULT true,
  supports_crypto boolean DEFAULT false,
  affiliate_link text,
  featured boolean DEFAULT false,
  rating numeric DEFAULT 0,
  review_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Futures Reviews Table
CREATE TABLE IF NOT EXISTS futures_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  futures_firm_id uuid NOT NULL REFERENCES futures_prop_firms(id) ON DELETE CASCADE,
  user_name text NOT NULL,
  rating numeric NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title text NOT NULL,
  content text NOT NULL,
  traded_contracts text,
  verified_trader boolean DEFAULT false,
  helpful_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- CFD Reviews Table
CREATE TABLE IF NOT EXISTS cfd_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  cfd_firm_id uuid NOT NULL REFERENCES cfd_prop_firms(id) ON DELETE CASCADE,
  user_name text NOT NULL,
  rating numeric NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title text NOT NULL,
  content text NOT NULL,
  traded_instruments text,
  verified_trader boolean DEFAULT false,
  helpful_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Futures Education Guides Table
CREATE TABLE IF NOT EXISTS futures_education_guides (
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
  created_at timestamptz DEFAULT now()
);

-- CFD Education Guides Table
CREATE TABLE IF NOT EXISTS cfd_education_guides (
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
  created_at timestamptz DEFAULT now()
);

-- Comparison Pairs Table
CREATE TABLE IF NOT EXISTS comparison_pairs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL CHECK (type IN ('futures', 'cfd')),
  firm_1_id uuid NOT NULL,
  firm_2_id uuid NOT NULL,
  comparison_slug text UNIQUE NOT NULL,
  title text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE futures_prop_firms ENABLE ROW LEVEL SECURITY;
ALTER TABLE cfd_prop_firms ENABLE ROW LEVEL SECURITY;
ALTER TABLE futures_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE cfd_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE futures_education_guides ENABLE ROW LEVEL SECURITY;
ALTER TABLE cfd_education_guides ENABLE ROW LEVEL SECURITY;
ALTER TABLE comparison_pairs ENABLE ROW LEVEL SECURITY;

-- RLS Policies - Public Read
CREATE POLICY "Futures firms are public"
  ON futures_prop_firms FOR SELECT
  USING (true);

CREATE POLICY "CFD firms are public"
  ON cfd_prop_firms FOR SELECT
  USING (true);

CREATE POLICY "Futures reviews are public"
  ON futures_reviews FOR SELECT
  USING (true);

CREATE POLICY "CFD reviews are public"
  ON cfd_reviews FOR SELECT
  USING (true);

CREATE POLICY "Futures guides are public"
  ON futures_education_guides FOR SELECT
  USING (true);

CREATE POLICY "CFD guides are public"
  ON cfd_education_guides FOR SELECT
  USING (true);

CREATE POLICY "Comparisons are public"
  ON comparison_pairs FOR SELECT
  USING (true);

-- Indexes
CREATE INDEX IF NOT EXISTS futures_firms_slug ON futures_prop_firms(slug);
CREATE INDEX IF NOT EXISTS futures_firms_featured ON futures_prop_firms(featured);
CREATE INDEX IF NOT EXISTS futures_firms_rating ON futures_prop_firms(rating DESC);
CREATE INDEX IF NOT EXISTS cfd_firms_slug ON cfd_prop_firms(slug);
CREATE INDEX IF NOT EXISTS cfd_firms_featured ON cfd_prop_firms(featured);
CREATE INDEX IF NOT EXISTS cfd_firms_rating ON cfd_prop_firms(rating DESC);
CREATE INDEX IF NOT EXISTS futures_guides_slug ON futures_education_guides(slug);
CREATE INDEX IF NOT EXISTS futures_guides_category ON futures_education_guides(category);
CREATE INDEX IF NOT EXISTS cfd_guides_slug ON cfd_education_guides(slug);
CREATE INDEX IF NOT EXISTS cfd_guides_category ON cfd_education_guides(category);
CREATE INDEX IF NOT EXISTS futures_reviews_firm_id ON futures_reviews(futures_firm_id);
CREATE INDEX IF NOT EXISTS cfd_reviews_firm_id ON cfd_reviews(cfd_firm_id);
