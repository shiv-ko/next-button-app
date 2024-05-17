// components/Quote.tsx
'use client';
import React, { useState, useEffect } from 'react';
import { Button } from "@/imcomponents/ui/button"
import EventDisplay from './EventDisplay';

interface Quote {
  content: string;
}

interface ErrorComponentProps {
  errorMessage: string;
}

const ErrorComponent: React.FC<ErrorComponentProps> = ({ errorMessage }) => {
  return <div className="error">{errorMessage}</div>;
};

const Quote: React.FC = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchQuotes = () => {
    setIsLoading(true);
    setError(null);
    fetch('https://api.quotable.io/quotes?limit=500')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setQuotes(data.results);
        setCurrentQuoteIndex(0); // 初期インデックスを設定
        setIsLoading(false);
      })
      .catch(error => {
        setError('Failed to fetch quotes: ' + error.message);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  const handleFetchNewQuote = () => {
    if (quotes.length > 0) {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setCurrentQuoteIndex(randomIndex); // インデックスを更新
    }
  };

return (
    <div>
        <h2 className="text-4xl">名言</h2>
        {error && <ErrorComponent errorMessage={error} />}
        {isLoading ? (
            <p>Loading...</p>
        ) : (
            quotes.length > 0 && (
                <div>
                    <Button variant="destructive" onClick={handleFetchNewQuote} disabled={isLoading}>{isLoading ? '取得中...' : '新しい名言を取得'}</Button>
                    <p className='text-xl'>{quotes[currentQuoteIndex].content}</p>
                </div>
            )
        )}
        <div>
          

        </div>
    </div>
);
};

export default Quote;
