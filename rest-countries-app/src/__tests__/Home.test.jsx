import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from '../pages/Home';
import { ThemeProvider } from '../context/ThemeContext';

// Mock the fetch function
global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([
      {
        name: { common: 'Test Country' },
        region: 'Test Region',
        languages: { eng: 'English' },
        flags: { png: 'test-flag.png' },
        population: 1000000,
        capital: ['Test Capital']
      }
    ])
  })
);

describe('Home Component', () => {
  const renderHome = () => {
    return render(
      <ThemeProvider>
        <Home />
      </ThemeProvider>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading state initially', () => {
    renderHome();
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
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

    const searchInput = screen.getByPlaceholderText(/search/i);
    await userEvent.type(searchInput, 'Test');

    expect(screen.getByText('Test Country')).toBeInTheDocument();
  });

  it('filters countries based on region selection', async () => {
    renderHome();
    
    await waitFor(() => {
      expect(screen.getByText('Test Country')).toBeInTheDocument();
    });

    const regionSelect = screen.getByLabelText(/region/i);
    await userEvent.selectOptions(regionSelect, 'Test Region');

    expect(screen.getByText('Test Country')).toBeInTheDocument();
  });

  it('filters countries based on language selection', async () => {
    renderHome();
    
    await waitFor(() => {
      expect(screen.getByText('Test Country')).toBeInTheDocument();
    });

    const languageSelect = screen.getByLabelText(/language/i);
    await userEvent.selectOptions(languageSelect, 'English');

    expect(screen.getByText('Test Country')).toBeInTheDocument();
  });
}); 