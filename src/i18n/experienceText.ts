import type { TFunction } from 'i18next';
import type { MarketExperience } from '@/mocks/marketplace';

export const experienceName = (exp: MarketExperience, t: TFunction): string =>
  exp.nameKey ? t(exp.nameKey) : exp.name;

export const experienceLocation = (exp: MarketExperience, t: TFunction): string =>
  exp.locationKey ? t(exp.locationKey) : exp.location;