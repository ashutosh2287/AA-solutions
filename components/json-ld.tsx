type JsonLdData = Record<string, unknown> | readonly Record<string, unknown>[];

/**
 * Renders JSON-LD structured data.
 * `<` is escaped to avoid breaking out of the script element.
 */
export function JsonLd({ data }: { data: JsonLdData }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
