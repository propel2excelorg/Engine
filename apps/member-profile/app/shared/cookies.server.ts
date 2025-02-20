import { createCookie } from '@remix-run/node';

import { Timezone } from '@engine/types';
import { getCookie } from '@engine/utils';

export const oneTimeCodeIdCookie = createCookie('oneTimeCodeId', {
  maxAge: 60 * 5,
});

/**
 * Used in the email addition flow...we want to keep track of the email address
 * that the user is trying to add to their account across routes.
 */
export const addEmailCookie = createCookie('add-email', {
  maxAge: 60 * 5,
});

export function getTimezone(request: Request) {
  const cookie = request.headers.get('Cookie');
  const timezone = getCookie(cookie || '', 'timezone');

  return Timezone.parse(timezone);
}
