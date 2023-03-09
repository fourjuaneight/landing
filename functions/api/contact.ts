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
  const url = new URL(context.request.url);
  const { origin } = url;

  try {
    const date = new Date();
    const timestamp = date.toISOString();
    // get fom data
    const input = await context.request.formData();
    const data = Object.fromEntries(input.entries());
    
    if (data) {
      await context.env.CONTACT.put(timestamp, JSON.stringify(data));

      return Response.redirect(`${origin}/contact/success`);
    }

    return Response.redirect(`${origin}/contact/error`);
  } catch (error) {
    console.log('contact', { error });

    return Response.redirect(`${origin}/contact/error`);
  }
};
