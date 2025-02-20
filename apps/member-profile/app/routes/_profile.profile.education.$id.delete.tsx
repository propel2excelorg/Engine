import {
  type ActionFunctionArgs,
  json,
  type LoaderFunctionArgs,
  redirect,
} from '@remix-run/node';
import { Form, useActionData, useNavigate } from '@remix-run/react';

import { deleteEducation } from '@engine/core/member-profile/server';
import { type Education } from '@engine/core/member-profile/ui';
import { db } from '@engine/db';
import { Button, ErrorMessage, Modal } from '@engine/ui';

import { Route } from '@/shared/constants';
import {
  commitSession,
  ensureUserAuthenticated,
  toast,
  user,
} from '@/shared/session.server';

export async function loader({ params, request }: LoaderFunctionArgs) {
  const session = await ensureUserAuthenticated(request);

  const found = await isEducationFound({
    id: params.id as string,
    studentId: user(session),
  });

  if (!found) {
    throw new Response(null, { status: 404 });
  }

  return json({});
}

async function isEducationFound({
  id,
  studentId,
}: Pick<Education, 'id' | 'studentId'>) {
  const row = await db
    .selectFrom('educations')
    .select(['id'])
    .where('id', '=', id)
    .where('studentId', '=', studentId)
    .executeTakeFirst();

  return !!row;
}

export async function action({ params, request }: ActionFunctionArgs) {
  const session = await ensureUserAuthenticated(request);

  try {
    await deleteEducation({
      id: params.id as string,
      studentId: user(session),
    });

    toast(session, {
      message: 'Deleted education.',
    });

    return redirect(Route['/profile/education'], {
      headers: {
        'Set-Cookie': await commitSession(session),
      },
    });
  } catch (e) {
    return json({ error: (e as Error).message }, { status: 500 });
  }
}

export default function DeleteEducationPage() {
  const { error } = useActionData<typeof action>() || {};

  const navigate = useNavigate();

  function onBack() {
    navigate(-1);
  }

  return (
    <Modal onCloseTo={Route['/profile/education']}>
      <Modal.Header>
        <Modal.Title>Delete Education</Modal.Title>
        <Modal.CloseButton />
      </Modal.Header>

      <Modal.Description>
        Are you sure you want to delete this education?
      </Modal.Description>

      <Form className="form" method="post">
        <ErrorMessage>{error}</ErrorMessage>

        <Button.Group flexDirection="row-reverse">
          <Button color="error" type="submit" variant="secondary">
            Delete
          </Button>

          <Button onClick={onBack} type="button" variant="secondary">
            Back
          </Button>
        </Button.Group>
      </Form>
    </Modal>
  );
}

export function ErrorBoundary() {
  return <></>;
}
