import { useState, useEffect, useCallback } from 'react';
import { findMostOppositeQuestion } from '@/utils/questions';
import { useNavigate } from 'react-router-dom';

interface Message {
  text: string;
  isUser: boolean;
  isMuted?: boolean;
}

interface TopicScore {
  topicScore: number[];
  error?: string;
}

const useChat = (messages: Message[], onSendMessage: (text: string, isUser: boolean) => void, onClearMessages: () => void, setScores: (scores: string) => void) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (messages.length > 0 && messages[messages.length - 1].isUser) {
      const userMessages = messages.filter(message => message.isUser && !message.isMuted)
        .map(message => message.text).join(' ');
      fetchScore(userMessages).then();
    }

    if (!messages.length)
      navigate('/', { replace: true });
  }, [messages]);

  const fetchScore = async (userMessages: string) => {
    setLoading(true);
    setError(null);
    try {
      const scoreResponse = await fetch('/api/scores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: userMessages })
      });
      const scoreData: TopicScore = await scoreResponse.json();

      if (!scoreData.topicScore) {
        throw new Error(scoreData.error);
      }

      const scores = scoreData.topicScore.map(v => v.toFixed(3)).join(',');
      setScores(scores);
      navigate('/search?topic=' + scores);

      const message = findMostOppositeQuestion(scoreData.topicScore);

      if (message) {
        onSendMessage(message, false);
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
      onSendMessage('An error occurred while fetching the response.', false);
      console.error('Error fetching score:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    fetchScore(messages[messages.length - 1].text).then();
  };

  const handleRefreshClick = () => {
    if (window.confirm('Do you want to start a new chat from the beginning?')) {
      onClearMessages();
    }
  };

  const toggleMuteMessage = useCallback((index: number) => {
    const updatedMessages = [...messages];
    updatedMessages[index].isMuted = !updatedMessages[index].isMuted;

    const lastUserMessageIndex = updatedMessages.slice().reverse().findIndex(message => message.isUser);
    const lastUserMessage = lastUserMessageIndex !== -1 ? updatedMessages[updatedMessages.length - 1 - lastUserMessageIndex] : null;

    if (updatedMessages[index].isMuted) {
      updatedMessages[index] = lastUserMessage ? { ...lastUserMessage, isUser: true } : { text: 'No response', isUser: true };
    } else {
      updatedMessages[index] = lastUserMessage ? { ...lastUserMessage, isUser: true, isMuted: false } : { text: 'No response', isUser: true, isMuted: false };
    }

    const userMessages = updatedMessages.filter(message => message.isUser && !message.isMuted)
      .map(message => message.text).join(' ');
    fetchScore(userMessages).then();
  }, [messages]);

  return {
    messages,
    loading,
    error,
    handleRetry,
    handleRefreshClick,
    toggleMuteMessage,
  };
};

export default useChat;