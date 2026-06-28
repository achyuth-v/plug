// ============================================
// Supabase integration
// ============================================
// Manages drops, votes, and curator earnings. Reuse the Supabase client
// pattern from your Nook codebase.
//
// Suggested schema (run in Supabase SQL editor):
//
//   create table drops (
//     id uuid primary key default gen_random_uuid(),
//     curator_id uuid not null,
//     name text not null,
//     pitch text,
//     vibes text[] default '{}',
//     category text not null,
//     product_ids text[] not null,
//     week_number int,
//     created_at timestamptz default now()
//   );
//
//   create table votes (
//     drop_id uuid references drops(id) on delete cascade,
//     voter_id uuid not null,
//     created_at timestamptz default now(),
//     primary key (drop_id, voter_id)
//   );
//
//   create table orders (
//     id uuid primary key default gen_random_uuid(),
//     drop_id uuid references drops(id),
//     product_id text not null,
//     buyer_id uuid,
//     amount_cents int not null,
//     curator_payout_cents int not null,
//     stripe_payment_intent text,
//     created_at timestamptz default now()
//   );

import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Lazy client — only initializes when env vars are set
export const supabase = url && anonKey ? createClient(url, anonKey) : null;

/**
 * Deploy a drop to the arena.
 * @param {object} drop - the drop payload
 * @returns {Promise<object>} created drop row
 */
export async function deployDrop(drop) {
  if (!supabase) {
    console.warn('[supabase] no client — drop deploy is stubbed:', drop);
    return { id: 'stub-' + Date.now(), ...drop };
  }
  const { data, error } = await supabase
    .from('drops')
    .insert(drop)
    .select()
    .single();
  if (error) throw error;
  return data;
}

/**
 * Cast a vote for a drop. One vote per user per drop.
 */
export async function voteForDrop(dropId, voterId) {
  if (!supabase) return { ok: true, stub: true };
  const { error } = await supabase
    .from('votes')
    .insert({ drop_id: dropId, voter_id: voterId });
  if (error && error.code !== '23505') throw error; // ignore duplicate
  return { ok: true };
}
