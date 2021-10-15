// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

import {server} from './mocks/server.js'
// establish API mocking before all tests
// any network requests that come through, route them to mock service worker
// instead of the actual network
beforeAll(()=> server.listen())
// reset any request handlers that may be added during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers())
// clean up after the tests are finished
afterAll(()=> server.close())
