import { IconButton } from '~/components/ui/IconButton';
import { classNames } from '~/utils/classNames';
import React, { useState, useEffect } from 'react';

export const SpeechSynthesisButton = ({
  text,
  disabled,
}: {
  text: string;
  disabled: boolean;
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const synth = window.speechSynthesis;

  const speak = () => {
    if (synth.speaking) {
      synth.cancel();
      setIsSpeaking(false);
      return;
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onend = () => {
      setIsSpeaking(false);
    };
    synth.speak(utterance);
    setIsSpeaking(true);
  };

  useEffect(() => {
    return () => {
      if (synth.speaking) {
        synth.cancel();
      }
    };
  }, [synth]);

  return (
    <IconButton
      title={isSpeaking ? 'Stop speaking' : 'Read message aloud'}
      disabled={disabled}
      className={classNames('transition-all', {
        'text-bolt-elements-item-contentAccent': isSpeaking,
      })}
      onClick={speak}
    >
      {isSpeaking ? <div className="i-ph:speaker-simple-slash text-xl" /> : <div className="i-ph:speaker-simple-high text-xl" />}
    </IconButton>
  );
};
