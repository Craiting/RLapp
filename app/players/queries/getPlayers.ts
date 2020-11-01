import { Ctx } from "blitz"
import db, { FindManyPlayerArgs } from "db"

type GetPlayersInput = Pick<FindManyPlayerArgs, "where" | "orderBy" | "skip" | "take">

export default async function getPlayers(
  { where, orderBy, skip = 0, take }: GetPlayersInput,
  ctx: Ctx
) {
  ctx.session.authorize()

  const players = await db.player.findMany({
    where,
    orderBy,
    take,
    skip,
  })

  const count = await db.player.count()
  const hasMore = typeof take === "number" ? skip + take < count : false
  const nextPage = hasMore ? { take, skip: skip + take! } : null

  return {
    players,
    nextPage,
    hasMore,
    count,
  }
}
