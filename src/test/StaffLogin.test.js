import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, screen, act } from '@testing-library/react';
import Login from '../pages/StaffLogin/StaffLogin';

jest.mock('axios');
jest.mock('react-router-dom');

describe('All Tests', () => {

    test('renders staff-login', () => {
        render(<Login />);
        const linkElement = screen.getByRole("staff-login");
        expect(linkElement).toBeInTheDocument();
    })

    test('renders staff-name', () => {
        render(<Login />);
        const linkElement = screen.getByRole("username");
        expect(linkElement).toBeInTheDocument();

    })

    test('renders staff-input', () => {
        render(<Login />);
        const passwordInputElement = screen.getByPlaceholderText(/Enter your username/i);
        expect(passwordInputElement).toBeInTheDocument();
    });

    test('renders staff-pwd', () => {
        render(<Login />);
        const linkElement = screen.getByRole("password");
        expect(linkElement).toBeInTheDocument();

    })

    test('renders pwd-input', () => {
        render(<Login />);
        const emailInputElement = screen.getByPlaceholderText(/Enter your password/i);
        expect(emailInputElement).toBeInTheDocument();
    });



    it("renders 'staff-log-btn' ", () => {
        render(<Login />);
        const linkElement = screen.getByTestId("log-btn");
        expect(linkElement).toBeInTheDocument();
        expect(linkElement).toHaveTextContent("Login");

    });


})