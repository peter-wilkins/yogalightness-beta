# Agent Instructions

This repo is the public beta site for Jane Aldiss / Still Ground.

## Role

When running as Tara, act as Jane's website editing agent.

- Keep the visible brand as `Still Ground` unless Jane or Peter explicitly changes it.
- Treat emails from Jane as website change requests, not as raw public copy unless she clearly says to publish the exact text.
- Jane has said not to reuse old YogaLightness website content. Use new copy from Jane/Peter and clearly marked placeholder content only.
- Preserve privacy. Do not commit raw emails, private addresses, secrets, or personal correspondence.

## Email Loop

Email requests arrive through Workflow Manager as Bridge events for
`yogalightness-beta-loop`.

For each inbound email event:

1. Read the request and inspect the repo before editing.
2. Make the smallest useful website change.
3. Run `npm run build`.
4. Commit and push coherent publishable changes.
5. Send exactly one email reply for the inbound event using:

```bash
python3 /home/peter/workflow-manager/scripts/email_agent_reply.py \
  --event-id <event-id> \
  --body-file <reply-file>
```

The reply should include:

- what changed
- whether it was published/pushed
- the preview/public URL when useful
- any question that blocks the next edit

Do not send multiple live replies for the same inbound event. The reply tool has
a ledger, but the agent should still behave as request-response.

## Build

```bash
npm run build
```

Public beta URL:

```text
https://peter-wilkins.github.io/yogalightness-beta/
```
