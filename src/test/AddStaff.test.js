import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, screen, act } from '@testing-library/react';
import AddStaff from '../Admin/AddStaff';

jest.mock('axios');
jest.mock('react-router-dom');

describe('All Tests', () => {

    test('renders staff-heading', () => {
        render(<AddStaff />);
        const linkElement = screen.getByRole("stafflabel");
        expect(linkElement).toBeInTheDocument();
    })

    test('renders staffname', () => {
        render(<AddStaff />);
        const linkElement = screen.getByRole("namelabel");
        expect(linkElement).toBeInTheDocument();

    })

    test('renders staff-input', () => {
        render(<AddStaff />);
        const linkElement = screen.getByRole("nameinput");
        expect(linkElement).toBeInTheDocument();
        expect(linkElement).toBeEmptyDOMElement;
    })

    test('renders rolename', () => {
        render(<AddStaff />);
        const linkElement = screen.getByRole("rolelabel");
        expect(linkElement).toBeInTheDocument();

    })

    test('renders role-input', () => {
        render(<AddStaff />);
        const linkElement = screen.getByRole("roleinput");
        expect(linkElement).toBeInTheDocument();
        expect(linkElement).toBeEmptyDOMElement;

    })

    test('renders numbername', () => {
        render(<AddStaff />);
        const linkElement = screen.getByRole("numberlabel");
        expect(linkElement).toBeInTheDocument();

    })

    test('renders number-input', () => {
        render(<AddStaff />);
        const linkElement = screen.getByRole("numberinput");
        expect(linkElement).toBeInTheDocument();
        expect(linkElement).toBeEmptyDOMElement;

    })

    test('renders pwdname', () => {
        render(<AddStaff />);
        const linkElement = screen.getByRole("pwdlabel");
        expect(linkElement).toBeInTheDocument();

    })

    test('renders pwd-input', () => {
        render(<AddStaff />);
        const linkElement = screen.getByRole("pwdinput");
        expect(linkElement).toBeInTheDocument();
        expect(linkElement).toBeEmptyDOMElement;

    })

    test('renders cpwdname', () => {
        render(<AddStaff />);
        const linkElement = screen.getByRole("cpwdlabel");
        expect(linkElement).toBeInTheDocument();

    })

    test('renders cpwd-input', () => {
        render(<AddStaff />);
        const linkElement = screen.getByRole("cpwdinput");
        expect(linkElement).toBeInTheDocument();
        expect(linkElement).toBeEmptyDOMElement;

    })

    it("renders 'add staff button' ", () => {
        render(<AddStaff />);
        const linkElement = screen.getByTestId("addButton-staff");
        expect(linkElement).toBeInTheDocument();
        expect(linkElement).toHaveTextContent("Add Staff");

    });


})