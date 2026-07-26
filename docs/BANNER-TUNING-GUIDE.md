# Banner Tuning Guide

Banner crop and overlay controls live in:

```text
css/banner-tuning.css
```

This file was created so a visual adjustment does not require searching through the primary application styles.

## Move the artwork

Find the page class, such as:

```css
.module-banner.is-duaa-sleep-banner {
  --banner-position-desktop: center center;
  --banner-position-tablet: 62% center;
  --banner-position-mobile: 72% center;
}
```

The first percentage controls horizontal positioning. A larger percentage reveals more of the left side of the artwork; a smaller percentage reveals more of the right side. Each device range may be tuned independently.

## Brighten or darken an overlay

Find the alpha variables for the banner:

```css
--overlay-start-alpha: .56;
--overlay-middle-alpha: .44;
--overlay-soft-alpha: .21;
--overlay-edge-alpha: .035;
```

Lower values reveal more of the image. Higher values make the overlay stronger. Start with a change of `.05`, save, and reload the page. Values must remain between `0` and `1`.

## Safe workflow

1. Change one value at a time.
2. Reload the page and check the banner.
3. Check both a wide desktop window and a narrow mobile window.
4. Keep the title and description readable.
5. Confirm the page-specific subject remains visible.

The artwork files and the main `app-shell.css` file normally do not need to be touched for a simple crop or opacity adjustment.
