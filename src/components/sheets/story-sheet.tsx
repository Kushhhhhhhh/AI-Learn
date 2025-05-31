"use client";

import React from "react";

const StorySheet = ({
  story,
}: {
  story: {
    title: string;
    introduction: string;
    characters: { name: string; description: string }[];
    story?: string;
    dialogue: string[];
    conclusion: string;
  };
}) => {
  return (
    <div className="mt-8 p-8 bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-indigo-400 mb-6">{story.title}</h2>
      
      <p className="text-gray-300 mb-6">{story.introduction}</p>
      
      <hr className="border-gray-600 mb-6" />

      <section>
        <h3 className="text-2xl font-semibold text-indigo-300 mb-4">Characters</h3>
        <ul className="space-y-3 mb-6">
          {story.characters.map((character, index) => (
            <li key={index} className="text-gray-300">
              <strong>{character.name}:</strong> {character.description}
            </li>
          ))}
        </ul>
      </section>

      <hr className="border-gray-600 mb-6" />

      <section className="mb-4">
        <h3 className="text-2xl font-semibold text-indigo-300 mb-4">Story</h3>
        <p className="text-gray-300 whitespace-pre-line">{story.story}</p>
      </section>

      <hr className="border-gray-600 mb-6" />

      <section className="mb-4">
        <h3 className="text-2xl font-semibold text-indigo-300 mb-4">Dialogue</h3>
        <ul className="text-gray-300 space-y-3">
          {story.dialogue.map((line, index) => (
            <li key={index} className="pl-4 border-l-4 border-indigo-400">
              {line}
            </li>
          ))}
        </ul>
      </section>

      <hr className="border-gray-600 mb-6" />

      <section>
        <h3 className="text-2xl font-semibold text-indigo-300 mb-4">Conclusion</h3>
        <p className="text-gray-300">{story.conclusion}</p>
      </section>
    </div>
  );
};

export default StorySheet;