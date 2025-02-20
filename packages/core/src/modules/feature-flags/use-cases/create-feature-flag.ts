import { db } from '@engine/db';
import { id } from '@engine/utils';

import { type CreateFeatureFlagInput } from '@/modules/feature-flags/feature-flags.types';

export async function createFeatureFlag(input: CreateFeatureFlagInput) {
  const flag = await db
    .insertInto('featureFlags')
    .values({
      description: input.description,
      displayName: input.displayName,
      enabled: input.enabled,
      id: id(),
      name: input.name,
    })
    .returning(['name'])
    .executeTakeFirstOrThrow();

  return flag;
}
