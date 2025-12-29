import config from "@/config";
import styles from "@/app/characters.module.css";

type Character = {
  character: string;
  classes: Set<string>;
};

export default class Characters {
  #chunk: Character[] = [];
  #chunkSize: number;
  #chunkStart: number;
  #i;
  #invalidPositions?: Set<number>;
  #setAccuracy;
  #setSpeed;
  #start?: number;
  #words: string[];

  constructor(
    setAccuracy: React.Dispatch<React.SetStateAction<number>>,
    setSpeed: React.Dispatch<React.SetStateAction<number>>,
    words: string[] = config.text.split(" "),
    chunkSize: number = config.chunkSize
  ) {
    this.#chunkSize = chunkSize;
    this.#chunkStart = 0;
    this.#i = -1;
    this.#setAccuracy = setAccuracy;
    this.#setSpeed = setSpeed;
    this.#words = words;

    this.next();
  }

  next(key?: string) {
    if (this.#i + 1 >= this.#chunk.length) {
      if (this.#invalidPositions !== undefined) {
        const accuracy = Math.round(
          ((this.#chunk.length - this.#invalidPositions.size) /
            this.#chunk.length) *
            100
        );
        this.#setAccuracy(accuracy);
        this.#invalidPositions = undefined;
      }

      if (this.#start !== undefined) {
        const elapsedMinutes = (Date.now() - this.#start) / 1000 / 60;
        const wordCount = this.#chunk.length / 5;
        const speed = Math.round(wordCount / elapsedMinutes);
        this.#setSpeed(speed);
        this.#start = undefined;
      }

      this.#i = -1;
      this.#chunk = this.#nextChunk();
    }

    if (this.#i >= 0) {
      if (key !== undefined) {
        if (this.#invalidPositions === undefined) {
          this.#invalidPositions = new Set();
        }

        if (this.#start === undefined) {
          this.#start = Date.now();
        }

        const isValid = this.#validate(key);

        if (!isValid) {
          this.#invalidPositions.add(this.#i);
          return;
        }
      }

      this.#chunk[this.#i].classes.delete(styles.cursor);
    }

    this.#chunk[++this.#i].classes.add(styles.cursor);
  }

  render() {
    return this.#chunk.map((character: Character, i: number) => (
      <div className={[...character.classes].join(" ")} key={i}>
        {character.character}
      </div>
    ));
  }

  #nextChunk(): Character[] {
    const characters = this.#words
      .slice(this.#chunkStart, this.#chunkStart + this.#chunkSize)
      .join(" ")
      .split("")
      .map((character: string) => {
        const classes = new Set<string>();

        if (character === " ") {
          classes.add("whitespace-pre");
          classes.add("border-b-2");
          classes.add("border-zinc-800");
        }

        return { character: character, classes: classes };
      });

    if (this.#chunkStart + this.#chunkSize >= this.#words.length) {
      this.#chunkStart = 0;
    } else {
      this.#chunkStart += this.#chunkSize;
    }

    return characters;
  }

  #validate(key: string): boolean {
    this.#chunk[this.#i].classes.delete("border-zinc-800");

    if (key !== this.#chunk[this.#i].character) {
      this.#chunk[this.#i].classes.add("border-red-300");
      this.#chunk[this.#i].classes.add("text-red-300");
      return false;
    }

    this.#chunk[this.#i].classes.add("border-green-300");
    this.#chunk[this.#i].classes.add("text-green-300");
    return true;
  }
}
