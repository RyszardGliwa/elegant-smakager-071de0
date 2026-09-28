# AFTERDARK project guide

## Architecture

This is a TanStack Start application deployed through Netlify. The public experience is a single editorial landing page; stateful interactions are intentionally local because this version is a self-contained product surface with demonstration content.

## Key files

- `src/routes/index.tsx` contains the landing page, curated events and artists, player state, city filter, newsletter response, and booking dialog.
- `src/routes/__root.tsx` owns document metadata and the application shell.
- `src/styles.css` contains the full visual system, responsive layouts, motion, and component states.
- `src/router.tsx` configures TanStack Router.
- `netlify.toml` and `vite.config.ts` configure deployment and framework integration.

## Conventions

- Keep route components in `src/routes` and use file-based routing.
- Use React hooks for transient interface state.
- Preserve the editorial visual language: warm paper, near-black, acid chartreuse, rust accents, Syne display type, and DM Mono metadata.
- Keep motion transform- and opacity-based, and retain reduced-motion handling.
- Maintain keyboard-accessible labels and visible semantic form controls.
- Use Netlify platform primitives before adding persistence. Structured records belong in Netlify Database; uploaded media belongs in Netlify Blobs.

## Product decisions

The record artwork and artist portraits are code-native compositions, avoiding fragile external image dependencies. The radio player demonstrates playback progress but does not stream an audio asset. Event and artist data is currently colocated at the top of the landing route so it can be extracted cleanly when a content backend is added.
