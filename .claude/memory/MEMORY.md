# Claude Memory

## Claude.ai Project Organization (Completed 2026-02-05)

### 17 Projects Created/Organized
Mirrored ChatGPT folder structure into Claude.ai projects:

| Project | Instructions | Chats | Source |
|---------|-------------|-------|--------|
| HTI | Business Dev role + meeting template | 20+ | Pre-existing + ChatGPT export |
| HOA | Longleaf Estates homeowner support | 6 | ChatGPT export |
| Dogs | Care guide (Lucky, Rocky, Maggie, Josie) | 1 | ChatGPT export |
| Medical | SEDc medical history | 3 | Gemini export |
| Leavn | Bible-study web app | 86+ | Pre-existing |
| Swingenuity | Golf app | 1 | Pre-existing |
| Uniquely You! | Salon | 4 | Pre-existing |
| 212 RDU | Referral network | 0 | Pre-existing |
| WSM | Will Sigmon Media | 1 | New |
| LPA | Convention/events | 4 | New |
| Blaze & Will | Personal | 1 | New |
| Will & AO | Personal | 0 | New |
| Insurance | Insurance | 0 | New |
| ZW | Personal | 0 | New |
| Flora | Plants/garden | 0 | New |
| The Freds | Personal | 0 | New |
| Catalyst Connections | Research/admin | 0 | New |

### Data Sources Processed
- **Gemini Export**: 3 gems found (HUBZone Web, Medical, HTI) - Medical instructions ported
- **ChatGPT Export**: 6,744 conversations, 614MB - 3 custom GPT instructions extracted (Dogs, HOA, HTI)
- Extracted instructions saved to: `/Users/wsig/Downloads/GPT Export/EXTRACTED_CUSTOM_GPT_INSTRUCTIONS.txt`

### Key Contacts (from project instructions)
- HOA: Danielle Lyons, Charleston Management - dlyons@charlestonmanagement.com, (919) 847-3003
- HTI: Mark Williams (ED), Ron Taylor (Ops), Rachel Taylor (Marketing)

## Sigmachines (Renamed 2026-02-08)

Collective name for Will's device fleet. All renamed with `sig` prefix.

| Name | Old Name | Type | LAN IP | Tailscale IP | Role |
|------|----------|------|--------|--------------|------|
| **sigstudio** | studio | M4 Max (macOS) | — | 100.123.115.31 | Primary dev machine |
| **sigserve** | Sigserve (2) | M2 Max (macOS) | 192.168.1.158 | — | Bot server (OpenClaw + BlueBubbles) |
| **sigair** | Wills-MBA | MacBook Air (macOS) | — | — | Laptop |
| **sigtower** | Tower | UNRAID (Linux) | 192.168.1.139 | 100.119.19.61 | Media/Docker server |
| **sigpc** | vt-pc | Windows desktop | — | 100.124.63.99 | Office workstation |

### sigtower (UNRAID) Details
- **Appdata:** /mnt/user/appdata/
- **Subnet router:** `unraid-docker` (100.111.139.106)

### sigserve Details
- **OpenClaw:** v2026.2.6-3 (BlueBubbles bridge)
- **Bot Apple ID:** clawdbot.wsig@gmail.com
- **Channels:** Telegram, BlueBubbles (iMessage), Slack

## Tailscale Architecture (Updated 2026-02-08)

**Current approach:** Subnet routing via `unraid-docker` container. Individual sidecars ABANDONED.

## Smart Home - See memory/smarthome.md for details
