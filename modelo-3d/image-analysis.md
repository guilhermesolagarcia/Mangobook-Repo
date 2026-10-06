# Image analysis: refs/teclado.png

Secondary views: refs/imagem-angulos-teclado.png. Build brief: refs/prompt-teclado-3d.md (layout and hidden interior are authored from the brief, not the image).

## Layer 1: Identification
- Work type: 75% mechanical keyboard, gasket-mount, CNC aluminum case. Broad class: mechanical part / consumer electronics. primaryDomain: object. Confidence 0.97.
- Complexity: complex (≈ 82 repeated keycaps + 82 switches, 9 macro assemblies, hidden interior).

## Layer 2: Form & silhouette
- Bounding volume: wedge-profile cuboid 325 × 135 mm footprint; height 20 mm front, 33 mm rear (≈ 6° top-plane incline). Rounded vertical corner edges (r ≈ 6 mm, top view).
- Symmetry: near-bilateral across the lateral axis; broken by the knob at rear-right and the 75% key cluster on the right.
- Shape language: geometric. Primitives: extruded rounded-rectangle profiles (case), rounded boxes (keycaps), cylinder (knob), thin cuboids (plate, PCB, foam).

## Layer 3: Macro → meso → micro
- Macro: top frame (moldura), bottom case (base), plate, PCB, foam, gaskets, switch array, keycap array, knob.
- Meso: keycap rows (6 rows, sculpted heights), switch modules (housing + stem), chamfer band on top frame, front accent inlay on bottom case, rear USB-C port, 4 rubber feet, 6 bottom screws, knob knurl band.
- Micro: concave keycap dish, keycap side draft, PCB sockets/chips, screw heads, knurl ridges.

## Layer 4: Spatial relationships
- <keycap, attached-to (socket), switch stem>
- <switch, embedded-in, plate cutout>; <switch pins, inserted-into, PCB socket>
- <gaskets, sandwiched-between, plate edge and top frame / bottom case>
- <PCB, above, foam>; <foam, inside, bottom case tray>
- <top frame, overlap/butt, bottom case> along a horizontal parting line
- <knob, attached-to, top frame> at rear-right; explodes with the top frame
- <front accent inlay, flush-with, bottom case front face>; <chamfer band, flush-with, top frame upper edge>

## Layer 5: Materials (PBR)
- Case (top + bottom): anodized aluminum, metalness 1, roughness ≈ 0.45, fine bead-blast relief (observed matte sheen with soft highlights).
- Chamfer band: polished aluminum, metalness 1, roughness ≈ 0.15 (observed bright specular line along top edge).
- Front inlay: blue anodized aluminum, metalness 1, roughness ≈ 0.4.
- Keycaps: PBT dielectric, metalness 0, roughness ≈ 0.7, opaque (observed flat diffuse response, no gloss).
- Knob: brushed aluminum, metalness 1, roughness ≈ 0.3, anisotropic-looking streaks (inference).
- Interior (plate aluminum, PCB, foam, gaskets): not visible; authored from construction convention.

## Layer 6: Color & finish
- Case: dark graphite, low value, desaturated cool (#45484d). Satin/anodized.
- Alpha keycaps: mid-value blue-grey (#5b6068). Modifiers: darker blue-grey (#3d4148). Matte.
- Accent: vivid blue, mid value (#2563EB) on Escape, Enter keycaps and front inlay.
- Knob: light silver (#c8cacd), brushed.

## Layer 7: Identity-defining features
- Polished chamfer line on the top frame front edge.
- Blue front inlay stripe on the bottom case.
- Blue Escape + blue Enter as the only colored keycaps.
- Silver knob at rear-right.
- Wedge side profile (6°).

## Layer 8: Uncertainty
- Key layout in the image is inconsistent (extra wide keys left, misplaced blue key on the Backspace row) → overridden by the authored 75% table in the brief.
- Side view in the multi-view sheet contradicts the other views → wedge from brief governs.
- Entire interior is hidden → authored from gasket-mount construction convention (flagged speculative).
- Output is a stylized-accurate reconstruction, not a measurement of a real product.
