
import React from 'react';
import { parseInlineElements } from '../utils/inlineParser';
import { AlertCircle, Info, AlertTriangle, CheckCircle } from 'lucide-react';

export interface AlertParseResult {
  element: React.ReactNode;
  consumed: number;
}

export const parseAlert = (lines: string[], startIndex: number): AlertParseResult | null => {
  const line = lines[startIndex];
  const alertMatch = line.match(/^\[!(INFO|WARNING|ERROR|SUCCESS)\]\s*(.*)$/);
  
  if (!alertMatch) {
    return null;
  }

  const alertType = alertMatch[1].toLowerCase();
  const content = alertMatch[2];

  const alertConfig = {
    info: {
      icon: Info,
      className: 'border-blue-200 bg-blue-50 text-blue-800 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-200'
    },
    warning: {
      icon: AlertTriangle,
      className: 'border-yellow-200 bg-yellow-50 text-yellow-800 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-200'
    },
    error: {
      icon: AlertCircle,
      className: 'border-red-200 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-950 dark:text-red-200'
    },
    success: {
      icon: CheckCircle,
      className: 'border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-200'
    }
  };

  const config = alertConfig[alertType as keyof typeof alertConfig];
  const IconComponent = config.icon;

  const element = (
    <div key={`alert-${startIndex}`} className={`flex items-start gap-3 p-4 rounded-lg border my-4 ${config.className}`}>
      <IconComponent className="w-5 h-5 mt-0.5 flex-shrink-0" />
      <div className="flex-1">
        {parseInlineElements(content)}
      </div>
    </div>
  );

  return { element, consumed: 1 };
};
