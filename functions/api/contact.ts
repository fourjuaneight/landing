interface ContextValue {
  [key: string]: string;
}

interface RequestParams {
  env: ContextValue;
  data: {
    [key: string]: string;
  };
}

export const onRequestPost = async ({ data }: RequestParams) => {
  try {
    console.log('contact', { data });

    if (data) {
      return new Response(JSON.stringify({ success: true, data }), {
        headers: {
          'Content-Type': 'application/json',
        },
        ok: true,
        status: 200,
      });
    }

    return new Response(JSON.stringify({ success: false, data }), {
      ok: false,
      status: 404,
    });
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
