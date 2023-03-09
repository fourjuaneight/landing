interface ContextValue {
  [key: string]: string;
}

interface RequestParams {
  env: KVNamespace;
  data: {
    [key: string]: string;
  };
  request: Request;
}

export const onRequestPost = async (context: RequestParams) => {
  try {
    const date = new Date();
    const timestamp = date.toISOString();
    const input = await context.request.formData();
    const data = Object.fromEntries(input.entries());

    if (data) {
      await context.env.CONTACT.put(timestamp, JSON.stringify(data));

      return new Response(
        JSON.stringify({ success: true, data }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
          ok: true,
          status: 200,
        }
      );
    }

    return new Response(
      JSON.stringify({ success: false, context }),
      {
        ok: false,
        status: 404,
      }
    );
  } catch (error) {
    console.log('contact', { error });

    return new Response(JSON.stringify({ success: false, error }), {
      headers: {
        'Content-Type': 'application/json',
      },
      ok: false,
      status: 500,
    });
  }
};
