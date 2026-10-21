import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import apiService from './services/apiService';

jest.mock('./services/apiService');

const mockData = [
  {
    "name": "Jane",
    "age": 23,
    "books": [
      { "name": "Hamlet", "type": "Hardcover" },
      { "name": "Wuthering Heights", "type": "Paperback" }
    ]
  },
  {
    "name": "Charlotte",
    "age": 14,
    "books": [
      { "name": "Hamlet", "type": "Paperback" }
    ]
  }
];

describe('App Component', () => {
  beforeEach(() => {
    apiService.get.mockResolvedValue(mockData);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders the initial header and buttons without book lists', () => {
    render(<App />);
    expect(screen.getByText('Owners and Books')).toBeInTheDocument();
    expect(screen.getByText('Get Books')).toBeInTheDocument();
    expect(screen.getByText('Hardcover only')).toBeInTheDocument();
    expect(screen.queryByText('Books owned by Adults')).not.toBeInTheDocument();
  });

  test('fetches and displays grouped books when "Get Books" is clicked', async () => {
    render(<App />);
    
    fireEvent.click(screen.getByText('Get Books'));

    await waitFor(() => {
      expect(screen.getByText('Books owned by Adults')).toBeInTheDocument();
      expect(screen.getByText('Books owned by Children')).toBeInTheDocument();
    });

    expect(screen.getAllByText('Hamlet').length).toBe(2);
    expect(screen.getByText('Wuthering Heights')).toBeInTheDocument();
  });

  test('filters and updates titles when "Hardcover only" is clicked', async () => {
    render(<App />);
    
    fireEvent.click(screen.getByText('Get Books'));

    await waitFor(() => {
      expect(screen.getByText('Books owned by Adults')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Hardcover only'));

    expect(screen.getByText('Hardcover Books owned by Adults')).toBeInTheDocument();
    expect(screen.getByText('Hardcover Books owned by Children')).toBeInTheDocument();
    
    expect(screen.queryByText('Wuthering Heights')).not.toBeInTheDocument();
    expect(screen.getAllByText('Hamlet').length).toBe(1);
  });
});