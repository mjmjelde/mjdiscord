import { User, Client, Message, PartialMessage } from "discord.js";

export class CommandArgs {
  public originalMessage: Message | PartialMessage;
  private splitString: string[];
  private index: number = 0;

  private client: Client;

  constructor(client: Client, msg: Message | PartialMessage) {
    this.client = client;
    this.originalMessage = msg;
    this.splitString = this.originalMessage.content.split(" ");
  }

  public pop(): string {
    if (this.index >= this.splitString.length) {
      throw new Error("Out of bounds");
    }
    return this.splitString[this.index++];
  }

  public peek(): string {
    if (this.index >= this.splitString.length) {
      throw new Error("Out of bounds");
    }
    return this.splitString[this.index];
  }

  public popUser(): User {
    let user = this.pop();
    if (user.startsWith("<@") && user.endsWith(">")) {
      user = user.slice(2, -1);

      if (user.startsWith("!")) {
        user = user.slice(1);
      }

      return this.client.users.cache.get(user);
    }
    this.putBack();
    return undefined;
  }

  public putBack() {
    if (this.index > 0) {
      this.index--;
    }
  }

  public atEnd() {
    return this.index >= this.splitString.length;
  }

  public restToString(): string {
    let retArray = [];
    for (var i = this.index; i < this.splitString.length; i++) {
      retArray.push(this.splitString[i]);
    }
    return retArray.join(" ");
  }
}
