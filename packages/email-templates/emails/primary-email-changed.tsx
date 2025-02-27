import React from 'react';

import { Email } from './components/email';
import { type EmailTemplateData } from '../src/types';

export function PrimaryEmailChangedEmail({
  firstName,
  newEmail,
  previousEmail,
}: EmailTemplateData<'primary-email-changed'>) {
  return (
    <Email.Template>
      <Email.Preview>
        Heads up - your Propel2Excel primary email changed!
      </Email.Preview>

      <Email.Main>
        <Email.Text>Hi {firstName},</Email.Text>

        <Email.Text>
          Your Propel2Excel primary email has changed from <b>{previousEmail}</b>{' '}
          to <b>{newEmail}</b>. A couple notes on this change:
        </Email.Text>

        <ul>
          <li>
            <Email.Text>
              You can expect future weekly newsletters to be sent to{' '}
              <b>{newEmail}</b>.
            </Email.Text>
          </li>

          <li>
            <Email.Text>
              We've also updated your Slack account to use <b>{newEmail}</b>, so
              you should see an email from Slack notifying you of this update.
            </Email.Text>
          </li>
        </ul>

        <Email.Text>
          If you didn't request this change, please email us at{' '}
          <Email.Link href="mailto:membership@Propel2Excel.org">
            membership@Propel2Excel.org
          </Email.Link>
          .
        </Email.Text>

        <Email.Signature />
      </Email.Main>
    </Email.Template>
  );
}

export default PrimaryEmailChangedEmail;
