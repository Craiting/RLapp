import { Ctx } from "blitz"
import db, { PlayerCreateArgs } from "db"

type CreatePlayerInput = Pick<PlayerCreateArgs, "data">
export default async function createPlayer({ data }: CreatePlayerInput, ctx: Ctx) {
  ctx.session.authorize()

  const player = await db.player.create({ data })

  return player
}
