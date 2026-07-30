# Duaa Content and Study Resource Data Standard

## Purpose

This standard keeps evidence citations, virtues, and optional Study Resources consistent across the Duaa module.

## Evidence sources

Evidence belongs in the shared `js/data/source-library.js` file and is connected to a duaa through `sourceIds`.

```js
{
  id: "sahih-al-bukhari-6306",
  citation: "Sahih al-Bukhari 6306",
  url: "https://sunnah.com/bukhari:6306",
  verificationStatus: "verified",
  grade: "Sahih",
  type: "Hadith or traditional source"
}
```

Each duaa may retain a short display citation in `source` and structured summary fields in `sourceDetails`.

## Virtue or benefit citations

A virtue belongs in the duaa item as a `virtue` object. Its `sourceIds` must point to entries in the shared source library.

```js
virtue: {
  text: "Concise, source-grounded benefit text.",
  sourceIds: ["sahih-al-bukhari-6323"]
}
```

Do not place primary evidence or hadith citations in the Study Resource library merely to make them display. Evidence and Study Resources serve different purposes.

## Study Resources

Study Resources belong in `js/data/resource-library.js` and are connected to a duaa through `resourceIds`.

### Required fields

```js
{
  id: "unique-resource-id",
  type: "article",
  title: "Resource title",
  url: "https://example.com/resource"
}
```

### Supported types

- `audio`
- `video`
- `article`
- `book`
- `tweet`
- `telegram`

### Recommended optional fields

```js
{
  author: "Author or scholar",
  speaker: "Speaker",
  source: "Publisher or website",
  duration: "18 min",
  language: "English",
  description: "Why this resource is relevant",
  topics: ["repentance", "morning adhkar"],
  verificationStatus: "reviewed"
}
```

Use `author` for written resources and `speaker` for audio or video. The renderer may show a subset of this metadata today; retaining it supports future Study Library improvements.

## Verification flags

The flags inside each duaa item describe different review tasks and should not be switched on together automatically.

- `verified`: the complete entry has passed the intended content review.
- `arabicChecked`: the Arabic wording has been checked.
- `translationChecked`: the translation has been checked.
- `resourcesAdded`: at least one genuine Study Resource has been added.

Adding a citation link alone does not make `resourcesAdded` true and does not verify the Arabic or translation.
