/*
  # Seed Futures and CFD Prop Firm Data

  1. Futures Prop Firms
  2. CFD Prop Firms
  3. Sample Reviews for each category
  4. Education guides for each market type
  5. Predefined Comparison Pairs
*/

-- Insert Futures Prop Firms
INSERT INTO futures_prop_firms (name, slug, logo, tagline, description, website_url, evaluation_cost, starting_balance, max_drawdown, daily_drawdown, payout_split, payout_frequency, platform, supports_scalping, supports_news_trading, affiliate_link, featured, rating, review_count)
VALUES
  ('Apex Trader Funding', 'apex-trader', 'ATF', 'Trade Futures with Capital', 'Professional futures prop firm focused on NQ, ES, and micro futures. Low evaluation cost with daily payouts and scalping-friendly rules.', 'https://apextrader.com', 99, 25000, 8, 5, 80, 'daily', 'NinjaTrader/ThinkOrSwim', true, true, 'https://apextrader.com?ref=drtrader', true, 4.7, 156),
  ('Topstep Trader', 'topstep', 'TS', 'Futures Education & Funding', 'Complete futures trading platform with education, evaluation, and live funding. Ideal for traders learning contract specifications and risk management.', 'https://topsteptrader.com', 299, 20000, 10, 4, 85, 'on-demand', 'Topstep Platform', true, false, 'https://topsteptrader.com?ref=drlt', true, 4.5, 98),
  ('Take Profit Trader', 'take-profit', 'TPT', 'Micro Futures Specialist', 'Specializes in micro contracts (MES, MNQ). Low capital requirements with tight risk management. Perfect for beginning futures traders.', 'https://takeprofittrader.com', 49, 5000, 5, 3, 75, 'daily', 'NinjaTrader', true, true, 'https://takeprofittrader.com?ref=dr', true, 4.6, 112),
  ('Tradeify', 'tradeify', 'TF', 'Advanced Futures Platform', 'Professional-grade futures prop firm for experienced traders. Supports full contract range with high payout splits and instant withdrawals.', 'https://tradeify.com', 249, 50000, 12, 6, 90, 'daily', 'NinjaTrader/ThinkOrSwim', true, true, 'https://tradeify.com?ref=drl', false, 4.8, 87),
  ('Elite Trader Funding', 'elite-trader', 'ETF', 'Premium Futures Funding', 'Elite-tier prop firm for serious futures traders. Highest payout splits and fastest withdrawal times in the industry.', 'https://elitefundtrader.com', 199, 75000, 10, 5, 95, 'daily', 'NinjaTrader', true, true, 'https://elitefundtrader.com?ref=dr', false, 4.9, 64);

-- Insert CFD Prop Firms
INSERT INTO cfd_prop_firms (name, slug, logo, tagline, description, website_url, challenge_cost, profit_split, max_drawdown, daily_loss_limit, leverage, platform, supports_forex, supports_gold, supports_indices, supports_crypto, affiliate_link, featured, rating, review_count)
VALUES
  ('FTMO', 'ftmo', 'FTMO', 'Europe''s Leading CFD Prop Firm', 'Largest prop firm globally with flexible trading rules. Support for Forex, Metals, Indices, and Crypto CFDs with industry-leading service.', 'https://ftmo.com', 155, 80, 10, 5, '30:1', 'MetaTrader 4/5', true, true, true, true, 'https://ftmo.com?ref=drtrader', true, 4.8, 234),
  ('FundedNext', 'fundednext', 'FN', 'Rapid CFD Prop Firm Funding', 'Modern prop firm with express program for quick funding. Competitive profit splits with support for all major CFD instruments.', 'https://fundednext.com', 249, 90, 8, 4, '20:1', 'MetaTrader 4/5', true, true, true, false, 'https://fundednext.com?ref=drl', true, 4.7, 178),
  ('E8 Markets', 'e8-markets', 'E8', 'Performance-Based CFD Funding', 'Focuses on trader performance with instant payouts. Lower fees and flexible rules for all CFD trading styles.', 'https://e8markets.com', 99, 85, 10, 5, '25:1', 'MetaTrader 5', true, true, true, false, 'https://e8markets.com?ref=drtrader', true, 4.6, 142),
  ('Blue Guardian', 'blue-guardian', 'BG', 'Professional CFD Funding', 'Professional prop firm with institutional-grade execution. Support for advanced trading on all CFD instruments.', 'https://blueguardian.com', 199, 80, 12, 6, '30:1', 'MetaTrader 4/5', true, true, true, true, 'https://blueguardian.com?ref=dr', false, 4.5, 89),
  ('Alpha Capital Group', 'alpha-capital', 'ACG', 'Crypto-Friendly CFD Prop Firm', 'Specializes in crypto CFD trading with flexible rules. Also supports traditional CFD instruments with high payout splits.', 'https://alphacapitalgroup.com', 299, 75, 15, 7, '10:1', 'MetaTrader 4/5', true, true, true, true, 'https://alphacapitalgroup.com?ref=drl', false, 4.4, 67);

