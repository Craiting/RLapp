import { hashPassword } from "app/auth/auth-utils"
import db from "./index"

/*
 * This seed function is executed when you run `blitz db seed`.
 *
 * Probably you want to use a library like https://chancejs.com
 * or https://github.com/Marak/Faker.js to easily generate
 * realistic data.
 */
const pupNSudsPlayers = [
  {
    name: "Agro",
  },
  {
    name: "FJ Pony",
  },
  {
    name: "Flamingo mo",
  },
]

const boigerBoisPlayers = [
  {
    name: "MrCottin",
  },
  {
    name: "Wannabeast",
  },
  {
    name: "Tyranasaur",
  },
]

const createTestuser = async () => {
  const password = "test12345!"
  const hashedPassword = await hashPassword(password)
  await db.user.create({
    data: { name: "Tester", email: "test@test.com", hashedPassword, role: "user" },
    select: { id: true, name: true, email: true, role: true },
  })
}

const seed = async () => {
  await createTestuser()

  const testLeague = await db.league.create({ data: { name: "Agro League" } })
  const sudsTeam = await db.team.create({
    data: { name: "Pup N Suds", league: { connect: { id: testLeague.id } } },
  })
  pupNSudsPlayers.map(async (player) => {
    return await db.player.create({
      data: { name: player.name, team: { connect: { id: sudsTeam.id } } },
    })
  })
  const boigerTeam = await db.team.create({
    data: { name: "Boiger Bois", league: { connect: { id: testLeague.id } } },
  })
  boigerBoisPlayers.map(async (player) => {
    return await db.player.create({
      data: { name: player.name, team: { connect: { id: boigerTeam.id } } },
    })
  })
}

export default seed
