import { Ctx } from "blitz"
import db, { PlayerDeleteArgs } from "db"

type DeletePlayerInput = Pick<PlayerDeleteArgs, "where">

export default async function deletePlayer({ where }: DeletePlayerInput, ctx: Ctx) {
  ctx.session.authorize()

  const player = await db.player.delete({ where })

  return player
}
