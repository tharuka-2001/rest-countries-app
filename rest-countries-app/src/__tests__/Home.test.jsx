import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
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
        cca3: 'TST' // Adding cca3 for favorites functionality
      }
    ])
  })
);

describe('Home Component', () => {
  const renderHome = () => {
    return render(
      <BrowserRouter>
        <ThemeProvider>
          <FavoritesProvider>
            <Home />
          </FavoritesProvider>
        </ThemeProvider>
      </BrowserRouter>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
    // Clear localStorage before each test
    localStorage.clear();
  });

  it('renders loading state initially', () => {
    renderHome();
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('renders country cards after data is fetched', async () => {
    renderHome();
    
    await waitFor(() => {
      expect(screen.getByText('Test Country')).toBeInTheDocument();
    });
  });

  it('filters countries based on search input', async () => {
    renderHome();
    
    await waitFor(() => {
      expect(screen.getByText('Test Country')).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText(/search for a country/i);
    await act(async () => {
      await userEvent.type(searchInput, 'Test');
    });

    expect(screen.getByText('Test Country')).toBeInTheDocument();
  });

  it('filters countries based on region selection', async () => {
    renderHome();
    
    await waitFor(() => {
      expect(screen.getByText('Test Country')).toBeInTheDocument();
    });

    const regionSelect = screen.getAllByRole('combobox')[0];
    await act(async () => {
      await userEvent.selectOptions(regionSelect, 'Africa');
    });

    expect(screen.getByText('Test Country')).toBeInTheDocument();
  });

  it('filters countries based on language selection', async () => {
    renderHome();
    
    await waitFor(() => {
      expect(screen.getByText('Test Country')).toBeInTheDocument();
    });

    const languageSelect = screen.getAllByRole('combobox')[1];
    await act(async () => {
      await userEvent.selectOptions(languageSelect, 'English');
    });

    expect(screen.getByText('Test Country')).toBeInTheDocument();
  });
}); 