import {
  type ActionFunctionArgs,
  json,
  type LoaderFunctionArgs,
  redirect,
} from '@remix-run/node';
import { useActionData } from '@remix-run/react';

import { addActivity } from '@engine/core/gamification';
import { CreateActivityInput } from '@engine/core/gamification/types';
import { ActivityForm } from '@engine/core/gamification/ui';
import { getErrors, Modal, validateForm } from '@engine/ui';

import { Route } from '@/shared/constants';
import {
  commitSession,
  ensureUserAuthenticated,
  toast,
} from '@/shared/session.server';

export async function loader({ request }: LoaderFunctionArgs) {
  await ensureUserAuthenticated(request);

  return json({});
}

export async function action({ request }: ActionFunctionArgs) {
  const session = await ensureUserAuthenticated(request);

  const { data, errors, ok } = await validateForm(request, CreateActivityInput);

  if (!ok) {
    return json({ errors }, { status: 400 });
  }

  await addActivity(data);

  toast(session, {
    message: 'Added a new activity.',
  });

  return redirect(Route['/gamification/activities'], {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  });
}

export default function AddActivity() {
  const { error, errors } = getErrors(useActionData<typeof action>());

  return (
    <Modal onCloseTo={Route['/gamification/activities']}>
      <Modal.Header>
        <Modal.Title>Add Activity</Modal.Title>
        <Modal.CloseButton />
      </Modal.Header>

      <ActivityForm error={error} errors={errors} />
    </Modal>
  );
}
