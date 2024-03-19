export default async (request, context) => {
  const response = await context.next();
  return new Response(response.body, {
    headers: {
      "access-control-allow-origin": "*",
      "access-control-allow-headers": "x-request-source",
    },
  });
};
export const config = {
  path: "/*",
};
