import { PrismaClient } from "@prisma/client";

let dbClient: PrismaClient;

declare global {
  var __db: PrismaClient | undefined;
}

// this is needed because in development we don't want to restart
// the server with every change, but we want to make sure we don't
// create a new connection to the DB with every change either.
if (process.env.NODE_ENV === "production") {
  dbClient = new PrismaClient();
} else {
  if (!global.__db) {
    global.__db = new PrismaClient();
  }
  dbClient = global.__db;
}

const jokes: Joke[] = [
  {
    id: "1",
    name: "Road worker",
    content: `I never wanted to believe that my Dad was stealing from his job as a road worker. But when I got home, all the signs were there.`,
  },
  {
    id: "2",
    name: "Frisbee",
    content: `I was wondering why the frisbee was getting bigger, then it hit me.`,
  },
  {
    id: "3",
    name: "Trees",
    content: `Why do trees seem suspicious on sunny days? Dunno, they're just a bit shady.`,
  },
  {
    id: "4",
    name: "Skeletons",
    content: `Why don't skeletons ride roller coasters? They don't have the stomach for it.`,
  },
  {
    id: "5",
    name: "Hippos",
    content: `Why don't you find hippopotamuses hiding in trees? They're really good at it.`,
  },
  {
    id: "6",
    name: "Dinner",
    content: `What did one plate say to the other plate? Dinner is on me!`,
  },
  {
    id: "7",
    name: "Elevator",
    content: `My first time using an elevator was an uplifting experience. The second time let me down.`,
  },
];

type FindUniqueParams = {
  where: { id?: string },
}

type FindManyParams = {
  take?: number;
  skip?: number;
}

type Joke = {
  id: string;
  content: string;
  name: string;
}

type CreateParams = {
  data: {
    name: string;
    content: string;
  }
}

const db = {
  joke: {
    async create({data}: CreateParams) {
      return dbClient.joke.create({data})
    },
    async count(): Promise<number> {
      return dbClient.joke.count();
    },
    async findMany(params?: FindManyParams): Promise<Joke[]> {
      return dbClient.joke.findMany(params);
    },
    async findUnique(params: FindUniqueParams): Promise<Joke | null> {
      return dbClient.joke.findUnique(params);
    }
  }
}

export { db };