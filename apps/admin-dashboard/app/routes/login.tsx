import { json, type LoaderFunctionArgs, redirect } from '@remix-run/node';
import { Outlet } from '@remix-run/react';

import { Login, Public } from '@engine/ui';

import { Route } from '@/shared/constants';
import { getAuthenticationStatus, getSession } from '@/shared/session.server';

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request);

  const { authenticated } = await getAuthenticationStatus(session);

  if (authenticated) {
    return redirect(Route['/']);
  }

  return json({});
}

export default function LoginLayout() {
  return (
    <Public.Layout>
      <Public.Content>
        <Login.Title>Propel2Excel Admin Dashboard</Login.Title>
        <Outlet />
      </Public.Content>
    </Public.Layout>
  );
}
