import { useState, useEffect, useRef } from 'react';
import { findMostOppositeQuestion } from '@/utils/questions';
import { useNavigate } from 'react-router-dom';

interface Message {
  text: string;
  isUser: boolean;
}

interface TopicScore {
  topicScore: number[];
  error?: string;
}

const useChat = (messages: Message[], onSendMessage: (text: string, isUser: boolean) => void, onClearMessages: () => void, clearMarkers: () => void) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (messages.length > 0 && messages[messages.length - 1].isUser) {
      const userMessages = messages.filter(message => message.isUser)
        .map(message => message.text).join(' ');
      fetchScore(userMessages).then();
    }
    console.log('User messages:');

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
      navigate('/search?topic=' + scoreData.topicScore.map(v => v.toFixed(3)).join(','));
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
      clearMarkers(); // Clear markers when chat is reset
    }
  };

  return {
    messages,
    loading,
    error,
    handleRetry,
    handleRefreshClick
  };
};

export default useChat;