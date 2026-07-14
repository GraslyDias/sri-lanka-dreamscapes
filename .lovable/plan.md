## Refactor Vaya Ceylon → Scalable Multi-Tour Luxury Platform

This is a large scope. I'll break it into phases you can approve incrementally. Phase 1 fixes the critical UX issues you called out and establishes the multi-tour foundation. Phases 2–4 layer on admin, quotations, invoicing, checkout, and email.

---

### Phase 1 — Public Platform Foundation (do first)

**Fixes to current build**
- Remove rounded/margined hero container → full-bleed edge-to-edge hero touching top of viewport.
- Rework header: truly transparent over hero, blur + solid on scroll, proper z-index, nav = Home / Tours / Destinations / About / Contact + "Plan My Trip" CTA.
- Replace "Start Private Consultation" primary CTA with **Explore Tours** → `/tours`.

**Tour data model (typed, single source of truth)**
- New `src/data/tours.ts` with a `Tour` type and 8 seeded packages (Beyond the Ordinary, Wellness Escape, Ultimate Wildlife, Southern Coast Discovery, Cultural Triangle, Luxury Honeymoon, Tea Country Retreat, Family Adventure).
- Each tour: slug, title, category (Luxury/Wellness/Wildlife/Honeymoon/Family/Adventure/Cultural), hero image, duration, destinations[], startingPrice, rating, shortDescription, longDescription, googleMapsEmbedUrl, inclusions[], exclusions[], itinerary[] (day, title, activities, meals, accommodation, image, notes), hotels[] (image, name, stars, location, amenities), activities[], gallery[], SEO fields.

**Homepage packages section**
- Replaces the current "Signature Journeys" block.
- Category filter chips (All / Luxury / Wellness / Wildlife / Honeymoon / Family / Adventure / Cultural).
- Responsive grid: 3 / 2 / 1 columns.
- Card: cover, title, duration, destination count, starting price, tour type badge, rating, short description, **View Tour** button → `/tours/$slug`.

**`/tours` listing page (new route `src/routes/tours.index.tsx`)**
- Search (title + destinations), category filter, sort (price asc/desc, duration, rating), grid/list toggle, client pagination.

**Dynamic tour detail — refactor existing `/tours/$slug`**
- Loader resolves slug against `tours.ts`; `notFound()` for unknown slugs.
- Hero banner: image, title, duration, destinations, starting price, Inquire CTA.
- Sticky right column with Google Maps route map (embed URL from tour data); on mobile map appears before itinerary.
- Sections: Inclusions (visual cards) + Not Included, Day-by-Day timeline, Accommodation cards, Activities grid, Gallery, Inquiry form (Travel Dates, Adults/Kids/Infants, Accommodation Type, Budget, Country, Email, Phone, Notes) with Zod validation.

**SEO**
- Per-tour `head()` with title, description, og:title/description/image (hero), twitter card.
- `/tours` head with listing metadata.

---

### Phase 2 — Admin Dashboard (after Phase 1 approved)

- Enable Lovable Cloud.
- Schema: `tours`, `tour_days`, `tour_hotels`, `tour_activities`, `tour_media`, `inquiries`, `customers`, `quotations`, `quotation_items`, `invoices` + `user_roles` (admin/staff) with `has_role()` security-definer + RLS.
- `/admin` route gated by `_authenticated` layout + admin role check.
- Overview cards: Total Tours, Active Tours, New Inquiries, Total Customers, Pending Quotations, Revenue.
- Tour Management CRUD (create/edit/delete/duplicate/archive), inline editors for images, route URL, destinations, inclusions/exclusions, itinerary, hotels, activities, SEO.
- Inquiry Management with status pipeline (New → Contacted → Quotation Sent → Confirmed → Cancelled).
- Customer Management view.

### Phase 3 — Quotations, Invoices, Checkout

- Quotation builder: unlimited line items (Hotel, Transport, Safari, Airport Transfer, Visa, Custom), auto totals, tax, discount.
- Invoice generation from quotation with unique invoice IDs.
- Public `/checkout/$invoiceId` page: review quotation, invoice summary, pay button (Lovable built-in Stripe payments).

### Phase 4 — Email Automation

- Lovable managed email (requires email domain setup — I'll prompt when we reach this phase).
- Branded templates for: quotation sent, invoice sent (with secure checkout button), inquiry received confirmation, payment received.

---

### Recommendation

Approve **Phase 1** now — it fixes every critical UX issue (hero, header, single-tour bug, multi-tour homepage, `/tours`, dynamic detail pages) and gives you a real browsable multi-tour platform. Phase 2+ requires enabling Lovable Cloud and is best done as a separate approved chunk so we don't ship a half-wired admin.

Reply **"Proceed with Phase 1"** to start, or tell me to adjust scope.
