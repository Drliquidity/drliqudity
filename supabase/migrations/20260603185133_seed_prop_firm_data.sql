/*
  # Seed Prop Firm Platform Data

  1. Initial Data
    - 5 featured prop firms
    - Sample reviews for each firm
    - Trading guides across 7 categories
    - 5 trading calculators
    - 10 FAQs
    - Coupon codes for each firm

  2. This provides enough content to populate the new review and education sections
*/

-- Insert Featured Prop Firms
INSERT INTO prop_firms (name, slug, logo, tagline, description, website_url, activation_fee, starting_balance, max_drawdown, daily_loss_limit, payout_split, min_days_to_payout, featured, rating, review_count)
VALUES
  ('APEX Trader Funding', 'apex-trader', 'A', 'Trade your way to financial freedom', 'APEX Trader Funding offers funded trading accounts with top-tier execution and advanced trading tools. Join thousands of successful traders.', 'https://apextrader.com', 99, 25000, 8, 5, 80, 0, true, 4.7, 156),
  ('TopStep Trader', 'topstep', 'T', 'Complete trader education and funding', 'TopStep combines education with funded accounts. Get mentoring, advanced analytics, and a direct path to proprietary firm funding.', 'https://topsteptrader.com', 299, 20000, 10, 4, 85, 14, true, 4.5, 98),
  ('E8 Funding', 'e8-funding', 'E8', 'Performance-based prop firm funding', 'E8 Funding prioritizes trader performance with flexible rules and rapid payout cycles. Low fees, high splits, and instant withdrawals available.', 'https://e8funding.com', 0, 30000, 7, 3, 90, 0, true, 4.8, 124),
  ('The5ers', 'the5ers', '5R', 'Global trading community and funding', 'The5ers offers diverse account sizes and flexible trading rules with a supportive international trading community.', 'https://the5ers.com', 250, 15000, 12, 6, 75, 7, false, 4.3, 67),
  ('FundedTrader', 'fundedtrader', 'FT', 'Fast funding, flexible trading', 'FundedTrader provides quick account activation, daily payouts, and some of the most relaxed trading rules in the industry.', 'https://fundedtrader.com', 149, 10000, 10, 5, 80, 0, true, 4.6, 112);

-- Insert Sample Reviews
INSERT INTO prop_firm_reviews (prop_firm_id, user_name, rating, title, content, experience_level, verified_trader)
SELECT id, 'Michael Chen', 5, 'Best execution I''ve experienced', 'APEX has been a game changer for my trading. The execution speed is unmatched and the support team is responsive. Highly recommend.', 'advanced', true FROM prop_firms WHERE slug = 'apex-trader'
UNION ALL
SELECT id, 'Sarah Williams', 4, 'Great education but pricey', 'TopStep''s educational content is top-notch and really helped me improve. The funding is good too, but the initial cost is steep.', 'intermediate', true FROM prop_firms WHERE slug = 'topstep'
UNION ALL
SELECT id, 'James Rodriguez', 5, 'Instant payouts are amazing', 'E8 Funding delivers on their promise. Withdrawals are instant and the rules are trader-friendly. Best split in the business.', 'advanced', true FROM prop_firms WHERE slug = 'e8-funding'
UNION ALL
SELECT id, 'Emma Davis', 4, 'Good community support', 'The5ers has a really helpful community. The trading rules are flexible which I appreciate. Just wish withdrawals were faster.', 'intermediate', false FROM prop_firms WHERE slug = 'the5ers'
UNION ALL
SELECT id, 'Alex Thompson', 5, 'Fast approval and daily payouts', 'FundedTrader processed my account in 24 hours. Daily payout option is perfect for my strategy. No complaints so far.', 'intermediate', true FROM prop_firms WHERE slug = 'fundedtrader';

-- Insert Trading Guides
INSERT INTO trading_guides (title, slug, category, content, excerpt, difficulty, read_time_minutes, featured)
VALUES
  ('Understanding Market Liquidity', 'understanding-market-liquidity', 'Liquidity', 'Market liquidity determines how easily you can enter and exit trades. Learn to identify liquid pairs and avoid slippage issues.', 'Discover how to trade liquid assets and avoid costly slippage.', 'beginner', 8, true),
  ('Order Blocks Explained', 'order-blocks-explained', 'Order Blocks', 'Order blocks are accumulation areas where institutions have traded. Learn to identify and trade these high-probability setups.', 'Master the art of finding institutional trading zones.', 'intermediate', 12, true),
  ('Market Structure Fundamentals', 'market-structure-fundamentals', 'Market Structure', 'Support and resistance levels are crucial. Understand how price creates structure and how to trade with the trend.', 'Build your foundation on market structure trading.', 'beginner', 10, true),
  ('ICT Concepts for Modern Traders', 'ict-concepts', 'ICT', 'Inner Circle Trading strategies decoded. Learn the concepts that professional traders use daily.', 'Unlock professional trading concepts used by top traders.', 'advanced', 20, true),
  ('Position Sizing and Risk', 'position-sizing-risk', 'Risk Management', 'Proper position sizing protects your account. Calculate your positions based on risk percentage, not gut feeling.', 'Protect your account with proper position management.', 'beginner', 7, true),
  ('Trading Psychology Mastery', 'trading-psychology', 'Psychology', 'Psychology is 90% of trading success. Learn to manage emotions and build a winning mindset.', 'Develop the mental discipline of professional traders.', 'intermediate', 15, true),
  ('Path to Funded Trading Success', 'funded-trading-path', 'Funded Trading', 'Getting funded requires a plan. Follow our roadmap to passing funded challenges and making consistent income.', 'Your complete roadmap to prop firm success.', 'intermediate', 13, false),
  ('Advanced Risk Reward Ratios', 'advanced-risk-reward', 'Risk Management', 'Risk-reward ratios determine your long-term profitability. Learn to calculate and optimize your trades.', 'Master risk-reward calculations for consistent profits.', 'intermediate', 9, false),
  ('Reading Order Flow', 'reading-order-flow', 'Market Structure', 'Order flow shows what institutions are doing. Learn to read market depth and volume profiles.', 'See what professional traders see in the order flow.', 'advanced', 18, false),
  ('Emotional Trading Triggers', 'emotional-trading-triggers', 'Psychology', 'Identify your emotional triggers and learn techniques to override them. This is what separates winners from losers.', 'Break free from emotional trading patterns.', 'beginner', 6, false);

