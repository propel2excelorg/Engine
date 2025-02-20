import { createCookie } from '@remix-run/node';

import { Timezone } from '@engine/types';
import { getCookie } from '@engine/utils';

export const oneTimeCodeIdCookie = createCookie('one_time_code_id', {
  maxAge: 60 * 5,
});

export function getTimezone(request: Request) {
  const cookie = request.headers.get('Cookie');
  const timezone = getCookie(cookie || '', 'timezone');

  return Timezone.parse(timezone);
}
