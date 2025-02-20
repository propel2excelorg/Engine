import React from 'react';

import { Email } from './components/email';
import { type EmailTemplateData } from '../src/types';

export function StudentAnniversaryEmail({
  firstName,
  years,
}: EmailTemplateData<'student-anniversary'>) {
  const yearLabel = years > 1 ? 'years' : 'year';

  return (
    <Email.Template>
      <Email.Preview>
        Congratulations on {years} {yearLabel} with Propel2Excel! 🎉
      </Email.Preview>

      <Email.Main>
        <Email.Text>Hello {firstName},</Email.Text>

        <Email.Text>
          Happy Propel2Excel-aversary! 🥳
          <br />
          <br />
          Over the past {years > 1 ? `${years} years` : 'year'}, you've shown
          unwavering support, talent, and passion. Your commitment to this
          community has truly made a difference. Thanks to members like you,
          Propel2Excel continues to thrive and empower individuals across tech.
          We're so grateful to have you as part of the Propel2Excel family!
          <br />
          <br />
          Here's to many more impactful years together! 🎉
        </Email.Text>

        <Email.Signature />
      </Email.Main>
    </Email.Template>
  );
}

export default StudentAnniversaryEmail;
