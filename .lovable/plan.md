# Vacanza frontend plan

## Product experience
- Build a polished light interface centered on live vacancy freshness, with green for vacant, red for full, and amber for stale listings.
- Add responsive shared navigation, mobile bottom navigation, subtle motion, toasts, empty/loading states, and accessible controls.

## Pages
- Home: map-led hero, renter/owner calls to action, value strip, and renter/owner three-step workflows.
- Find a Home: interactive search, mock filters, prioritized property results, and desktop/mobile map views.
- Property details: prominent live status, gallery, rent and features, amenities, map, owner actions, and save interaction.
- Owner dashboard: summary counts and property cards with shared interactive VACANT/FULL updates.
- Add property: complete mock form, image uploader, location panel, availability selector, and live preview.
- Property management: editable fields, photo/location/status controls, deletion confirmation, and status confirmation modal.
- Saved properties: saved listing grid with a polished empty state.
- About and How It Works: focused supporting pages matching the navigation.

## Shared frontend behavior
- Create at least eight realistic mock properties across Haldia, Kolkata, Midnapore, and Durgapur.
- Keep property status and saved state in a React context so owner changes immediately appear in renter results and details.
- Make map markers selectable, filters update visible results/counts, forms and contact actions provide feedback, and mobile map access work.

## Technical details
- Use TanStack Router route files, React 19, TypeScript, Tailwind CSS v4 semantic tokens, Lucide icons, and existing UI primitives.
- Add a small motion library only if needed; otherwise use performant CSS transitions and entry animations.
- Give every content route unique title, description, Open Graph, and Twitter metadata.
- Verify compilation, runtime rendering, key interactions, and desktop/mobile layouts.
