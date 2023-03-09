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
  const base = 'https://juanvillela.dev';
  const url = new URL(request.url);

  try {
    const date = new Date();
    const timestamp = date.toISOString();
    // get fom data
    const input = await context.request.formData();
    const data = Object.fromEntries(input.entries());
    console.log(url);
    
    if (data) {
      await context.env.CONTACT.put(timestamp, JSON.stringify(data));

      return Response.redirect(`${base}/contact/success`);
    }

    return Response.redirect(`${base}/contact/error`);
  } catch (error) {
    console.log('contact', { error });

    return Response.redirect(`${base}/contact/error`);
  }
};
