import type { ShareChannelName } from "@/types/share-channel";

type ShareActionParams = {
  title: string;
  url: string;
};

type ShareActionFn = (params: ShareActionParams) => string;

function encodeParams(params: ShareActionParams) {
  return {
    title: encodeURIComponent(params.title),
    url: encodeURIComponent(params.url),
  };
}

function withEncodeParams(cb: ShareActionFn): ShareActionFn {
  return (params) => {
    return cb(encodeParams(params));
  };
}

function withOpen(cb: ShareActionFn): ShareActionFn {
  return (params) => {
    const url = cb(params);
    window.open(url, "_blank", "noopener noreferrer");
    return url;
  };
}

const hatena: ShareActionFn = ({ title, url }) => {
  return `https://b.hatena.ne.jp/entry/panel/?mode=confirm&title=${title}&url=${url}`;
};

const twitter: ShareActionFn = ({ title, url }) => {
  return `https://twitter.com/intent/tweet?text=${title}&url=${url}`;
};

// const clipboard: ShareActionFn = ({ url }) => {
//   navigator.clipboard.writeText(url);
//   return url;
// };

export const ShareAction: {
  [key in ShareChannelName]: ShareActionFn;
} = {
  Hatena: withOpen(withEncodeParams(hatena)),
  Twitter: withOpen(withEncodeParams(twitter)),
  // Clipboard: clipboard,
};
