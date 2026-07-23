// Wraps an async route handler and forwards any rejected promise to
// Express's error-handling middleware, so we don't need try/catch in
// every controller function.
export default function catchAsync(fn) {
    return function (req, res, next) {
        fn(req, res, next).catch(next);
    };
}
