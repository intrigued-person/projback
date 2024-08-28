import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, screen, act } from '@testing-library/react';
import Register from '../pages/StaffLogin/Register';

jest.mock('axios');
jest.mock('react-router-dom');

describe('All Tests', () => {

    test('renders stud-login', () => {
        render(<Register />);
        const linkElement = screen.getByRole("reg-heading");
        expect(linkElement).toBeInTheDocument();
    })

    test('renders stud-name', () => {
        render(<Register />);
        const linkElement = screen.getByRole("reg-name");
        expect(linkElement).toBeInTheDocument();

    })

    test('renders name-input', () => {
        render(<Register />);
        const passwordInputElement = screen.getByPlaceholderText(/Enter your username/i);
        expect(passwordInputElement).toBeInTheDocument();
    });

    test('renders stud-eamil', () => {
        render(<Register />);
        const linkElement = screen.getByRole("reg-email");
        expect(linkElement).toBeInTheDocument();

    })

    test('renders email-input', () => {
        render(<Register />);
        const emailInputElement = screen.getByPlaceholderText(/Enter your email/i);
        expect(emailInputElement).toBeInTheDocument();
    });

    test('renders stud-pwd', () => {
        render(<Register />);
        const linkElement = screen.getByRole("reg-pwd");
        expect(linkElement).toBeInTheDocument();

    })

    test('renders pwd-input', () => {
        render(<Register />);
        const emailInputElement = screen.getByPlaceholderText(/Enter your password/i);
        expect(emailInputElement).toBeInTheDocument();
    });

    test('renders stud-cpwd', () => {
        render(<Register />);
        const linkElement = screen.getByRole("reg-cpwd");
        expect(linkElement).toBeInTheDocument();

    })

    test('renders cpwd-input', () => {
        render(<Register />);
        const emailInputElement = screen.getByPlaceholderText(/Confirm your password/i);
        expect(emailInputElement).toBeInTheDocument();
    });

    it("renders 'stud-reg-btn' ", () => {
        render(<Register />);
        const linkElement = screen.getByTestId("reg-btn");
        expect(linkElement).toBeInTheDocument();
        expect(linkElement).toHaveTextContent("Register");

    });


})