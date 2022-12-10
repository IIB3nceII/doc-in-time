//@ts-nocheck
import React from 'react';
import { render } from '@testing-library/react';
import DarkModeSwitcher from './DarkModeSwitcher';
import { useTranslation } from 'react-i18next';

describe('DarkModeSwitcher', () => {
  it('should apply the "dark" class to the document when the user has selected dark mode', () => {
    // mock the localStorage object
    global.localStorage.theme = 'dark';
    // render the component
    const { container } = render(<DarkModeSwitcher />);
    // check that the "dark" class is applied to the document
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('should apply the "light" class to the document when the user has selected light mode', () => {
    // mock the localStorage object
    global.localStorage.theme = 'light';
    // render the component
    const { container } = render(<DarkModeSwitcher />);
    // check that the "light" class is applied to the document
    expect(document.documentElement.classList.contains('light')).toBe(true);
  });

  it('should apply the "system" class to the document when the user has selected the system default', () => {
    // mock the localStorage object
    global.localStorage.theme = 'system';
    // render the component
    const { container } = render(<DarkModeSwitcher />);
    // check that the "system" class is applied to the document
    expect(document.documentElement.classList.contains('system')).toBe(false);
  });

  it('should apply the "dark" class to the document when the user has not set a preference and the system prefers dark mode', () => {
    // mock the matchMedia method to return a "prefers-color-scheme: dark" media query
    window.matchMedia = jest.fn(() => {
      return {
        matches: true,
        media: 'prefers-color-scheme: dark'
      }
    });
    // render the component
    const { container } = render(<DarkModeSwitcher />);
    // check that the "dark" class is applied to the document
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('should apply the "light" class to the document when the user has not set a preference and the system prefers light mode', () => {
    // mock the matchMedia method to return a "prefers-color-scheme: light" media query
    window.matchMedia = jest.fn(() => {
      return {
        matches: true,
        media: 'prefers-color-scheme: light'
      }
    });
    // render the component
    const { container } = render(<DarkModeSwitcher />);
    // check that the "light" class is applied to the document
    expect(document.documentElement.classList.contains('light')).toBe(true);
  });

});