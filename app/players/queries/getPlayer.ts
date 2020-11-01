import { Ctx, NotFoundError } from "blitz"
import db, { FindFirstPlayerArgs } from "db"

type GetPlayerInput = Pick<FindFirstPlayerArgs, "where">

export default async function getPlayer({ where }: GetPlayerInput, ctx: Ctx) {
  ctx.session.authorize()

  const player = await db.player.findFirst({ where })

  if (!player) throw new NotFoundError()

  return player
}
