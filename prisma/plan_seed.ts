import { PrismaLibSql } from '@prisma/adapter-libsql'
import { PrismaClient } from '../app/generated/prisma/client'
import path from 'path'

const dbPath = path.resolve(process.cwd(), 'prisma/dev.db')
const adapter = new PrismaLibSql({ url: `file:${dbPath}` })
const prisma = new PrismaClient({ adapter })

function monday(offsetWeeks = 0): Date {
  const d = new Date()
  const day = d.getDay()
  const diff = day === 0 ? -6 : 1 - day
  d.setDate(d.getDate() + diff + offsetWeeks * 7)
  d.setHours(8, 0, 0, 0)
  return d
}

function dayOf(baseMonday: Date, dayOffset: number): Date {
  const d = new Date(baseMonday)
  d.setDate(d.getDate() + dayOffset)
  return d
}

async function main() {
  const mon = monday(0)

  const tasks: Array<{
    title: string
    priority: 'HIGH' | 'MEDIUM' | 'LOW'
    date: Date | null
    spontaneous: boolean
  }> = [
    // ── Tydzień startowy ──────────────────────────────────────────
    {
      title: 'Załóż konta TikTok / IG / YT / LinkedIn — spójny handle @imienazwisko.ai',
      priority: 'HIGH',
      date: dayOf(mon, 0),
      spontaneous: false,
    },
    {
      title: 'Nagraj pierwszy short: "Cześć, jestem X, oto co tu robię przez rok" — surowy, autentyczny',
      priority: 'HIGH',
      date: dayOf(mon, 0),
      spontaneous: false,
    },
    {
      title: 'Playlist n8n — Leon van Zyl na YT. Zbuduj: Webhook → ChatGPT → Gmail. Nagraj. Wrzuć short.',
      priority: 'HIGH',
      date: dayOf(mon, 1),
      spontaneous: false,
    },
    {
      title: 'Wybierz JEDNĄ niszę outreach (fizjoterapeuci / agencje / restauracje w Lublinie)',
      priority: 'HIGH',
      date: dayOf(mon, 2),
      spontaneous: false,
    },
    {
      title: 'Zrób listę 50 firm w niszy w Notion/Excel',
      priority: 'MEDIUM',
      date: dayOf(mon, 2),
      spontaneous: false,
    },
    {
      title: 'Zbuduj demo: bot odpowiadający na zapytania z formularza WWW. Case study. Nagraj short.',
      priority: 'HIGH',
      date: dayOf(mon, 3),
      spontaneous: false,
    },
    {
      title: 'Pierwszy długi post LinkedIn — historia + plan. "Mam 19 lat, oto mój plan na rok. Dokumentuję."',
      priority: 'HIGH',
      date: dayOf(mon, 4),
      spontaneous: false,
    },
    {
      title: 'Otwórz konto demo TradingView (paper trading, free). Szkic aplikacji tradingowej w notatniku.',
      priority: 'MEDIUM',
      date: dayOf(mon, 5),
      spontaneous: false,
    },
    {
      title: 'Review tygodnia: co działało? co nie? plan na następny',
      priority: 'MEDIUM',
      date: dayOf(mon, 6),
      spontaneous: false,
    },

    // ── Tydzień 1 (nast. tydzień) — Fundamenty AI automation ─────
    {
      title: '[T1] Kurs n8n — Leon van Zyl YT (2h dziennie przez tydzień)',
      priority: 'HIGH',
      date: dayOf(monday(1), 0),
      spontaneous: false,
    },
    {
      title: '[T1] Make.com — Nick Saraev, Cole Medin (1h dziennie)',
      priority: 'MEDIUM',
      date: dayOf(monday(1), 0),
      spontaneous: false,
    },
    {
      title: '[T1] OpenAI API + Claude API — wysyłanie requestów, prompty, koszty',
      priority: 'HIGH',
      date: dayOf(monday(1), 1),
      spontaneous: false,
    },
    {
      title: '[T1] Codziennie 1 short o tym czego się nauczyłeś (przez cały tydzień)',
      priority: 'MEDIUM',
      date: dayOf(monday(1), 0),
      spontaneous: false,
    },

    // ── Tydzień 2 — Portfolio projekty ───────────────────────────
    {
      title: '[T2] Projekt 1: AI bot odpowiadający na maile/DMy dla restauracji → godziny, ceny, Calendly',
      priority: 'HIGH',
      date: dayOf(monday(2), 0),
      spontaneous: false,
    },
    {
      title: '[T2] Projekt 2: Lead generation system — scrap LinkedIn/Apollo, AI personalizuje, Instantly/Lemlist',
      priority: 'HIGH',
      date: dayOf(monday(2), 2),
      spontaneous: false,
    },
    {
      title: '[T2] Projekt 3: Content repurposing pipeline — 1 film → 10 shortsów + opisy + hashtagi',
      priority: 'HIGH',
      date: dayOf(monday(2), 4),
      spontaneous: false,
    },
    {
      title: '[T2] Każdy projekt = case study video (3-5 min) + post LinkedIn',
      priority: 'MEDIUM',
      date: dayOf(monday(2), 6),
      spontaneous: false,
    },

    // ── Tydzień 3 — Outreach ──────────────────────────────────────
    {
      title: '[T3] Codziennie 20 spersonalizowanych wiadomości (LinkedIn + IG + cold email)',
      priority: 'HIGH',
      date: dayOf(monday(3), 0),
      spontaneous: false,
    },
    {
      title: '[T3] Codziennie 1 telefon — darmowy audyt automatyzacji (skrypt w planie)',
      priority: 'HIGH',
      date: dayOf(monday(3), 0),
      spontaneous: false,
    },
    {
      title: '[T3] Pierwsi 2-3 klientów za 500-1500 zł dla referencji',
      priority: 'MEDIUM',
      date: dayOf(monday(3), 4),
      spontaneous: false,
    },

    // ── Tydzień 4 — Trading + content ────────────────────────────
    {
      title: '[T4] ICT (Inner Circle Trader) na YT — 1h dziennie + journaling każdego trade',
      priority: 'MEDIUM',
      date: dayOf(monday(4), 0),
      spontaneous: false,
    },
    {
      title: '[T4] 30 shortsów wrzuconych do końca miesiąca — cel: reps, nie viral',
      priority: 'MEDIUM',
      date: dayOf(monday(4), 6),
      spontaneous: false,
    },

    // ── Spontaniczne — zasady i setup ────────────────────────────
    {
      title: 'Setup: n8n self-hosted na VPS (Hetzner ~20 zł/mc)',
      priority: 'MEDIUM',
      date: null,
      spontaneous: true,
    },
    {
      title: 'Setup: kup domenę + email firmowy (Google Workspace)',
      priority: 'MEDIUM',
      date: null,
      spontaneous: true,
    },
    {
      title: 'Setup: mikrofon — Maono PD200X lub używany Rode',
      priority: 'LOW',
      date: null,
      spontaneous: true,
    },
    {
      title: 'Setup: OpenAI API + Claude API — kredyty na testy (300 zł)',
      priority: 'MEDIUM',
      date: null,
      spontaneous: true,
    },
    {
      title: 'Zasada: TikTok max 30 min/dzień — ustaw timer/limit w telefonie',
      priority: 'HIGH',
      date: null,
      spontaneous: true,
    },
    {
      title: 'Zasada: sport 4x/tydzień — zaplanuj dni w kalendarzu',
      priority: 'HIGH',
      date: null,
      spontaneous: true,
    },
    {
      title: 'Zasada: codzienny journaling 10 min wieczorem (co zrobiłem / czego się nauczyłem / co dalej)',
      priority: 'HIGH',
      date: null,
      spontaneous: true,
    },
    {
      title: 'W Notion notuj KAŻDĄ rzecz, która Cię wkurza w tradingu → przyszła feature lista app',
      priority: 'LOW',
      date: null,
      spontaneous: true,
    },
  ]

  for (const t of tasks) {
    await prisma.task.create({ data: t })
  }

  console.log(`Dodano ${tasks.length} zadań z planu rozwoju`)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