-- Insert Futures Reviews
INSERT INTO futures_reviews (futures_firm_id, user_name, rating, title, content, traded_contracts, verified_trader)
SELECT id, 'James Chen', 5, 'Best Futures Prop Firm', 'Apex has the best execution for scalping NQ and ES. Daily payouts are instant and the rules are trader-friendly. Highly recommend.', 'NQ, ES', true FROM futures_prop_firms WHERE slug = 'apex-trader'
UNION ALL
SELECT id, 'Sarah Miller', 4, 'Great Education', 'Topstep helped me understand futures margin and contract specifications. Evaluation was fair and payout was on schedule.', 'ES, MES', true FROM futures_prop_firms WHERE slug = 'topstep'
UNION ALL
SELECT id, 'Marcus Davis', 5, 'Perfect for Micro Contracts', 'Take Profit Trader is perfect if you''re just starting with futures. MES trading is so smooth here. Highly satisfied.', 'MES, MNQ', true FROM futures_prop_firms WHERE slug = 'take-profit'
UNION ALL
SELECT id, 'Alex Thompson', 5, 'Professional Grade', 'Tradeify offers the tools and payouts of a professional shop. Best for serious traders wanting 90% splits.', 'NQ, ES, CL', true FROM futures_prop_firms WHERE slug = 'tradeify';

-- Insert CFD Reviews
INSERT INTO cfd_reviews (cfd_firm_id, user_name, rating, title, content, traded_instruments, verified_trader)
SELECT id, 'Emma Wilson', 5, 'Best Overall CFD Broker', 'FTMO is reliable, fast, and professional. Forex trading is smooth and spreads are competitive. Been with them for 2 years.', 'EUR/USD, GBP/USD, Gold', true FROM cfd_prop_firms WHERE slug = 'ftmo'
UNION ALL
SELECT id, 'Raj Patel', 4, 'Fast Funding Process', 'FundedNext approved me in 48 hours. Trading all CFD instruments is smooth. Only minor complaint is sometimes spikes on GBP/JPY.', 'Forex, Indices', true FROM cfd_prop_firms WHERE slug = 'fundednext'
UNION ALL
SELECT id, 'Lisa Johnson', 5, 'Instant Payouts are Amazing', 'E8 Markets delivers on their promise. Instant payouts mean I can withdraw daily earnings. Awesome experience.', 'Gold, Silver, Oil', true FROM cfd_prop_firms WHERE slug = 'e8-markets';

