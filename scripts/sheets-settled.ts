import type { Page } from "playwright-core";

/**
 * Resolves once no phone sheet is moving: none still rising, and no closed sheet's last frame
 * still dropping (src/lib/sheets.ts). A sheet rises over --dur-sheet, so a check that measures one
 * the moment it opens reads it short of where it comes to rest.
 */
export async function sheetsSettled(page: Page): Promise<void> {
  await page.waitForFunction(() => document.querySelector(".modal-scrim.is-leaving") === null
    && document.getAnimations().every((animation) => animation.playState !== "running"
      || !/^(?:sheet|scrim)-(?:in|out)$/.test((animation as CSSAnimation).animationName ?? "")), undefined, { timeout: 5_000 });
}
