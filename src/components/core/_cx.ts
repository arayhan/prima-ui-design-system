// Shared className joiner — lets consumers layer Tailwind (or any) utility
// classes onto a component's root element alongside any internal class the
// component itself needs (e.g. Marquee's keyframe hook, RichText's prose
// scope). NOT exported from the library barrel — internal like _field.tsx.
export function cx(...classes: Array<string | false | undefined | null>): string | undefined {
  const joined = classes.filter(Boolean).join(' ');
  return joined || undefined;
}
