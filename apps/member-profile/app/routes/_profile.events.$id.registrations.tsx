import { json, type LoaderFunctionArgs } from '@remix-run/node';
import { generatePath, Link, useLoaderData } from '@remix-run/react';

import { listEventRegistrations } from '@engine/core/events/registrations';
import { type Student } from '@engine/types';
import { Modal, ProfilePicture } from '@engine/ui';

import { Route } from '@/shared/constants';

export async function loader({ params }: LoaderFunctionArgs) {
  const registrations = await listEventRegistrations(params.id as string);

  return json({
    registrations,
  });
}

export default function EventRegistrationsPage() {
  const { registrations } = useLoaderData<typeof loader>();

  return (
    <Modal onCloseTo={Route['/events']}>
      <Modal.Header>
        <Modal.Title>Guest List ({registrations.length})</Modal.Title>
        <Modal.CloseButton />
      </Modal.Header>

      <ul className="flex flex-col">
        {registrations.map((registration) => {
          return (
            <li key={registration.id}>
              <RegistrationItem
                firstName={registration.firstName || ''}
                lastName={registration.lastName || ''}
                id={registration.id || ''}
                profilePicture={registration.profilePicture}
              />
            </li>
          );
        })}
      </ul>
    </Modal>
  );
}

type RegistrationItemProps = Pick<
  Student,
  'firstName' | 'id' | 'lastName' | 'profilePicture'
>;

function RegistrationItem({
  firstName,
  id,
  lastName,
  profilePicture,
}: RegistrationItemProps) {
  return (
    <Link
      className="line-clamp-1 grid grid-cols-[3rem_1fr] items-center gap-2 rounded-2xl p-2 hover:bg-gray-100"
      to={generatePath(Route['/directory/:id'], { id })}
    >
      <ProfilePicture
        initials={firstName[0] + lastName[0]}
        src={profilePicture || undefined}
      />
      <span>
        {firstName} {lastName}
      </span>
    </Link>
  );
}
