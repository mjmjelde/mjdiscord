import { Message, PartialMessage, MessageEmbed } from "discord.js";
import { AbstractCommand } from "./abstract_command";
import { getCommand } from "../util/command";
import { randomPerks } from "../util/mw/perks";
import { randomPrimaryClass, randomSecondaryClass } from "../util/mw/guns";
import { randomLethals } from "../util/mw/lethals";

export class RandomClassCommand implements AbstractCommand {
  should_execute(msg: Message | PartialMessage): boolean {
    return getCommand(msg) == "rc";
  }
  execute(msg: Message | PartialMessage): void {
    const perks = randomPerks();
    const primaryGun = randomPrimaryClass();
    const secondaryGun = perks.perk2.name == "Overkill" ? randomPrimaryClass() : randomSecondaryClass();
    const lethals = randomLethals();

    const reply = new MessageEmbed();
    reply.setTitle("Random Class");
    reply.addFields(
      { name: 'Primary Gun', value: primaryGun.name, inline: true },
      { name: 'Attachments', value: this.attachmentsToString(primaryGun.attachments), inline: true},
      { name: 'Secondary Gun', value: secondaryGun.name, inline: true },
      { name: 'Attachments', value: this.attachmentsToString(secondaryGun.attachments), inline: true},
      { name: "Perks", value: `${perks.perk1.name}\n${perks.perk2.name}\n${perks.perk3.name}`},
      { name: 'Lethals', value: `${lethals.lethal.name}\n${lethals.tactical.name}`}
    );
    msg.reply(reply);
  }
  help(): string {
    throw new Error("Method not implemented.");
  }

  private attachmentsToString(attachments: string[][]) {
    let ret = "";
    for (const attachment of attachments) {
      ret += `${attachment[0]}\n`;
    }
    return ret;
  }

}