import { type ActionFunctionArgs, json } from '@remix-run/node';

import { track } from '@engine/core/mixpanel';
import { CreateTagInput } from '@engine/core/resources';
import { createTag } from '@engine/core/resources/server';
import { validateForm } from '@engine/ui';

import { ensureUserAuthenticated, user } from '@/shared/session.server';

export async function action({ request }: ActionFunctionArgs) {
  const session = await ensureUserAuthenticated(request);

  const { data, ok } = await validateForm(request, CreateTagInput);

  if (!ok) {
    return json({}, { status: 400 });
  }

  await createTag({
    id: data.id,
    name: data.name,
  });

  track({
    event: 'Resource Tag Added',
    properties: undefined,
    request,
    user: user(session),
  });

  return json({});
}
