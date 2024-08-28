import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, screen, act } from '@testing-library/react';
import Topnav from '../pages/Navbar/Topnav';


jest.mock('axios');
jest.mock('react-router-dom');

describe('All Tests', () => {

  test('renders heading', () => {
    render(<Topnav />);
    const linkElement = screen.getByRole("univlabel");
    expect(linkElement).toBeInTheDocument();
  })

  test('renders clg-name', () => {
    render(<Topnav />);
    const linkElement = screen.getByRole("clglabel");
    expect(linkElement).toBeInTheDocument();

  })

})