import { Ctx } from "blitz"
import db, { PlayerUpdateArgs } from "db"

type UpdatePlayerInput = Pick<PlayerUpdateArgs, "where" | "data">

export default async function updatePlayer({ where, data }: UpdatePlayerInput, ctx: Ctx) {
  ctx.session.authorize()

  const player = await db.player.update({ where, data })

  return player
}
