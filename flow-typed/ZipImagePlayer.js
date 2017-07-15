declare class ZipImagePlayer {
  constructor(definition: {
    canvas: HTMLCanvasElement,
    source: string,
    metadata: UgoiraMetaData,
    chunkSize: 300000,
    loop: true,
    autoStart: true,
    autosize: true,
  }): ZipImagePlayer;

  stop(): void;
}
