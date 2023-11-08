import { useState } from 'react';

export function useAsyncOperation() {
const [status, setStatus] = useState('idle');
const [error, setError] = useState<Error | null>(null);

const execute = async (operation: () => Promise<void>) => {
    setStatus('pending');
    setError(null);
    try {
        await operation();
        setStatus('success');
    } catch (err) {
        setError(err as Error);
        setStatus('error');
    }
};

  return { execute, status, error };
}
