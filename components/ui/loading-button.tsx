
'use client';

import React from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { cn } from '@/lib/utils';

interface LoadingButtonProps extends ButtonProps {
  loading?: boolean;
  loadingText?: string;
}

export function LoadingButton({ 
  loading = false, 
  loadingText, 
  children, 
  disabled, 
  className,
  ...props 
}: LoadingButtonProps) {
  return (
    <Button 
      className={cn(className)}
      disabled={loading || disabled}
      {...props}
    >
      {loading ? (
        <>
          <LoadingSpinner size="sm" className="mr-2" />
          {loadingText || 'Carregando...'}
        </>
      ) : (
        children
      )}
    </Button>
  );
}
