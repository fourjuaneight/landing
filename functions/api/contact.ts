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

      return Response.redirect('/contact/success');
    }

    return Response.redirect('/contact/error');
  } catch (error) {
    console.log('contact', { error });

    return Response.redirect('/contact/error');
  }
};
