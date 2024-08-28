import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, screen, act } from '@testing-library/react';
import StudentLogin from '../pages/studentLogin/StudentLogin';

jest.mock('axios');
jest.mock('react-router-dom');

describe('All Tests', () => {

    test('renders stud-login', () => {
        render(<StudentLogin />);
        const linkElement = screen.getByRole("studlabel");
        expect(linkElement).toBeInTheDocument();
    })

    test('renders stud-email', () => {
        render(<StudentLogin />);
        const linkElement = screen.getByRole("emaillabel");
        expect(linkElement).toBeInTheDocument();

    })

    test('renders pwd-input', () => {
        render(<StudentLogin />);
        const passwordInputElement = screen.getByPlaceholderText(/Enter your password/i);
        expect(passwordInputElement).toBeInTheDocument();
    });

    test('renders stud-pwd', () => {
        render(<StudentLogin />);
        const linkElement = screen.getByRole("pwdlabel");
        expect(linkElement).toBeInTheDocument();

    })

    test('renders email-input', () => {
        render(<StudentLogin />);
        const emailInputElement = screen.getByPlaceholderText(/Enter your email/i);
        expect(emailInputElement).toBeInTheDocument();
    });

    it("renders 'stud-login-btn' ", () => {
        render(<StudentLogin />);
        const linkElement = screen.getByTestId("login-btn");
        expect(linkElement).toBeInTheDocument();
        expect(linkElement).toHaveTextContent("Login");

    });


})