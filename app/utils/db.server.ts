const jokes: Joke[] = [
  {
    id: 1,
    name: "Road worker",
    content: `I never wanted to believe that my Dad was stealing from his job as a road worker. But when I got home, all the signs were there.`,
  },
  {
    id: 2,
    name: "Frisbee",
    content: `I was wondering why the frisbee was getting bigger, then it hit me.`,
  },
  {
    id: 3,
    name: "Trees",
    content: `Why do trees seem suspicious on sunny days? Dunno, they're just a bit shady.`,
  },
  {
    id: 4,
    name: "Skeletons",
    content: `Why don't skeletons ride roller coasters? They don't have the stomach for it.`,
  },
  {
    id: 5,
    name: "Hippos",
    content: `Why don't you find hippopotamuses hiding in trees? They're really good at it.`,
  },
  {
    id: 6,
    name: "Dinner",
    content: `What did one plate say to the other plate? Dinner is on me!`,
  },
  {
    id: 7,
    name: "Elevator",
    content: `My first time using an elevator was an uplifting experience. The second time let me down.`,
  },
];

type FindUniqueParams = {
  where: { id?: number },
}

type FindManyParams = {
  take?: number;
  skip?: number;
}

type Joke = {
  id: number;
  content: string;
  name: string;
}

const db = {
  joke: {
    async count(): Promise<number> {
      return jokes.length;
    },
    async findMany(params?: FindManyParams): Promise<Joke[]> {
      if (!params) return jokes;
      const id = params.skip;
      if (id) {
        const joke = jokes.find(joke => joke.id === id)
        if (joke) return [joke]
      }
      return [];
    },
    async findUnique({where: {id}}: FindUniqueParams): Promise<Joke | undefined> {
      return jokes.find(joke => joke.id === id)
    }
  }
}

export { db };