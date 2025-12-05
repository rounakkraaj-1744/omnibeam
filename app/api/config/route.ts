export const GET = async (request: Request) => {
    return new Response(JSON.stringify({ message: 'Config endpoint' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
};