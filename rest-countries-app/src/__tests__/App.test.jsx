import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';
import { ThemeProvider } from '../context/ThemeContext';
import { FavoritesProvider } from '../context/FavoritesContext';

// Mock the fetch function
global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([
      {
        name: { common: 'Test Country' },
        region: 'Africa',
        languages: { eng: 'English' },
        flags: { png: 'test-flag.png' },
        population: 1000000,
        capital: ['Test Capital'],
        cca3: 'TST'
      }
    ])
  })
);

// Mock AuthContext
vi.mock('../context/AuthContext', () => ({
  useAuth: () => ({
    user: { id: 1, name: 'Test User' },
    loading: false
  }),
  AuthProvider: ({ children }) => children
}));

describe('App Integration Tests', () => {
  const renderApp = () => {
    return render(
      <BrowserRouter>
        <ThemeProvider>
          <FavoritesProvider>
            <App />
          </FavoritesProvider>
        </ThemeProvider>
      </BrowserRouter>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    // Mock navigator.onLine
    Object.defineProperty(navigator, 'onLine', { value: true, configurable: true });
  });

  it('renders the application and loads countries', async () => {
    renderApp();
    
    // Check for splash screen
    expect(screen.getByText('World Explorer')).toBeInTheDocument();
    expect(screen.getByText('Discover our amazing planet')).toBeInTheDocument();
    
    // Wait for splash screen to disappear and countries to load
    await waitFor(() => {
      expect(screen.queryByText('Discover our amazing planet')).not.toBeInTheDocument();
    }, { timeout: 2000 });

    // Now check for the country data
    await waitFor(() => {
      expect(screen.getByText('Test Country')).toBeInTheDocument();
    });
  });

  it('handles search and filter interactions', async () => {
    renderApp();
    
    // Wait for splash screen to disappear
    await waitFor(() => {
      expect(screen.queryByText('Discover our amazing planet')).not.toBeInTheDocument();
    }, { timeout: 2000 });

    // Wait for countries to load
    await waitFor(() => {
      expect(screen.getByText('Test Country')).toBeInTheDocument();
    });

    // Test search
    const searchInput = screen.getByPlaceholderText(/search for a country/i);
    await userEvent.type(searchInput, 'Test');
    expect(screen.getByText('Test Country')).toBeInTheDocument();

    // Test region filter
    const regionSelect = screen.getAllByRole('combobox')[0];
    await userEvent.selectOptions(regionSelect, 'Africa');
    expect(screen.getByText('Test Country')).toBeInTheDocument();

    // Test language filter
    const languageSelect = screen.getAllByRole('combobox')[1];
    await userEvent.selectOptions(languageSelect, 'English');
    expect(screen.getByText('Test Country')).toBeInTheDocument();
  });

  it('handles theme switching', async () => {
    renderApp();
    
    // Wait for splash screen to disappear
    await waitFor(() => {
      expect(screen.queryByText('Discover our amazing planet')).not.toBeInTheDocument();
    }, { timeout: 2000 });

    // Wait for countries to load
    await waitFor(() => {
      expect(screen.getByText('Test Country')).toBeInTheDocument();
    });

    // Find and click the theme toggle button
    const themeToggle = screen.getByRole('button', { name: /switch to dark mode/i });
    await userEvent.click(themeToggle);

    // Check if dark theme classes are applied
    expect(document.documentElement).toHaveClass('dark');
  });
}); 