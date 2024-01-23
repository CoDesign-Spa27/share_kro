import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  
    projectId:'9bvt7hjm',
    dataset: 'production',
    apiVersion:'2021-11-16',
    useCdn: true,
    token:'skVNUTz2b08HX2knkLVLiB0uBIuA0kZP8PvxWrreEubHqGf8WpqEvvgaiPw2M5mBqjUuo8WaRKIyD8vEVdQ17blP0RUpB716JU1tMMGTpSHIvNEqj5YF9Aq9lCH5iE2IkIFjJrzjfE36q1pivOymaO4ZJLUMrwfrOF9vuggchcVc8uR6xKXL',

});

const builder = imageUrlBuilder(client);

export const urlFor=(source)=>builder.image(source)