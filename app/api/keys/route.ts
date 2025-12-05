export const GET = async (request: Request) => {
    return new Response(JSON.stringify({ message: 'Keys endpoint' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
};