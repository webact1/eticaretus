export function isCampaignActive(settings: { campaignEnabled: boolean; campaignEndsAt: Date | null }) {
  if (!settings.campaignEnabled || !settings.campaignEndsAt) return false;
  return settings.campaignEndsAt.getTime() > Date.now();
}
