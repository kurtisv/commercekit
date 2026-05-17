alter table if exists public."CommerceOrder"
  add column if not exists "flowId" text,
  add column if not exists "sourceApp" text,
  add column if not exists "sourceEventId" text,
  add column if not exists "projectId" text,
  add column if not exists "projectName" text,
  add column if not exists "contextJson" jsonb;

create index if not exists "CommerceOrder_flowId_idx" on public."CommerceOrder"("flowId");
