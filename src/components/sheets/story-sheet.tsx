"use client";

import React from "react";

const StorySheet = ({
  story,
}: {
  story: {
    title: string;
    introduction: string;
    characters: { name: string; description: string }[];
    plot: { beginning: string; middle: string; end: string };
    dialogue: string[];
    conclusion: string;
  };
}) => {
  return (
    <div className="mt-8 p-6 bg-gray-800 rounded-lg">
      <h2 className="text-2xl font-bold text-indigo-400 mb-4">{story.title}</h2>
      <p className="text-gray-200 mb-4">{story.introduction}</p>

      <h3 className="text-xl font-semibold text-indigo-300 mb-2">Characters</h3>
      <ul className="mb-4">
        {story.characters.map((character, index) => (
          <li key={index} className="text-gray-200">
            <strong>{character.name}:</strong> {character.description}
          </li>
        ))}
      </ul>

      <h3 className="text-xl font-semibold text-indigo-300 mb-2">Plot</h3>
      <div className="text-gray-200 space-y-2">
        <p><strong>Beginning:</strong> {story.plot.beginning}</p>
        <p><strong>Middle:</strong> {story.plot.middle}</p>
        <p><strong>End:</strong> {story.plot.end}</p>
      </div>

      <h3 className="text-xl font-semibold text-indigo-300 mt-4 mb-2">Dialogue</h3>
      <ul className="text-gray-200 space-y-2">
        {story.dialogue.map((line, index) => (
          <li key={index}>{line}</li>
        ))}
      </ul>

      <h3 className="text-xl font-semibold text-indigo-300 mt-4 mb-2">Conclusion</h3>
      <p className="text-gray-200">{story.conclusion}</p>
    </div>
  );
};

export default StorySheet;