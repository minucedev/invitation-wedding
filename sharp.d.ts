// sharp ships its own type declarations, but TypeScript's "bundler" module
// resolution can't locate them through sharp's package.json "exports" map
// (TS7016), which breaks `next build`'s type-check. We only call
// sharp().metadata() at build time in components/Gallery.tsx, so a loose
// module declaration is enough to satisfy the compiler.
declare module "sharp";
