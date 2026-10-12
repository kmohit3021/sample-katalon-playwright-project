import { Locator, Page } from '@playwright/test';

type LocatorFactory = () => Locator;

export class SelfHealingHelper {
  constructor(
    private readonly page: Page,
    private readonly perCandidateTimeoutMs = 1500,
  ) {}

  async fill(label: string, value: string, candidates: LocatorFactory[]): Promise<void> {
    const locator = await this.findFirstVisible(label, candidates);
    await locator.fill(value);
  }

  async click(label: string, candidates: LocatorFactory[]): Promise<void> {
    const locator = await this.findFirstVisible(label, candidates);
    await locator.click();
  }

  async getVisible(label: string, candidates: LocatorFactory[]): Promise<Locator> {
    return this.findFirstVisible(label, candidates);
  }

  private async findFirstVisible(label: string, candidates: LocatorFactory[]): Promise<Locator> {
    for (const createLocator of candidates) {
      const candidate = createLocator().first();
      try {
        await candidate.waitFor({
          state: 'visible',
          timeout: this.perCandidateTimeoutMs,
        });
        return candidate;
      } catch {
        // Continue trying fallbacks when the current candidate is not found.
      }
    }

    throw new Error(
      `Self-healing failed: could not locate a visible element for "${label}" with ${candidates.length} candidates.`,
    );
  }
}