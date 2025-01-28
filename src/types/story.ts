export interface Story {
    title: string;
    introduction: string;
    characters: { name: string; description: string }[];
    plot: { beginning: string; middle: string; end: string };
    dialogue: string[];
    conclusion: string;
  }