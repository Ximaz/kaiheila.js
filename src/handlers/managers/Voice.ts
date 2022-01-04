// import ffmpegPath from 'ffmpeg-static';
// import child_process from 'child_process';
// import path from 'path';
// import os from 'os';

// const ffmpeg = ffmpegPath.replace(/(.+)(?:\/.+$)/, '$1');
// var platform = process.env.npm_config_platform || os.platform();
// var arch = process.env.npm_config_arch || os.arch();

// let voicePath = path.join(
//   __dirname,
//   'bin',
//   `voice_${platform}_${arch}` + (platform === 'win32' ? '.exe' : '')
// );

// export class khlVoice {
//   private token: string;
//   private repeat: boolean;
//   private channel?: string;
//   private child?: child_process.ChildProcess;
//   constructor(token: string, repeat = true) {
//     this.token = token;
//     this.repeat = repeat;
//   }
//   public set_channel(channel: string) {
//     this.channel = channel;
//     child?.kill();
//     child = undefined;
//     return this;
//   }
//   public play(input: string) {
//     if (!this.channel) throw new Error('Channel not specified before playing');
//     child?.kill();
//     child = child_process.spawn(
//       voicePath,
//       [
//         '-i',
//         input,
//         '-t',
//         this.token,
//         '-c',
//         this.channel,
//         '-r',
//         this.repeat ? 'true' : 'false',
//       ],
//       {
//         env: { PATH: process.env.PATH + `:${ffmpeg}` },
//       }
//     );
//     // if (!child || child.killed) {
//     //   return child;
//     // } else {
//     //   child.stdin?.write(input + '\n');
//     //   return child;
//     // }
//     return child;
//   }
// }

import Client from '../../index'
import ffmpegPath from 'ffmpeg-static'
import childProcess from 'child_process'
import os from 'os'
import path from 'path'
import ApiHandler from '../API'
import ws from 'ws'

const ffmpeg = ffmpegPath.replace(/(.+)(?:\/.+$)/, '$1'),
    platform = process.env.npm_config_platform || os.platform(),
    arch = process.env.npm_config_arch || os.arch(),
    voicePath = path.join(
        __dirname,
        `../../../bin/voice_${platform}_${arch}${
            platform === 'win32' ? '.exe' : ''
        }`
    )

export default class VoiceManager {
    // #client: Client
    // #API: ApiHandler
    // #socket: ws | undefined
    // dispatcher?: childProcess.ChildProcess
    constructor(client: Client) {
        throw new Error('Voice functions have not been implemented yet.')
        // this.#client = client
        // this.#API = new ApiHandler(client.token, client.options)
        // this.#socket = undefined
    }

    // private __play(
    //     filePath: string,
    //     voiceChannel: string,
    //     options?: { repeat?: boolean }
    // ) {
    //     this.dispatcher = childProcess.spawn(
    //         voicePath,
    //         [
    //             '-i',
    //             filePath,
    //             '-t',
    //             this.#client.token,
    //             '-c',
    //             voiceChannel,
    //             '-r',
    //             options?.repeat ? 'true' : 'false',
    //         ],
    //         {
    //             env: { PATH: process.env.PATH + `:${ffmpeg}` },
    //         }
    //     )
    // }

    // _play(
    //     filePath: string,
    //     voiceChannel: string,
    //     options?: { repeat?: boolean }
    // ) {
    //     if (!voiceChannel)
    //         throw new Error('Channel must be specified before playing.')

    //     this.dispatcher?.kill()

    //     this.__play(filePath, voiceChannel, options)

    //     return this.dispatcher
    // }

    // async join(channelId: string) {
    //     const { gateway_url } = (
    //         await this.#API.execute(
    //             {
    //                 m: 'post',
    //                 r: '/channels/token/' + channelId,
    //                 v: 2,
    //             },
    //             {
    //                 data: { ip_discovery: ['37.166.242.217'] },
    //                 headers: {
    //                     'x-client-sessionid': this.#client.sessionId
    //                 },
    //             }
    //         )
    //     ).data
    //     this.#socket = new ws(gateway_url)
    //     return this.#socket
    // }

    // disconnect() {
    //     this.dispatcher?.disconnect()
    //     this.dispatcher?.kill()
    // }
}

/**
 * [select=a:f=rtp:ssrc=1357:payload_type=100]rtp://159.75.248.167:49575?rtcpport=33080
 *
 *
webrtc::AudioSendStream* createAudioSendStream(
  uint32_t ssrc,
  uint8_t payloadType,
  webrtc::Transport* transport,
  rtc::scoped_refptr<webrtc::AudioEncoderFactory> audioEncoderFactory,
  webrtc::Call* call)
{
    webrtc::AudioSendStream::Config config{transport};
    config.rtp.ssrc = ssrc;
    config.rtp.extensions = {{"urn:ietf:params:rtp-hdrext:ssrc-audio-level", 1}};
    config.encoder_factory = audioEncoderFactory;
    const webrtc::SdpAudioFormat kOpusFormat = {"opus", 48000, 2};
    config.send_codec_spec =
      webrtc::AudioSendStream::Config::SendCodecSpec(payloadType, kOpusFormat);
    webrtc::AudioSendStream* audioStream = call->CreateAudioSendStream(config);
    audioStream->Start();
    return audioStream;
}
 */