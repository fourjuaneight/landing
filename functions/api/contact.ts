interface ContextValue {
  [key: string]: string;
}

interface RequestParams {
  env: ContextValue;
  data: {
    [key: string]: string;
  };
}

export const onRequestPost = async (context: RequestParams) => {
  try {
    console.log('contact', context);

    if (context.data) {
      return new Response(
        JSON.stringify({ success: true, context }),
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
