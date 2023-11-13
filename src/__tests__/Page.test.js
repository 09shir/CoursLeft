import {render, cleanup, act } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import Page from '../pages/Page';

describe("Page", () => {
    // test("filler", () => {
    //     expect(true).toBe(true)
    // })
    test("renders correctly", async () => {
        await act( async () => render(<Page/>));
        const element = screen.getByTestId('page');
        expect(element).toBeInTheDocument();
    })
})