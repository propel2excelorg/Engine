import { json, type LoaderFunctionArgs } from '@remix-run/node';

import { getCityDetails } from '@engine/core/location';

import { ensureUserAuthenticated } from '@/shared/session.server';

export async function loader({ params, request }: LoaderFunctionArgs) {
  await ensureUserAuthenticated(request);

  const details = await getCityDetails(params.id as string);

  return json(details);
}
