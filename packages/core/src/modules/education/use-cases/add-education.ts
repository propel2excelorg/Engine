import { db } from '@engine/db';
import { id } from '@engine/utils';

import { job } from '@/infrastructure/bull';
import { checkMostRecentEducation } from './check-most-recent-education';
import { type AddEducationInput } from '../education.types';

export async function addEducation(input: AddEducationInput) {
  const educationId = id();

  await db
    .insertInto('educations')
    .values({
      degreeType: input.degreeType,
      endDate: input.endDate,
      id: educationId,
      major: input.major,
      otherMajor: input.otherMajor,
      otherSchool: input.otherSchool,
      schoolId: input.schoolId,
      startDate: input.startDate,
      studentId: input.studentId,
    })
    .execute();

  checkMostRecentEducation(input.studentId);

  job('gamification.activity.completed', {
    studentId: input.studentId,
    type: 'update_education_history',
  });
}
