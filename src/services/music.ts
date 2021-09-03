import { AudioPlayerStatus, AudioResource, createAudioPlayer, entersState, getVoiceConnection, joinVoiceChannel, VoiceConnection, VoiceConnectionDisconnectReason, VoiceConnectionStatus } from "@discordjs/voice";
import { Track } from "./music/music_types";
import { AudioPlayer } from "@discordjs/voice";
import { Guild, Snowflake } from "discord.js";
import log from "../util/logger";
import { promisify } from "util";
import { AbstractService } from "./abstract_service";

const wait = promisify(setTimeout);

export class MusicGuild {
  public guild: Guild;
  public queue: Track[];
  public queueLock = false;
  public readyLock = false;
  public readonly audioPlayer: AudioPlayer;

  constructor(guild: Guild) {
    this.guild = guild;
    this.queue = [];

    this.audioPlayer = createAudioPlayer();

    this.audioPlayer.on('stateChange', (oldState, newState) => {
      log.debug('Audio player state change', oldState.status, newState.status);
      if (newState.status == AudioPlayerStatus.Idle && oldState.status != AudioPlayerStatus.Idle) {
        (oldState.resource as AudioResource<Track>).metadata.onFinish();
        void this.processQueue();
      } else if (newState.status == AudioPlayerStatus.Playing) {
        (newState.resource as AudioResource<Track>).metadata.onStart();
      }
    });

    this.audioPlayer.on('error', (error) => (error.resource as AudioResource<Track>).metadata.onError(error));
  }

  public enqueue(track: Track) {
    this.queue.push(track);
    this.processQueue();
  }

  public skip() {
    this.audioPlayer.stop(true);
  }

  public stop() {
    this.queue = [];
    this.audioPlayer.stop(true);
  }

  private setVoiceConnectionListeners(voiceConnection: VoiceConnection): VoiceConnection {
    voiceConnection.on('error', (err) => {
      log.error(err)
    });
    voiceConnection.on('stateChange', async (_, newState) => {
      log.debug('voiceConnection state change', newState.status);
      if (newState.status == VoiceConnectionStatus.Disconnected) {
        if (newState.reason == VoiceConnectionDisconnectReason.WebSocketClose && newState.closeCode == 4014) {
          try {
            await entersState(voiceConnection, VoiceConnectionStatus.Connecting, 5_000);
          } catch {
            voiceConnection.destroy();
          }
        } else if (voiceConnection.rejoinAttempts < 5) {
          await wait((voiceConnection.rejoinAttempts + 1) * 5_000);
          voiceConnection.rejoin();
        } else {
          voiceConnection.destroy();
        }
      } else if (newState.status == VoiceConnectionStatus.Destroyed) {
        // Voice connection destroyed.  Lets process the queue to ensure it is all done and nothing else remains
        void this.processQueue();
      } else if (!this.readyLock && (newState.status == VoiceConnectionStatus.Connecting || newState.status == VoiceConnectionStatus.Signalling)) {
        this.readyLock = true;
        try {
          await entersState(voiceConnection, VoiceConnectionStatus.Ready, 20_000);
        } catch {
          if (voiceConnection.state.status != VoiceConnectionStatus.Destroyed) voiceConnection.destroy();
        } finally {
          this.readyLock = false;
        }
      }
    });

    voiceConnection.subscribe(this.audioPlayer);
    return voiceConnection;
  }

  private getOrCreateVoiceConnection(channelId: string): VoiceConnection {
    if (!this.guild.me.voice.channelId) {
      const vc = joinVoiceChannel({
        guildId: this.guild.id,
        channelId: channelId,
        adapterCreator: this.guild.voiceAdapterCreator,
      });
      this.setVoiceConnectionListeners(vc);
      return vc;
    } else if (this.guild.me.voice.channelId != channelId) {
      getVoiceConnection(this.guild.id).destroy();
      const vc = joinVoiceChannel({
        guildId: this.guild.id,
        channelId: channelId,
        adapterCreator: this.guild.voiceAdapterCreator,
      });
      this.setVoiceConnectionListeners(vc);
      return vc;
    }
    return getVoiceConnection(this.guild.id);
  }

  private async processQueue(): Promise<void> {
    if (this.queueLock || this.audioPlayer.state.status != AudioPlayerStatus.Idle || this.queue.length == 0) {
      return;
    }

    if (this.audioPlayer.state.status != AudioPlayerStatus.Idle) {
      return
    }

    if (this.audioPlayer.state.status == AudioPlayerStatus.Idle && this.queue.length == 0) {
      const vc = getVoiceConnection(this.guild.id);
      vc.destroy();
      return;
    }

    this.queueLock = true;

    const nextTrack = this.queue.shift();
    log.debug(nextTrack);
    try {
      const vc = this.getOrCreateVoiceConnection(nextTrack.voiceChannelId);
      await entersState(vc, VoiceConnectionStatus.Ready, 20_000);
      const resource = await nextTrack.createAudioResource();
      this.audioPlayer.play(resource);
      this.queueLock = false;
    } catch(error) {
      log.error(error);
      nextTrack.onError(error as Error);
      this.queueLock = false;
      return this.processQueue();
    }
  }
}

export class MusicService extends AbstractService<MusicGuild> {
  private guildMap = new Map<Snowflake, MusicGuild>();

  public getService(guild: Guild): MusicGuild {
    if (!this.guildMap.has(guild.id)) {
      this.guildMap.set(guild.id, new MusicGuild(guild));
    }
    return this.guildMap.get(guild.id);
  }
}

const musicService = new MusicService();
export default musicService;
