import { db } from '@engine/db';
import { id } from '@engine/utils';

import { type AddIcebreakerPromptInput } from '../icebreakers.types';

export async function addIcebreakerPrompt(input: AddIcebreakerPromptInput) {
  await db
    .insertInto('icebreakerPrompts')
    .values({
      id: id(),
      text: input.text,
    })
    .execute();
}
