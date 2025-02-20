import { json } from '@remix-run/node';
import { Outlet } from '@remix-run/react';

import { Login, Public } from '@engine/ui';

export async function loader() {
  return json({});
}

export default function LoginLayout() {
  return (
    <Public.Content>
      <Login.Title>Propel2Excel Profile</Login.Title>
      <Outlet />
    </Public.Content>
  );
}
