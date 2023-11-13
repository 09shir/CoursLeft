import {render, screen, cleanup, waitFor, act } from '@testing-library/react';
import AddCourse from '../components/AddCourse';
import { configureStore } from '@reduxjs/toolkit';

// test('addCourse filler', () => {
//     expect(true).toBe(true);
// })

describe("AddCourse", () => {
    test("add course renders correctly", async () => {

        // const store = configureStore();
        // const wrapper = ({ children }) => (
        //     <ReduxProvider reduxStore={store}>{children}</ReduxProvider>
        // );

        render(<AddCourse />);
        await waitFor(() => {
            expect(screen.getByTestId('addCourse')).toBeInTheDocument();
        })
    })
})