-- Insert Futures Education Guides
INSERT INTO futures_education_guides (title, slug, category, content, excerpt, difficulty, read_time_minutes, featured)
VALUES
  ('Understanding CME Micro Contracts', 'cme-micro-contracts', 'CME Futures', 'Learn about MES (Micro E-mini S&P 500) and MNQ (Micro E-mini Nasdaq). These are perfect for learning futures without massive capital.', 'Start your futures journey with micro contracts.', 'beginner', 8, true),
  ('NQ Trading Strategies', 'nq-trading-strategies', 'NQ Trading', 'Nasdaq (NQ) requires understanding tech sector moves. Learn to trade around FOMC announcements and tech earnings.', 'Master the tech-heavy Nasdaq 100 contract.', 'intermediate', 12, true),
  ('ES (E-mini S&P 500) Mastery', 'es-mastery', 'ES Trading', 'The most liquid futures contract. Learn support/resistance on the 5-min and daily charts. Essential for day traders.', 'Trade the most liquid index futures contract.', 'intermediate', 10, true),
  ('Futures Margin and Risk Management', 'futures-margin-management', 'Risk Management', 'Futures use margin differently than forex. Learn initial margin, maintenance margin, and daily settlement rules.', 'Protect your account with proper margin management.', 'beginner', 7, true),
  ('Contract Specifications and Multipliers', 'contract-specifications', 'Margin Concepts', 'Each futures contract has a multiplier. $1 point move = $50 on ES, $20 on MES. Understand this to calculate risk correctly.', 'Calculate your risk properly with contract multipliers.', 'beginner', 6, false);

-- Insert CFD Education Guides
INSERT INTO cfd_education_guides (title, slug, category, content, excerpt, difficulty, read_time_minutes, featured)
VALUES
  ('Forex Pair Correlations', 'forex-correlations', 'Forex', 'Not all forex pairs move independently. Learn strong correlations like EUR/USD vs GBP/USD to avoid over-leverage risk.', 'Understand forex pair relationships for better risk management.', 'intermediate', 9, true),
  ('Gold Trading Fundamentals', 'gold-trading-101', 'Gold', 'Gold (XAU/USD) moves with USD strength and geopolitical events. Learn to trade this safe-haven asset effectively.', 'Master gold trading during risk-off periods.', 'intermediate', 11, true),
  ('Stock Indices (DAX, FTSE, CAC)', 'indices-trading', 'Indices', 'European indices have different trading hours and volatility. Learn session times and how to trade them profitably.', 'Trade global stock indices with confidence.', 'intermediate', 10, true),
  ('Leverage and Margin in CFD Trading', 'cfd-leverage-explained', 'Leverage Concepts', 'CFD leverage can be 1:20 to 1:30. Higher leverage = higher risk. Learn position sizing with leverage to preserve capital.', 'Use leverage safely in CFD trading.', 'beginner', 8, true),
  ('CFD Risk Management', 'cfd-risk-management', 'Risk Management', 'CFDs can liquidate quickly with high leverage. Learn stop losses, position sizing, and daily loss limits.', 'Protect your CFD account from catastrophic losses.', 'beginner', 7, false);

-- Insert Comparison Pairs
INSERT INTO comparison_pairs (type, firm_1_id, firm_2_id, comparison_slug, title)
SELECT 'futures', f1.id, f2.id, 'apex-vs-topstep', 'Apex Trader vs Topstep: Which Futures Prop Firm Wins?'
FROM futures_prop_firms f1, futures_prop_firms f2
WHERE f1.slug = 'apex-trader' AND f2.slug = 'topstep'
UNION ALL
SELECT 'futures', f1.id, f2.id, 'topstep-vs-take-profit', 'Topstep vs Take Profit Trader: Full Comparison'
FROM futures_prop_firms f1, futures_prop_firms f2
WHERE f1.slug = 'topstep' AND f2.slug = 'take-profit'
UNION ALL
SELECT 'cfd', c1.id, c2.id, 'ftmo-vs-fundednext', 'FTMO vs FundedNext: Best CFD Prop Firm?'
FROM cfd_prop_firms c1, cfd_prop_firms c2
WHERE c1.slug = 'ftmo' AND c2.slug = 'fundednext'
UNION ALL
SELECT 'cfd', c1.id, c2.id, 'e8-vs-ftmo', 'E8 Markets vs FTMO: Detailed CFD Comparison'
FROM cfd_prop_firms c1, cfd_prop_firms c2
WHERE c1.slug = 'e8-markets' AND c2.slug = 'ftmo';
