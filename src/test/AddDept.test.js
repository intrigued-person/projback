import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, screen, act } from '@testing-library/react';
import Adddepartment from '../Admin/Adddepartment';


jest.mock('axios');
jest.mock('react-router-dom');

describe('All Tests', ()=>{

    test('renders heading', ()=>{
        render(<Adddepartment/>);
        const linkElement = screen.getByRole("deptlabel");
        expect(linkElement).toBeInTheDocument();
      })
      
      test('renders deptname', ()=>{
        render(<Adddepartment/>);
        const linkElement = screen.getByRole("deptname");
        expect(linkElement).toBeInTheDocument();
        
      })

      test('renders dept-input', ()=>{
        render(<Adddepartment/>);
        const linkElement = screen.getByRole("deptinput");
        expect(linkElement).toBeInTheDocument();
        expect(linkElement).toBeEmptyDOMElement;
      })
      
      test('renders coursename', ()=>{
        render(<Adddepartment/>);
        const linkElement = screen.getByRole("coursename");
        expect(linkElement).toBeInTheDocument();
        
      })

      test('renders course-input', ()=>{
        render(<Adddepartment/>);
        const linkElement = screen.getByRole("courseinput");
        expect(linkElement).toBeInTheDocument();
        expect(linkElement).toBeEmptyDOMElement;
        
      })

      test('renders selectionbox', ()=>{
        render(<Adddepartment/>);
        const linkElement = screen.getByRole("selectionbox");
        expect(linkElement).toBeInTheDocument();
        
      })

      test('renders vacancyname', ()=>{
        render(<Adddepartment/>);
        const linkElement = screen.getByRole("vacancyname");
        expect(linkElement).toBeInTheDocument();
        
      })

      test('renders vacancy-input', ()=>{
        render(<Adddepartment/>);
        const linkElement = screen.getByRole("vacancyinput");
        expect(linkElement).toBeInTheDocument();
        expect(linkElement).toBeEmptyDOMElement;
        
      })

      it("renders 'add dept button' ", () => {
        render(<Adddepartment />);
        const linkElement = screen.getByTestId("addButton-dept");
        expect(linkElement).toBeInTheDocument();
        expect(linkElement).toHaveTextContent("Add Department");
       
      });


      


})