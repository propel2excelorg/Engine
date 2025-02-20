import { defer, type LoaderFunctionArgs } from '@remix-run/node';
import { Await, useLoaderData } from '@remix-run/react';
import { Suspense } from 'react';

import { getengineContributorStats } from '@engine/core/github';
import { Modal, Spinner, Text } from '@engine/ui';

import { Route } from '@/shared/constants';
import { ensureUserAuthenticated } from '@/shared/session.server';

export async function loader({ request }: LoaderFunctionArgs) {
  await ensureUserAuthenticated(request);

  const statsPromise = getengineContributorStats();

  return defer({
    statsPromise,
  });
}

export default function engineContributorsModal() {
  const { statsPromise } = useLoaderData<typeof loader>();

  return (
    <Modal onCloseTo={Route['/']}>
      <Modal.Header>
        <Modal.Title>engine (GitHub) Contributions</Modal.Title>
        <Modal.CloseButton />
      </Modal.Header>

      <Suspense fallback={<LoadingState />}>
        <Await resolve={statsPromise}>
          {({
            totalContributors: total,
            uniqueContributorsChore: chore,
            uniqueContributorsDocs: docs,
            uniqueContributorsFeature: feature,
            uniqueContributorsFix: fix,
          }) => {
            return (
              <div className="flex flex-col gap-2">
                <Text>Unique Contributors (Chore): {chore}</Text>
                <Text>Unique Contributors (Docs): {docs}</Text>
                <Text>Unique Contributors (Feature): {feature}</Text>
                <Text>Unique Contributors (Fix): {fix}</Text>
                <Text>Total Contributors: {total}</Text>
              </div>
            );
          }}
        </Await>
      </Suspense>
    </Modal>
  );
}

function LoadingState() {
  return (
    <div className="flex items-center gap-2">
      <Spinner />

      <Text color="gray-500" variant="sm">
        Querying the GitHub API...
      </Text>
    </div>
  );
}
