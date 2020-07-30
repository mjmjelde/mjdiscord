import { AbstractCommand } from "./abstract_command";
import { Message, PartialMessage, MessageAttachment } from "discord.js";
import { getCommand, commandCharacter } from "../util/command";
import axios from "axios";
import { parse } from 'node-html-parser';
import { createCanvas, loadImage } from 'canvas';

export class RandomComicCommand implements AbstractCommand {
    should_execute(msg: Message | PartialMessage): boolean {
        return ['randomcomic', 'randcomic'].includes(getCommand(msg).toLowerCase())
    }
    
    help(): string {
        return commandCharacter() + "randomcomic : Generates a random comic to be displayed";
    }

    execute(msg: Message | PartialMessage): void {
        axios('http://explosm.net/rcg/view/').then(async (resp) => {
            const html = parse(resp.data);
            const imgs = html.querySelector('div.rcg-panels').querySelectorAll('img');
            const img1 = await loadImage(imgs[0].attributes.src);
            const img2 = await loadImage(imgs[1].attributes.src);
            const img3 = await loadImage(imgs[2].attributes.src);
            const newImg = createCanvas(img1.width * 3, img1.height);
            const ctx = newImg.getContext('2d');
            ctx.drawImage(img1, 0, 0);
            ctx.drawImage(img2, img1.width, 0);
            ctx.drawImage(img3, img1.width * 2, 0);

            const attachment = new MessageAttachment(newImg.toBuffer());
            msg.channel.send(attachment);
        }).catch((err) => {
            msg.reply("There was an error making your random comic... try again later");
        })
    }

}