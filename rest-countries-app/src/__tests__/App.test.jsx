import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { ThemeProvider } from '../context/ThemeContext';

// Mock the fetch function with more comprehensive test data
global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([
      {
        name: { common: 'Test Country 1' },
        region: 'Test Region 1',
        languages: { eng: 'English' },
        flags: { png: 'test-flag-1.png' },
        population: 1000000,
        capital: ['Test Capital 1']
      },
      {
        name: { common: 'Test Country 2' },
        region: 'Test Region 2',
        languages: { spa: 'Spanish' },
        flags: { png: 'test-flag-2.png' },
        population: 2000000,
        capital: ['Test Capital 2']
      }
    ])
  })
);

describe('App Integration Tests', () => {
  const renderApp = () => {
    return render(
      <ThemeProvider>
        <App />
      </ThemeProvider>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the application and loads countries', async () => {
    renderApp();
    
    // Check if the app title is rendered
    expect(screen.getByText(/World Explorer/i)).toBeInTheDocument();
    
    // Wait for countries to load
    await waitFor(() => {
      expect(screen.getByText('Test Country 1')).toBeInTheDocument();
      expect(screen.getByText('Test Country 2')).toBeInTheDocument();
    });
  });

  it('handles search and filter interactions', async () => {
    renderApp();
    
    // Wait for initial data load
    await waitFor(() => {
      expect(screen.getByText('Test Country 1')).toBeInTheDocument();
    });

    // Test search functionality
    const searchInput = screen.getByPlaceholderText(/search/i);
    await userEvent.type(searchInput, 'Test Country 1');
    
    await waitFor(() => {
      expect(screen.getByText('Test Country 1')).toBeInTheDocument();
      expect(screen.queryByText('Test Country 2')).not.toBeInTheDocument();
    });

    // Clear search and test region filter
    await userEvent.clear(searchInput);
    const regionSelect = screen.getByLabelText(/region/i);
    await userEvent.selectOptions(regionSelect, 'Test Region 1');

    await waitFor(() => {
      expect(screen.getByText('Test Country 1')).toBeInTheDocument();
      expect(screen.queryByText('Test Country 2')).not.toBeInTheDocument();
    });

    // Test language filter
    const languageSelect = screen.getByLabelText(/language/i);
    await userEvent.selectOptions(languageSelect, 'English');

    await waitFor(() => {
      expect(screen.getByText('Test Country 1')).toBeInTheDocument();
      expect(screen.queryByText('Test Country 2')).not.toBeInTheDocument();
    });
  });

  it('handles theme switching', async () => {
    renderApp();
    
    const themeToggle = screen.getByRole('button', { name: /toggle theme/i });
    
    // Initial theme check
    expect(document.documentElement).toHaveClass('light');
    
    // Toggle to dark theme
    await userEvent.click(themeToggle);
    expect(document.documentElement).toHaveClass('dark');
    
    // Toggle back to light theme
    await userEvent.click(themeToggle);
    expect(document.documentElement).toHaveClass('light');
  });
}); 