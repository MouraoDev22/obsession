/**
 * Dados de uma música da trilha sonora / Data of a soundtrack song.
 *
 * Espelha as chaves de `src/data/songs.json` /
 * Mirrors the keys of `src/data/songs.json`.
 */
export interface OstSong {
  /** Identificador único; usado como chave de renderização /
   * Unique identifier; used as the rendering key. */
  id: string;
  /** Caminho ou URL da imagem de capa / Path or URL of the cover image. */
  cover: string;
  /** Título exibido da música / Displayed title of the song. */
  title: string;
  /** URL do vídeo no YouTube usado para tocar o áudio /
   * URL of the YouTube video used to play the audio. */
  youtubeUrl: string;
}