-- Insert Trading Tools
INSERT INTO trading_tools (name, slug, description, tool_type, formula)
VALUES
  ('Position Size Calculator', 'position-size-calc', 'Calculate optimal position size based on account risk', 'position_size', 'Position Size = (Account Balance × Risk %) / (Entry - Stop Loss)'),
  ('Maximum Drawdown Calculator', 'max-drawdown-calc', 'Calculate your account''s maximum drawdown threshold', 'drawdown', 'Max Drawdown Amount = Account Balance × Max Drawdown %'),
  ('Prop Firm Payout Calculator', 'payout-calc', 'Calculate your earnings based on firm payout splits', 'payout', 'Monthly Earnings = Net Profit × Payout Split %'),
  ('Risk Reward Ratio Tool', 'risk-reward-calc', 'Calculate and analyze your risk-reward ratios', 'risk_reward', 'Risk:Reward = Stop Loss Distance / Take Profit Distance'),
  ('Futures Tick Value Calculator', 'tick-value-calc', 'Calculate tick values for different futures contracts', 'tick_value', 'Tick Value = Tick Size × Contract Multiplier × Price');

-- Insert FAQs
INSERT INTO faqs (question, answer, category)
VALUES
  ('What is a prop firm?', 'A prop firm (proprietary firm) is a trading company that funds traders with capital to trade the markets. You trade their money and share the profits.', 'Prop Firms'),
  ('How much capital do I need to start?', 'Most prop firms offer accounts ranging from $5,000 to $100,000+. Starting capital depends on your goals and the firm''s offerings.', 'Funding'),
  ('Can I trade crypto with prop firm funding?', 'Most traditional prop firms focus on forex, futures, and stocks. Some newer firms offer crypto accounts. Check individual firm policies.', 'Trading Rules'),
  ('How long does payout take?', 'Payout times vary. Some firms offer instant daily payouts, others require 7-14 days. Check your firm''s terms.', 'Payouts'),
  ('What is a drawdown limit?', 'A drawdown limit is the maximum percentage you can lose before your account is closed. It''s a risk management tool used by prop firms.', 'Risk Management'),
  ('Do I need experience to trade prop firm accounts?', 'No formal experience required, but you should have a trading plan and understand basic risk management before applying.', 'Getting Started'),
  ('What are the most traded instruments?', 'Forex (EUR/USD, GBP/USD), Stock Indices (ES, NQ), Futures (Oil, Gold), and some coins. Check your broker''s offerings.', 'Trading'),
  ('How do I pass a prop firm challenge?', 'Consistency is key. Follow the rules, manage risk properly, and trade your strategy without deviating based on emotions.', 'Challenges'),
  ('Can I lose money with prop firm funding?', 'Yes, you can lose the capital they fund up to your drawdown limit. This is why risk management is critical.', 'Risk'),
  ('What education should I get first?', 'Learn market structure, position sizing, risk management, and psychology before applying to any prop firm.', 'Learning');

-- Insert Coupon Codes
INSERT INTO coupon_codes (prop_firm_id, code, discount_percentage, description, affiliate_link, active)
SELECT id, 'DRTRADER20', 20, 'Account activation discount', 'https://apextrader.com?ref=drtrader', true FROM prop_firms WHERE slug = 'apex-trader'
UNION ALL
SELECT id, 'DRLIQUIDITY', 15, 'Education program discount', 'https://topsteptrader.com?ref=drliquidity', true FROM prop_firms WHERE slug = 'topstep'
UNION ALL
SELECT id, 'E8TRADER', 100, 'Free account activation', 'https://e8funding.com?ref=trader', true FROM prop_firms WHERE slug = 'e8-funding'
UNION ALL
SELECT id, 'THE5ERS20', 15, 'Account setup discount', 'https://the5ers.com?ref=drtrader', true FROM prop_firms WHERE slug = 'the5ers'
UNION ALL
SELECT id, 'FUNDEDPRO', 25, 'Subscription discount', 'https://fundedtrader.com?ref=drpro', true FROM prop_firms WHERE slug = 'fundedtrader';
