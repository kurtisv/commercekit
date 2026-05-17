# Portfolio Projects TODO

## Global objective

Build eight recruiter-ready projects from `kv-web-starter` to demonstrate that one boilerplate can produce distinct product categories: support, quotes, premium marketing, API/SaaS, booking, commerce, client portal, and event registration.

## Project backlog

- [x] SupportDesk Lite - support dashboard
- [x] QuotePilot - quote/business SaaS
- [x] Luma Studio - premium marketing website
- [x] API Meter - SaaS/API portal
- [x] ReserveFlow - booking system
- [x] CommerceKit - current commerce project
- [ ] ClientHub - client portal
- [ ] EventPass - event registration and check-in

## Current project: CommerceKit

### Planning

- [x] Copy cleanly from `kv-web-starter`
- [x] Exclude local `.env`, `.git`, `node_modules`, build output, and test DB helper
- [x] Create initial git branch workflow
- [x] Define commerce product direction
- [x] Preserve FR/EN as a baseline

### Product scope

- [x] Product catalog
- [x] Product detail page
- [x] Demo checkout
- [x] Order confirmation by public token
- [x] Operations dashboard
- [x] Orders list and order detail
- [x] Case study page for recruiters

### Data

- [x] Add `CommerceProduct`
- [x] Add `CommerceOrder`
- [x] Add `CommerceOrderItem`
- [x] Add `CommerceOrderStatus`
- [x] Add seed products
- [ ] Apply schema to shared Supabase `kv-portfolio`
- [ ] Seed production shared data

### Quality

- [ ] Run `pnpm install`
- [ ] Run `pnpm lint`
- [ ] Run `pnpm typecheck`
- [ ] Run `pnpm test`
- [ ] Run `pnpm build`
- [ ] Create public GitHub repo
- [ ] Deploy to Vercel
- [ ] Add live link to dev portfolio

## Progress log

- 2026-05-17: CommerceKit copied from the starter, initialized as a new repo, and foundation/product depth branch started.
