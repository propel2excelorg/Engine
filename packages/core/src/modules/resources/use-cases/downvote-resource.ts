import { db } from '@engine/db';

import { job } from '@/infrastructure/bull';
import { type DownvoteResourceInput } from '@/modules/resources/resources.types';

export async function downvoteResource(
  id: string,
  input: DownvoteResourceInput
) {
  const result = await db.transaction().execute(async (trx) => {
    await trx
      .deleteFrom('resourceUpvotes')
      .where('resourceId', '=', id)
      .where('studentId', '=', input.memberId)
      .execute();
  });

  const { postedBy } = await db
    .selectFrom('resources')
    .select(['postedBy'])
    .where('id', '=', id)
    .executeTakeFirstOrThrow();

  job('gamification.activity.completed.undo', {
    resourceId: id,
    studentId: postedBy,
    type: 'get_resource_upvote',
    upvotedBy: input.memberId,
  });

  return result;
}
